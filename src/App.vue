<template>
  <div id="app">
    <div class="img-container">
      <img alt="Vue logo" src="./assets/img/doge.jpg" />
      <img alt="Vue logo" src="./assets/img/meme.jpg" />
    </div>
    <HelloWorld msg="天气预报哦" />
    <div class="btns-container">
      <div @click="getWeather" class="get-weather-btn">获取天气预报</div>
      <div @click="clearWeather" class="get-weather-btn">清除</div>
    </div>
    <div class="request-time">{{ requestTime }}</div>
    <div class="json-data-container">
      <JsonViewer
        :value="weatherData"
        :expand-depth="5"
        copyable
        boxed
        sort
        class="json-data"
      />
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { jsonp } from "vue-jsonp";
import JsonViewer from "vue-json-viewer";

export default {
  name: "App",
  components: {
    HelloWorld,
    JsonViewer,
  },
  data() {
    return {
      weatherUrl: "https://wis.qq.com/weather/common",
      weatherData: {},
      requestTime: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    async getWeather() {
      const res = await jsonp(this.weatherUrl, {
        source: "pc",
        weather_type: "observe|forecast_24h|air",
        province: "福建省",
        city: "漳州市",
        county: "龙海区",
      });
      if (res && res.data) {
        this.weatherData = res;

        const date = new Date();
        const currentDate = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
        const currentTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        this.requestTime = "天气数据获取于： " + currentDate + "  " + currentTime;
      }
    },
    clearWeather() {
      this.requestTime = "";
      this.weatherData = {};
    }
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.img-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
img {
  width: 150px;
  height: 150px;
  margin: 15px;
}
iframe {
  width: 200px;
  height: 200px;
  border: 1px solid red;
}
.btns-container {
  display: flex;
  justify-content: center;
}
.get-weather-btn {
  border: 1px solid #188cff;
  height: 40px;
  width: 120px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  margin: 20px 20px 10px 20px;
}
.request-time {
  width: 100%;
  text-align: center;
  color: dimgray;
  font-size: 15px;
  height: 20px;
}
.json-data-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.json-data {
  width: 95%;
}
</style>
