import re
from math import log
from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('db', 27017)
db = client.tododb


@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response


def parse_file(msg):
    for part in msg.walk():
        if part.get_content_type() in ('text/plain', 'text/html'):
            payload = part.get_payload()
            for word in re.findall(r"[-\w']+", payload):
                if len(word) > 1:
                    yield word.lower()


def predict(doc, params, alpha=1):
    (vocabulary, pos_words_no, neg_words_no) = params
    log_pos = log(0.5)
    log_neg = log(0.5)
    len_voc = len(vocabulary)

    for word in parse_file(doc):
        log_pos += log(1.0 * (vocabulary.get(word, (0, 0))[0] + alpha) / (pos_words_no + alpha * len_voc))
        log_neg += log(1.0 * (vocabulary.get(word, (0, 0))[1] + alpha) / (neg_words_no + alpha * len_voc))

    if log_pos > log_neg:
        return 'ham', log_pos
    else:
        return 'spam', log_neg


def create_model():
    vocabulary = {}
    pos_words = 0
    neg_words = 0

    for eml in db.emails.find():
        pos_words += eml['pos_words']
        neg_words += eml['neg_words']
        for word, value in eml['vocabulary'].items():
            if vocabulary.get(word):
                vocabulary[word] = [vocabulary[word][0] + value[0],
                                    vocabulary[word][1] + value[1]]
            else:
                vocabulary[word] = value

    return vocabulary, pos_words, neg_words


@app.route('/', methods=["POST"])
def classify():
    params = create_model()
    eml = request.files['file']
    print predict(eml, params)

    return "OK"



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, threaded=True, debug=True)
