<template>
  <div class="weather-today">
    <div class="title">未来的<br />18个小时</div>
    <div class="weather-hours-container">
      <div class="weather-hours">
        <div
          class="weather-hour"
          v-for="(item, index) in hoursDataShow"
          :key="index"
        >
          <div class="hour-time">
            <div>{{ item.update_time | timeFilter1 }}</div>
            <div>{{ item.update_time | timeFilter2 }}</div>
          </div>
          <div class="hour-data">
            <div class="hour-temperature">
              {{ "温度:" + item.degree }}
            </div>
            <div class="hour-type">
              {{ "天气:" + item.weather }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherTodayScroll",
  props: {
    todayData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  filters: {
    timeFilter1(val) {
      const fullTime = val || "";
      // const year = fullTime.substring(0, 4);
      // const month = fullTime.substring(4, 6);
      const day = fullTime.substring(6, 8);
      let day_show = "";
      const date = new Date();
      const nowDay = date.getDate();

      if (parseInt(day) === nowDay - 2) {
        day_show = "前天";
      } else if (parseInt(day) === nowDay - 1) {
        day_show = "昨天";
      } else if (parseInt(day) === nowDay) {
        day_show = "今天";
      } else if (parseInt(day) === nowDay + 1) {
        day_show = "明天";
      } else if (parseInt(day) === nowDay + 2) {
        day_show = "后天";
      } else {
        day_show = day + "日";
      }

      const timeState = day_show;
      return timeState;
    },
    timeFilter2(val) {
      const fullTime = val || "";
      const hour = parseInt(fullTime.substring(8, 10));
      let _hour = "";
      if (hour >= 0 && hour < 4) {
        if (hour === 0) {
          _hour = "半夜12";
        } else {
          _hour = "半夜" + hour;
        }
      } else if (hour < 12) {
        _hour = "上午" + hour;
      } else if (hour === 12) {
        _hour = "中午" + hour;
      } else if (hour > 12 && hour < 18) {
        _hour = "下午" + (hour - 12);
      } else {
        _hour = "晚上" + (hour - 12);
      }

      const timeState = _hour + "点";
      return timeState;
    },
  },
  computed: {
    hoursData() {
      let res = [];
      for (let i in this.todayData) {
        res.push(this.todayData[i]);
      }
      return res;
    },
    hoursDataShow() {
      let hoursAfter = this.hoursData.filter((item) => {
        return item.update_time > this.nowMonthDayHourMinSec;
      });
      let res = [];
      if (hoursAfter.length > 18) {
        res = hoursAfter.slice(0, 18);
      }
      return res;
    },
  },
  data() {
    return {
      nowMonthDayHourMinSec: "", // "20221225090000"
    };
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
    const nowHour =
      date.getHours() < 10 ? "0" + date.getHours() : date.getHours() + "";
    const nowMinute =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const nowSecond =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

    this.nowMonthDayHourMinSec =
      nowYear +
      "" +
      nowMonth +
      "" +
      nowDay +
      "" +
      nowHour +
      "" +
      nowMinute +
      "" +
      nowSecond;
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.weather-today {
  text-align: center;
  font-size: 20px;
  background-color: rgb(255, 174, 241);
  width: 100%;
  padding-bottom: 70px;
  .title {
    font-size: 50px;
    padding-top: 50px;
  }
  .weather-hours-container {
    width: calc(100% - 40px);
    margin: 0px auto;
    -webkit-overflow-scrolling: auto;
    overflow-x: auto;
    border: 3px solid white;
    border-radius: 10px;
    margin-top: 30px;
    .weather-hours {
      display: flex;
      width: fit-content;
      width: calc(200px * 12);

      .weather-hour {
        border-right: 2px solid rgb(230, 240, 255);
        height: 300px;
        width: 200px;
        .hour-time {
          height: 50%;
          background-color: rgb(234, 189, 255);
          display: flex;
          flex-direction: column;
          justify-content: center;
          > :first-child {
            font-size: 30px;
          }
          > :last-child {
            font-size: 33px;
          }
        }
        .hour-data {
          height: 50%;
          background-color: rgb(226, 162, 255);
          display: flex;
          flex-direction: column;
          justify-content: center;
          .hour-temperature {
            font-size: 34px;
          }
          .hour-type {
            font-size: 34px;
          }
        }
      }
      > :last-child {
        border-right: 0px;
      }
    }
  }
}
</style>
