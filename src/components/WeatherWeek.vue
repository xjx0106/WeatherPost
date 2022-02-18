<template>
  <div class="weather-week">
    <div class="title">本周天气</div>
    <div class="weather-days">
      <div class="weather-day" v-for="(item, index) in weekData" :key="index">
        <div class="day-time">
          {{ weekData[index] && weekData[index].time | showDate }}
        </div>
        <div class="day-data">
          <div class="day-weather-type">
            <div class="day-weather-type-1">
              {{ weekData[index] && weekData[index].day_weather }}
            </div>
            <div class="day-weather-type-to">转</div>
            <div class="day-weather-type-2">
              {{ weekData[index] && weekData[index].night_weather }}
            </div>
          </div>
          <div class="day-weather-temperature">
            <div class="day-tp-1">
              {{ weekData[index] && weekData[index].min_degree }}
            </div>
            <div class="day-tp-to">~</div>
            <div class="day-tp-2">
              {{ weekData[index] && weekData[index].max_degree }}
            </div>
            <div class="day-tp-word">度</div>
          </div>
        </div>
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
  filters: {
    showDate(val) {
      const date = new Date();
      const nowMonth = date.getMonth() + 1; // number
      const nowDay = date.getDate(); // number

      let res = "";

      if (val) {
        const dateArr = val.split("-");
        const dataMonth = parseInt(dateArr[1]);
        const dataDay = parseInt(dateArr[2]);
        res = dateArr[1] + "月" + dateArr[2] + "日";
        if (nowMonth === dataMonth) {
          if (nowDay === dataDay + 1) {
            res = "昨天";
          } else if (nowDay === dataDay + 2) {
            res = "前天";
          } else if (nowDay === dataDay) {
            res = "今天";
          } else if (nowDay === dataDay - 1) {
            res = "明天";
          } else if (nowDay === dataDay - 2) {
            res = "后天";
          }
        }
      }
      return res;
    },
  },
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.weather-week {
  text-align: center;
  font-size: 20px;
  background-color: rgb(128, 198, 255);
  padding-bottom: 50px;
  .title {
    font-size: 65px;
    padding-top: 50px;
  }
  .weather-days {
    margin-top: 30px;
    // border: 1px solid orange;
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-bottom: 30px;
    > :first-child {
      border-top: 3px solid white;
    }
    .weather-day {
      border-left: 3px solid white;
      border-right: 3px solid white;
      border-bottom: 3px solid white;
      height: 100px;
      width: calc(100% - 40px);
      margin: 0px 20px;
      display: flex;
      .day-time {
        width: 40%;
        font-size: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(188, 225, 255);
      }
      .day-data {
        background-color: rgb(167, 215, 255);
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .day-weather-type {
          display: flex;
          justify-content: center;
          align-items: center;
          .day-weather-type-1 {
            font-size: 27px;
          }
          .day-weather-type-to {
            font-size: 20px;
            margin: 0px 10px;
          }
          .day-weather-type-2 {
            font-size: 27px;
          }
        }
        .day-weather-temperature {
          display: flex;
          justify-content: center;
          align-items: center;
          line-height: 40px;
          .day-tp-1 {
            font-size: 30px;
          }
          .day-tp-to {
            font-size: 30px;
            margin: 0px 12px;
          }
          .day-tp-2 {
            font-size: 30px;
          }
          .day-tp-word {
            font-size: 27px;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
