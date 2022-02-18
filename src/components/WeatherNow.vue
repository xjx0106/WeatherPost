<template>
  <div class="weather-now">
    <div class="title">今天天气</div>
    <div class="weather-type">
      <div class="weather-type-key">天气</div>
      <div class="weather-type-value">{{ nowData.weather }}</div>
    </div>
    <div class="temperature">
      <div class="temperature-key">气温</div>
      <div class="temperature-value">{{ nowData.degree }}</div>
      <div class="temperature-key">度</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherNow",
  props: {
    nowData: Object,
    default: () => {
      return {};
    },
  },
  data() {
    return {};
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
    font-size: 70px;
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    .weather-type-key {
    }
    .weather-type-value {
      margin: 0px 10px;
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
    font-size: 70px;
    margin-top: 20px;
    align-items: center;
    .temperature-key {
    }
    .temperature-value {
      margin: 0px 10px;
      display: flex;
      align-items: center;
      background-color: rgb(239, 255, 215);
      border-radius: 20px;
      padding: 10px;
    }
  }
}
</style>
