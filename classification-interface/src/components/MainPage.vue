<template>
  <div class="hello">
    <h1>Email classifier</h1>
    <div class="container">
      <Classify endpoint="spam" color="color: red"/>
      <div class="text-left footer">
        <p>Only .eml files are allowed for classification.</p>
        <p class="float-right">Denisa Bortanoiu, 2018</p>
      </div>
    </div>
  </div>
</template>

<script>
import Classify from "./Classify.vue";

export default {
  name: 'MainPage',
  components: {Classify},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  margin-top: 80px;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #f2f2f2;
  padding: 10px;
}
</style>
