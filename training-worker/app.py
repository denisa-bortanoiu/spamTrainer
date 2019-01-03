import re
import os
import email
import datetime
from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient(
    'db',
    27017)
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


def count_words(eml, is_ham=True):
    vocabulary = {}
    pos_words_no = 0
    neg_words_no = 0

    if is_ham:
        for word in parse_file(eml):
            if vocabulary.get(word):
                vocabulary[word] = (vocabulary[word][0] + 1, vocabulary[word][1])
            else:
                vocabulary[word] = (1, 0)
            pos_words_no += 1
    else:
        for word in parse_file(eml):
            if vocabulary.get(word):
                vocabulary[word] = (vocabulary[word][0], vocabulary[word][1] + 1)
            else:
                vocabulary[word] = (0, 1)
            neg_words_no += 1

    return vocabulary, pos_words_no, neg_words_no


def save_to_database(name, params):
    (voc, pos_words_no, neg_words_no) = params
    new_email = {
        "name": str(datetime.datetime.utcnow()) + name,
        "vocabulary": voc,
        "pos_words": pos_words_no,
        "neg_words": neg_words_no
    }

    db.emails.insert_one(new_email)


@app.route('/<method>', methods=["POST"])
def upload_files(method):
    if method not in ('spam', 'ham'):
        return jsonify('Invalid method'), 400

    files = request.files.to_dict()

    for index, eml in files.items():
        msg = None
        try:
            msg = email.message_from_file(eml.stream)
        except Exception as e:
            print e

        if msg:
            params = count_words(msg, method=="ham")
            save_to_database(eml.filename, params)

    return "Upload completed", 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, threaded=True, debug=True)
