<template>
  <div class="weather-now">
    <div class="title">
      今天天气
    </div>
    <div class="weather-type">
      天气 {{ nowData.weather }}
    </div>
    <div class="temperature">
      气温 {{ nowData.degree }} 度
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherNow",
  props: {
    nowData: Object,
    default: () => {
      return {}
    }
  },
  data() {
    return {
    }
  }
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
  }
  .temperature {
    font-size: 70px;
    margin-top: 15;
  }
}
</style>
