<template>
  <div class="hello">
    <h1>Training interface</h1>
    <div class="container">
      <div class="row">
        <b-col>
          <h2>Train as <span style="color: red">spam</span></h2>
          <b-form-file multiple v-model="spam_files"
                       ref="spamInput"
                       accept="message/rfc822"
                       drag-drop type="is-dark"
                       placeholder="Choose files...">

          </b-form-file>
          <div v-if="spam_files.length > 0" class="float-left">
            <div class="mt-3">
              <h5>Selected files: </h5>
            </div>
            <b-list-group v-for="file in spam_files" v-bind:data="file" v-bind:key="file.name">
              <b-list-group-item>{{ file.name }}</b-list-group-item>
            </b-list-group>
          </div>
          <div class="display-1">
            <b-button @click="clearFiles('spam')" variant="outline-danger" class="buttons">
              Clear all
            </b-button>
            <b-button @click="send_files('spam')" variant="outline-success" class="buttons">
              Train!
            </b-button>
          </div>
        </b-col>
        <b-col>
          <h2>Train as <span style="color: green">ham</span></h2>
          <b-form-file multiple v-model="ham_files"
                       ref="hamInput"
                       drag-drop type="is-dark"
                       placeholder="Choose files...">

          </b-form-file>
          <div v-if="ham_files.length > 0" class="float-left">
            <div class="mt-3">
              <h5>Selected files: </h5>
            </div>
            <b-list-group v-for="file in ham_files" v-bind:data="file" v-bind:key="file.name">
              <b-list-group-item>{{ file.name}}</b-list-group-item>
            </b-list-group>
          </div>
          <div class="display-1">
            <b-button @click="clearFiles('ham')" variant="outline-danger" class="buttons">
              Clear all
            </b-button>
            <b-button @click="send_files('ham')" variant="outline-success" class="buttons">
              Train!
            </b-button>
          </div>
        </b-col>
      </div>

    </div>

  </div>
</template>

<script>
  import axios from 'axios';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
      return {
        spam_files: [],
        ham_files: []
      }
    },
  methods: {
    clearFiles(type) {
      if (type === 'ham')
        this.$refs.hamInput.reset();
      else
        this.$refs.spamInput.reset();
    },
    send_files(endpoint) {
      let files = this.spam_files;
      if (endpoint === "ham") {
       files = this.ham_files;
      }

      console.log(endpoint);

      let formData = new FormData();
      for( var i = 0; i < files.length; i++ ){
        let file = files[i];

        formData.append('files[' + i + ']', file);
      }

      axios.post('http://localhost:5001/' + endpoint,
        formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        }
      ).then(function(){
        console.log('SUCCESS!!');
      })
      .catch(function(){
        console.log('FAILURE!!');
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buttons {
  margin: 5px;
}
  h1 {
    margin-bottom: 40px;
  }
</style>
