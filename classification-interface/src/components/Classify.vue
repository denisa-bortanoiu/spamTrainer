<template>
  <div>
 <h2>Classify your email</h2>
  <div class="row">
  <b-col>

    <b-alert variant="success"
             dismissible
             :show="showSuccess"
             @dismissed="showSuccess=false">
      The upload was successful!
    </b-alert>
    <b-alert variant="danger"
             dismissible
             :show="showFailure"
             @dismissed="showFailure=false">
      The upload has failed!
    </b-alert>
    <b-form-file v-model="file"
                 ref="endpoint"
                 accept="message/rfc822"
                 drag-drop type="is-dark"
                 placeholder="Upload file..."
                 class="float-left my-input">
    </b-form-file>
    <div class="float-right">
      <b-button @click="clearFiles()" variant="outline-danger" class="buttons">
        Clear
      </b-button>
      <b-button @click="send_files()" variant="outline-success" class="buttons">
        Classify!
      </b-button>
    </div>
  </b-col>
  </div>
  <div class="row">
    <b-col>
      <b-card v-if=showSpam
              border-variant="danger"
              header="SPAM"
              header-bg-variant="danger"
              header-text-variant="white"
              align="center">
        <p>The looks like unwanted email. You should discard it!</p>
      </b-card>
      <b-card v-if=showHam
              border-variant="success"
              header="NOT SPAM"
              header-bg-variant="success"
              header-text-variant="white"
              align="center">
        <p>This email looks safe.</p>
      </b-card>
    </b-col>


  </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "TrainFiles",
  props: {
    endpoint: String,
    color: String
  },
  data(){
    return {
      file: null,
      showSuccess: false,
      showFailure: false,
      showSpam: false,
      showHam: false
    }
  },
  methods: {
    clearFiles() {
      this.$refs.endpoint.reset();
      this.showFailure = false;
      this.showSuccess = false;
      this.showSpam = false;
      this.showHam = false;
    },
    send_files() {
      let self = this;
      this.showSpam = false;
      this.showHam = false;

      let formData = new FormData();
      formData.append('file', this.file);

      axios.post('http://localhost:5002/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then((resp) => {
          self.showSuccess = true;
          console.log(resp.data.class);
          if (resp.data.class === 'ham') {
              self.showHam = true;
          } else {
              self.showSpam = true;
          }

      })
      .catch(function(){
        self.showFailure = true;
      });

    }
  }
}
</script>

<style scoped>
.buttons {
  margin: 10px;
}
  h1 {
    margin-bottom: 40px;
  }

  .my-input {
    width: 80%;
    margin-top: 11px;
  }

  .row {
    margin-top: 30px;
  }
</style>
