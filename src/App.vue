<template>
  <div id="app">
    <div class="weather-container">
      <WeatherNow :nowData="weatherData.now" :weekData="weatherData.week"/>
      <WeatherTodayScroll :todayData="weatherData.today" />
      <WeatherToday :todayData="weatherData.today" />
      <WeatherWeek :weekData="weatherData.week" />
      <div class="developer-view">
        <div class="enter-keys">
          <div
            v-for="(item, index) in developerData.keyData"
            :key="index"
            class="enter-key"
            @click="clickKey(index)"
            :style="developerData.keysChain[developerData.keysChain.length - 1] === index ? 'background-color:rgb(138, 201, 253)' : ''"
          />
        </div>
        <div class="developer-title" v-if="developerData.show">天气预报哦</div>
        <div class="meme-container" v-if="developerData.show">
          <img class="img-meme" src="./assets/img/meme/doge.jpg" />
          <img class="img-meme" src="./assets/img/meme/meme.jpg" />
        </div>
        <div class="btns-container" v-if="developerData.show">
          <div @click="getWeather" class="get-weather-btn">获取天气预报</div>
          <div @click="clearWeather" class="get-weather-btn">清除</div>
        </div>
        <div class="request-time" v-if="developerData.show">
          {{ requestTime }}
        </div>
        <div class="json-data-container" v-if="developerData.show">
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
  </div>
</template>

<script>
import WeatherNow from "./components/WeatherNow.vue";
import WeatherTodayScroll from "./components/WeatherToday_Scroll.vue";
import WeatherToday from "./components/WeatherToday.vue";
import WeatherWeek from "./components/WeatherWeek.vue";
import { jsonp } from "vue-jsonp";
import JsonViewer from "vue-json-viewer";

export default {
  name: "App",
  components: {
    WeatherNow,
    WeatherTodayScroll,
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
        week: {},
      },
      developerData: {
        keyData: [false, false, false, false, false],
        keysChain: [],
        show: false,
      },
    };
  },
  created() {},
  mounted() {
    this.getWeather();
  },
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
        this.weatherData.now = res.data.observe;
        this.weatherData.today = res.data.forecast_1h;
        this.weatherData.week = res.data.forecast_24h;

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
    clickKey(keyIndex) {
      if (!this.developerData.show) {
        this.developerData.keyData[keyIndex] = true;
        if (this.developerData.keysChain.length < 3) {
          this.developerData.keysChain.push(keyIndex);
        } else {
          this.developerData.keysChain.shift();
          this.developerData.keysChain.push(keyIndex);
        }
        if (this.developerData.keysChain.join("") === "042") {
          this.developerData.show = true;
          this.developerData.keysChain = [];
        }
      } else {
        this.developerData.show = false;
        this.developerData.keysChain = [];
      }
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
  .developer-view {
    width: 100%;
    .enter-keys {
      width: 100%;
      display: flex;
      .enter-key {
        background-color: rgb(128, 198, 255);
        height: 20vw;
        width: 20vw;
      }
    }
    .developer-title {
      padding-top: 40px;
      font-size: 24px;
      text-align: center;
    }
    .meme-container {
      margin-top: 20px;
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
      padding-bottom: 50px;
      .json-data {
        width: 95%;
      }
    }
  }
}
</style>
