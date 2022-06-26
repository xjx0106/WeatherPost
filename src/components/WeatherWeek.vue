<template>
  <div class="weather-week">
    <div class="title">本周天气</div>
    <div class="weather-days">
      <div
        class="weather-day"
        v-for="(item, index) in weekDataShow"
        :key="index"
      >
        <div class="day-time">
          {{ item.time | showDate }}
        </div>
        <div class="day-data">
          <div class="day-weather-type">
            <div class="day-weather-type-1">
              {{ item.day_weather }}
            </div>
            <div class="day-weather-type-to">转</div>
            <div class="day-weather-type-2">
              {{ item.night_weather }}
            </div>
          </div>
          <div class="day-weather-temperature">
            <div class="day-tp-1">
              {{ item.min_degree }}
            </div>
            <div class="day-tp-to">~</div>
            <div class="day-tp-2">
              {{ item.max_degree }}
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
    weekData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  created() {
    const date = new Date();
    const nowYear = date.getFullYear();
    const nowMonth =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : "" + date.getMonth() + 1;
    const nowDay =
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate() + "";
    this.nowYearMonthDay = nowYear + "-" + nowMonth + "-" + nowDay;
  },
  computed: {
    weekDataShow() {
      let dataArr = [];
      for (let i in this.weekData) {
        dataArr.push(this.weekData[i]);
      }
      const res = dataArr.filter((day) => {
        return day.time >= this.nowYearMonthDay;
      });
      return res;
    },
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
    return {
      nowYearMonthDay: "",
    };
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
    font-size: 53px;
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
      border-radius: 10px 10px 0px 0px;
      overflow: hidden;
    }
    > :last-child {
      border-radius: 0px 0px 10px 10px;
      overflow: hidden;
    }
    .weather-day {
      border-left: 3px solid white;
      border-right: 3px solid white;
      border-bottom: 3px solid white;
      height: 100px;
      width: calc(100% - 30px);
      margin: 0px 15px;
      display: flex;
      .day-time {
        width: 43%;
        font-size: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(188, 225, 255);
      }
      .day-data {
        background-color: rgb(167, 215, 255);
        width: 57%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .day-weather-type {
          display: flex;
          justify-content: center;
          align-items: center;
          .day-weather-type-1 {
            font-size: 30px;
          }
          .day-weather-type-to {
            font-size: 22px;
            margin: 0px 10px;
          }
          .day-weather-type-2 {
            font-size: 30px;
          }
        }
        .day-weather-temperature {
          display: flex;
          justify-content: center;
          align-items: center;
          line-height: 36px;
          .day-tp-1 {
            font-size: 30px;
            padding: 3px;
            line-height: 30px;
            border-radius: 5px;
            background-color: rgba(255, 255, 255, 0.6);
          }
          .day-tp-to {
            font-size: 26px;
            margin: 0px 12px;
          }
          .day-tp-2 {
            font-size: 30px;
            padding: 3px;
            line-height: 30px;
            border-radius: 5px;
            background-color: rgba(255, 255, 255, 0.6);
          
          }
          .day-tp-word {
            font-size: 24px;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
