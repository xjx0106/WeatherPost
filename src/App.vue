<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/img/doge.jpg">
    <img alt="Vue logo" src="./assets/img/meme.jpg">
    <HelloWorld msg="天气预报哦"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {
  width: 200px;
  height: 200px;
  margin: 30px;
}
</style>
