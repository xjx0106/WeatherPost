<template>
  <div id="app">
    <div class="weather-container">
      <WeatherNow :nowData="weatherData.now" />
      <WeatherToday :todayData="weatherData.today" />
      <WeatherWeek :weekData="weatherData.week"/>
      <div class="meme-container">
        <img class="img-meme" src="./assets/img/meme/doge.jpg" />
        <img class="img-meme" src="./assets/img/meme/meme.jpg" />
      </div>
      <div class="btns-container">
        <div @click="getWeather" class="get-weather-btn">获取天气预报</div>
        <div @click="clearWeather" class="get-weather-btn">清除</div>
      </div>
      <div class="request-time">{{ requestTime }}</div>
      <div class="json-data-container">
        <JsonViewer
          :value="weatherJsonData"
          :expand-depth="5"
          copyable
          boxed
          sort
          class="json-data"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WeatherNow from "./components/WeatherNow.vue";
import WeatherToday from "./components/WeatherToday.vue";
import WeatherWeek from "./components/WeatherWeek.vue";
import { jsonp } from "vue-jsonp";
import JsonViewer from "vue-json-viewer";

export default {
  name: "App",
  components: {
    WeatherNow,
    WeatherToday,
    WeatherWeek,
    JsonViewer,
  },
  data() {
    return {
      weatherUrl: "https://wis.qq.com/weather/common",
      weatherJsonData: {},
      requestTime: "",

      weatherData: {
        now: {},
        today: {},
        week: {}
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    async getWeather() {
      const res = await jsonp(this.weatherUrl, {
        source: "pc",
        weather_type: "observe|forecast_24h|forecast_1h",
        province: "福建省",
        city: "漳州市",
        county: "龙海区",
      });
      if (res && res.data) {
        this.weatherJsonData = res;

        const date = new Date();
        const currentDate =
          date.getFullYear() +
          "年" +
          (date.getMonth() + 1) +
          "月" +
          date.getDate() +
          "日";

        let hour = "";
        if (date.getHours() < 10) {
          hour = "0" + date.getHours() + "";
        } else {
          hour = date.getHours();
        }

        let minute = "";
        if (date.getMinutes() < 10) {
          minute = "0" + date.getMinutes();
        } else {
          minute = date.getMinutes();
        }

        let second = "";
        if (date.getSeconds() < 10) {
          second = "0" + date.getSeconds();
        } else {
          second = date.getSeconds();
        }

        const currentTime = hour + ":" + minute + ":" + second;

        this.requestTime =
          "天气数据获取于： " + currentDate + "  " + currentTime;
      }
    },
    clearWeather() {
      this.requestTime = "";
      this.weatherJsonData = {};
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.weather-container {
  width: 100%;
  .meme-container {
    margin-top: 100px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    > .img-meme {
      width: 150px;
      height: 150px;
      margin: 15px;
    }
  }
  .btns-container {
    display: flex;
    justify-content: center;
    .get-weather-btn {
      border: 1px solid #188cff;
      height: 40px;
      width: 120px;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      margin: 0px 20px 10px 20px;
    }
  }
  .request-time {
    width: 100%;
    text-align: center;
    color: dimgray;
    font-size: 15px;
    height: 20px;
    margin-bottom: 10px;
  }
  .json-data-container {
    width: 100%;
    display: flex;
    justify-content: center;
    .json-data {
      width: 95%;
    }
  }
}
</style>
