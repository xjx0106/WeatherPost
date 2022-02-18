<template>
  <div class="weather-week">
    本周天气
    <div class="weather-days">
      <div class="weather-day" v-for="(item, index) in daysData" :key="index">
        {{ "温度" + item.temperature }}
        {{ "天气" + item.weather }}
        {{ "时间" + item.time }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherWeek",
  props: {
    weekData: Object,
  },
  data() {
    return {
      daysData: [
        { temperature: "22", weather: "晴", time: "明天" },
        { temperature: "22", weather: "晴", time: "后天" },
        { temperature: "22", weather: "晴", time: "2月22日 周三" },
        { temperature: "22", weather: "晴", time: "2月23日 周四" },
        { temperature: "22", weather: "晴", time: "2月24日 周五" },
        { temperature: "22", weather: "晴", time: "2月25日 周六" },
        { temperature: "22", weather: "晴", time: "2月26日 周日" },
        { temperature: "22", weather: "晴", time: "2月27日 周一" },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.weather-week {
  text-align: center;
  font-size: 20px;
  border: 1px solid red;
  background-color: rgb(62, 255, 165);
  .weather-days {
    // border: 1px solid orange;
    display: flex;
    width: 100%;
    flex-direction: column;
    .weather-day {
      border: 1px solid green;
      height: 70px;
      width: calc(100% - 40px);
      margin: 10px 20px;
    }
  }
}
</style>
