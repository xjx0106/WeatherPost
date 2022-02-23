<template>
  <div class="weather-today">
    <div class="title">未来的<br />12个小时</div>
    <div class="weather-hours">
      <div
        class="weather-hour"
        v-for="(item, index) in hoursDataShow"
        :key="index"
      >
        <div class="hour-time">
          <span> {{ item.update_time | timeFilter }} <br /> </span>
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
</template>

<script>
export default {
  name: "WeatherToday",
  props: {
    todayData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  filters: {
    timeFilter(val) {
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

      const timeState = day_show + _hour + "点";
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
      if (hoursAfter.length > 12) {
        res = hoursAfter.slice(0, 12);
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
  background-color: rgb(255, 193, 78);
  .title {
    font-size: 50px;
    padding-top: 50px;
  }
  .weather-hours {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding-top: 20px;
    padding-bottom: 50px;
    > :nth-child(1) {
      border-top: 3px solid white;
      border-radius: 10px 10px 0px 0px;
      overflow: hidden;
    }
    > :last-child {
      border-radius: 0px 0px 10px 10px;
      overflow: hidden;
    }
    .weather-hour {
      border-bottom: 3px solid white;
      border-left: 3px solid white;
      border-right: 3px solid white;
      height: 100px;
      width: calc(100% - 40px);
      margin: 0px 20px;
      display: flex;
      .hour-time {
        background-color: rgb(255, 217, 147);
        width: 56%;
        font-size: 24px;
        display: flex;
        align-items: center;
        > span {
          margin-left: 10px;
        }
      }
      .hour-data {
        background-color: rgb(255, 200, 97);
        width: 44%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .hour-temperature {
          font-size: 22px;
        }
        .hour-type {
          font-size: 22px;
        }
      }
    }
  }
}
</style>
