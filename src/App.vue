<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/img/doge.jpg">
    <img alt="Vue logo" src="./assets/img/meme.jpg">
    <HelloWorld msg="天气预报哦"/>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created() {

  },
  mounted() {
    this.getWeather1();
  },
  methods: {
    async getWeather1() {
      const res = await axios.get("https://wis.qq.com/weather/common?source=pc&weather_type=observe|forecast_24h|air&province=福建省&city=漳州市&county=龙海区");
      console.log(res);

    },
    async getWeather2() {
      
    }
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
