<template>
  <b-col>
    <h2>Train as <span v-bind:style="color">{{ endpoint }}</span></h2>
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
    <b-form-file multiple v-model="files"
                 ref="endpoint"
                 accept="message/rfc822"
                 drag-drop type="is-dark"
                 placeholder="Choose files...">

    </b-form-file>
    <div v-if="files.length > 0" class="float-left">
      <div class="mt-3">
        <h5>Selected files: </h5>
      </div>
      <b-list-group v-for="file in files" v-bind:data="file" v-bind:key="file.name">
        <b-list-group-item>{{ file.name }}</b-list-group-item>
      </b-list-group>
    </div>
    <div class="display-1">
      <b-button @click="clearFiles()" variant="outline-danger" class="buttons">
        Clear all
      </b-button>
      <b-button @click="send_files()" variant="outline-success" class="buttons">
        Train!
      </b-button>
    </div>
  </b-col>
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
      files: [],
        showSuccess: false,
        showFailure: false
    }
  },
  methods: {
    clearFiles() {
      this.$refs.endpoint.reset();
    },
    send_files() {
      let self = this;
      let formData = new FormData();
      for(let i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append('files[' + i + ']', file);
      }

      axios.post('http://localhost:5001/' + this.endpoint,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(function(){
        self.showSuccess = true;
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

</style>
