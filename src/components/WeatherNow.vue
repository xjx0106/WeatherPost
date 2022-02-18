<template>
  <div class="weather-now">
    <div class="title">今天天气</div>
    <div class="weather-type">
      <!-- <div class="weather-type-key">天气</div> -->
      <!-- <div class="weather-type-value">{{ nowData.weather }}</div> -->

      <div class="weather-type-value">{{ weatherRange.from || "-" }}</div>
      <div class="weather-type-key">转</div>
      <div class="weather-type-value">{{ weatherRange.to || "-" }}</div>
    </div>
    <div class="temperature">
      <!-- <div class="temperature-key">气温</div> -->
      <!-- <div class="temperature-value">{{ nowData.degree }}</div> -->
      <!-- <div class="temperature-key">度</div> -->

      <div class="temperature-value">{{ temperatureRange.from || "-" }}</div>
      <div class="temperature-key">~</div>
      <div class="temperature-value">{{ temperatureRange.to || "-" }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherNow",
  props: {
    nowData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    weekData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    todayWeatherInWeek() {
      let res = {};
      for (let i in this.weekData) {
        if (this.weekData[i].time === this.nowDate) {
          res = this.weekData[i];
        }
      }
      return res;
    },
    weatherRange() {
      let res = {
        from: "",
        to: "",
      };
      if (
        this.todayWeatherInWeek &&
        this.todayWeatherInWeek.day_weather &&
        this.todayWeatherInWeek.night_weather
      ) {
        res = {
          from: this.todayWeatherInWeek.day_weather,
          to: this.todayWeatherInWeek.night_weather,
        };
      }
      return res;
    },
    temperatureRange() {
      let res = {
        from: "",
        to: "",
      };
      if (
        this.todayWeatherInWeek &&
        this.todayWeatherInWeek.min_degree &&
        this.todayWeatherInWeek.max_degree
      ) {
        res = {
          from: this.todayWeatherInWeek.min_degree + "°C",
          to: this.todayWeatherInWeek.max_degree + "°C",
        };
      }
      return res;
    },
  },
  data() {
    return {
      nowDate: "",
    };
  },
  created() {},
  mounted() {
    this.getNowDate();
  },
  methods: {
    getNowDate() {
      const date = new Date();
      const yearShow = date.getFullYear() + "";
      const nowMonth = date.getMonth() + 1; // number
      const monthShow = nowMonth < 10 ? "0" + nowMonth : "" + nowMonth;
      const nowDay = date.getDate(); // number
      const dayShow = nowDay < 10 ? "0" + nowDay : "" + nowDay;
      const fullDate = yearShow + "-" + monthShow + "-" + dayShow;
      this.nowDate = fullDate;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.weather-now {
  text-align: center;
  font-size: 20px;
  height: 600px;
  background-color: rgb(208, 255, 132);
  .title {
    font-size: 60px;
    padding-top: 80px;
  }
  .weather-type {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    .weather-type-key {
      font-size: 50px;
      margin: 0px 10px;
    }
    .weather-type-value {
      font-size: 60px;
      display: flex;
      align-items: center;
      background-color: rgb(239, 255, 215);
      border-radius: 20px;
      padding: 10px;
    }
  }
  .temperature {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    align-items: center;
    .temperature-key {
      font-size: 50px;
      margin: 0px 10px;
    }
    .temperature-value {
      font-size: 60px;
      display: flex;
      align-items: center;
      background-color: rgb(239, 255, 215);
      border-radius: 20px;
      padding: 10px;
    }
  }
}
</style>
