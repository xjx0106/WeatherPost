<template>
  <div class="weather-now">
    当前天气
    <div class="temperature">
      22 度
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
  border: 1px solid red;
  height: 200px;
  background-color: rgb(208, 255, 132);
  .temperature {
    font-size: 80px;
  }
}
</style>
