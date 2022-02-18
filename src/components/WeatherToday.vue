<template>
  <div class="weather-today">
    <div class="title">今天天气<br />（按小时）</div>
    <div class="weather-hours">
      <div class="weather-hour" v-for="(item, index) in todayData" :key="index">
        <div class="hour-time">
          <span> {{ todayData[index].update_time | timeFilter }} <br /> </span>
        </div>
        <div class="hour-data">
          <div class="hour-temperature">
            {{ "温度:" + todayData[index].degree }}
          </div>
          <div class="hour-type">
            {{ "天气:" + todayData[index].weather }}
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

      const hour = fullTime.substring(8, 10);
      let _hour = "";
      if (parseInt(hour) >= 0 && parseInt(hour) < 4) {
        if (parseInt(hour) === 0) {
          _hour = "半夜12";
        } else {
          _hour = "半夜" + hour;
        }
      } else if (parseInt(hour) < 12) {
        _hour = "上午" + hour;
      } else if (parseInt(hour) === 12) {
        _hour = "中午" + hour;
      } else if (parseInt(hour) > 12 && parseInt(hour) < 18) {
        _hour = "下午" + (hour - 12);
      } else {
        _hour = "晚上" + (hour - 12);
      }

      const timeState = day_show + _hour + "点";
      return timeState;
    },
  },
  computed: {
    todayDataDisposed() {
      const res = this.todayData;
      res.map((item) => {
        const fullTime = item.update_time || "";
        const year = fullTime.substring(0, 4);
        const month = fullTime.substring(4, 6);
        const day = fullTime.substring(6, 8);
        const hour = fullTime.substring(8, 10);
        // console.log(year + "年" + month + "月" + day + "日" + hour + "时");

        const timeState = year + "年" + month + "月" + day + "日" + hour + "时";
        return timeState;
      });
      return res;
    },
  },
  data() {
    return {
      // hoursData: [
      //   { temperature: "22", weather: "晴", time: "11:00" },
      //   { temperature: "22", weather: "晴", time: "12:00" },
      //   { temperature: "22", weather: "晴", time: "13:00" },
      //   { temperature: "22", weather: "晴", time: "14:00" },
      //   { temperature: "22", weather: "晴", time: "15:00" },
      //   { temperature: "22", weather: "晴", time: "16:00" },
      //   { temperature: "22", weather: "晴", time: "17:00" },
      //   { temperature: "22", weather: "晴", time: "18:00" },
      // ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.weather-today {
  text-align: center;
  font-size: 20px;
  background-color: rgb(255, 193, 78);
  .title {
    font-size: 65px;
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
        font-size: 26px;
        display: flex;
        align-items: center;
        > span {
          margin-left: 10px;
        }
      }
      .hour-data {
        background-color: rgb(255, 200, 97);
        width: 44%;
        font-size: 28px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .hour-temperature {
        }
        .hour-type {
        }
      }
    }
  }
}
</style>
