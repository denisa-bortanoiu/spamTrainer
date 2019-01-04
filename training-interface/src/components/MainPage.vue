<template>
  <div class="hello">
    <h1>Training interface</h1>
    <div class="container">
      <div class="row">
        <TrainFiles endpoint="spam" color="color: red"/>
        <TrainFiles endpoint="ham" color="color: green"/>
      </div>
      <div class="text-left footer">
      <p>Only .eml files are allowed for training.</p>
      <p class="float-right">Denisa Bortanoiu, 2018</p>
      </div>
    </div>
  </div>
</template>

<script>
import TrainFiles from "./TrainFiles.vue";

export default {
  name: 'MainPage',
  components: {TrainFiles},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  margin-top: 40px;
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
