<template>
  <div class="weather-today">
    今天天气（按小时）
    <div class="weather-hours">
      <div class="weather-hour" v-for="(item, index) in hoursData" :key="index">
        {{ "温度" + item.temperature }}
        {{ "天气" + item.weather }}
        {{ "时间" + item.time }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherToday",
  props: {
    todayData: Object,
  },
  data() {
    return {
      hoursData: [
        { temperature: "22", weather: "晴", time: "11:00" },
        { temperature: "22", weather: "晴", time: "12:00" },
        { temperature: "22", weather: "晴", time: "13:00" },
        { temperature: "22", weather: "晴", time: "14:00" },
        { temperature: "22", weather: "晴", time: "15:00" },
        { temperature: "22", weather: "晴", time: "16:00" },
        { temperature: "22", weather: "晴", time: "17:00" },
        { temperature: "22", weather: "晴", time: "18:00" },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.weather-today {
  text-align: center;
  font-size: 20px;
  border: 1px solid red;
  background-color: rgb(255, 179, 37);
  .weather-hours {
    // border: 1px solid orange;
    display: flex;
    width: 100%;
    flex-direction: column;
    .weather-hour {
      border: 1px solid green;
      height: 70px;
      width: calc(100% - 40px);
      margin: 10px 20px;
    }
  }
}
</style>
