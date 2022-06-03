<template>
  <div id="app" :class="displayTempByLevel()">
    <main>

      <div class="searching-box">
        <input 
          type="text" 
          name="" 
          id="" 
          class="searching-bar"
          placeholder="Entrez une ville...." 
          v-model="query" 
          v-on:keypress="fetchingWeather"
        />
      </div>

      <div class="weather-wrapping" v-if="typeof weather.main != 'undefined'">
        
        <div class="location-container">
          <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
          <div class="date">{{ dateRendering() }}</div>
        </div>

        <div class="weather-container">
          <div class="temperature-now"> {{ Math.round(weather.main.temp) }}°C <!-- <fa icon="temperature-half" /> --></div>
          <div class="weather-now">
            <fa icon="sun" v-if="weather.weather[0].main == 'Clear'" />
            <fa icon="cloud" v-if="weather.weather[0].main == 'Clouds'" />
            <fa icon="cloud-rain" v-if="weather.weather[0].main == 'Rain'" />
          </div>
        </div>

        <div class="table-datas-container">
          <div class="pression-now"><fa icon="temperature-half" />{{ weather.main.pressure }} HPa</div>
          <div class="humidity-now"><fa icon="droplet" /> {{ weather.main.humidity }}% </div>
          <div class="wind-speed-now"><fa icon="wind" /> {{ weather.wind.speed }} m/s</div>
        </div>

        <!-- <CContainer>
          <CRow class="align-items-start">
            <CCol>
              <div class="pression-now"><fa icon="temperature-half" class="temperature-icon"/><br>{{ weather.main.pressure }} HPa</div>
            </CCol>
            <CCol>
              <div class="humidity-now"><fa icon="droplet" /><br> {{ weather.main.humidity }}% </div>
            </CCol>
          </CRow>
          <CRow class="align-items-start">
            <CCol>
              <div class="wind-speed-now"><fa icon="wind" /><br> {{ weather.wind.speed }} m/s</div>
            </CCol>
          </CRow>
        </CContainer> -->

      </div>

    </main>

  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      api_key: '4a84568d86cf18fd6001eb7685d96f29',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather: {}
    }
  },
  methods: {
    displayTempByLevel() {
      if(typeof this.weather.main != 'undefined') {
        if(this.weather.main.temp >= 25) {
          return 'warm';
        }
        else if(this.weather.main.temp < 25 && this.weather.main.temp > 15) {
          return 'middle'
        }
        else {
          return 'cold'
        }
      }
      else{
        return 'default';
      }
    },
    fetchingWeather(e) {
      if(e.key == "Enter") {
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
          .then(res => {
            return res.json();
          }).then(this.setResults);
      }
    },
    setResults(results) {
      this.weather = results;
      console.log(this.weather);
    },
    dateRendering() {
      /* const dayEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const monthEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
      'September', 'October', 'November', 'December']; */

      let d = new Date();
      //var s = d.format("hh:mm:ss tt");
      //console.log(d);
      /* let seconds = d.getSeconds(); */
      let minutes = d.getMinutes();

      if(minutes < 10){
        minutes = '0' + minutes;
      }
      let hours = d.getHours();
      if(hours < 10){
        hours = '0' + hours;
      }

      /* let day = dayEn[d.getDay()];
      let date = d.getDate();
      let month = monthEn[d.getMonth()];
      let year = d.getFullYear(); */

      return `${hours}:${minutes}`;
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'montserrat', sans-serif;
}

@media screen and (max-width: 1280px)
{
    /* Rédigez vos propriétés CSS ici */
    #app {
      background-size: 100% 100%;
    }
    .searching-box .searching-bar  {
      width: 95%
    }
    .location-container {
      display: flex;
      justify-content:space-between;
    }
    .location-container .location, .location-container .date {
      font-size: 22px;
    }
    .weather-container .weather-now {
      font-size: 78px;
      padding: 45px 0;
    }
    .weather-container .temperature-now {
      font-size: 72px;
    }
    .table-datas-container {
      font-size: 26px;
    }
    .pression-now, .humidity-now, .wind-speed-now {
      font-size: 26px;
    }
}

@media screen and (min-width: 1279px)
{
    /* Rédigez vos propriétés CSS ici */
    #app {
      background-size: 70% 100%;
    }
    .searching-box .searching-bar {
      width: 45%;
    }
    .location-container .location, .location-container .date {
      font-size: 50px;
    }
    .weather-container .weather-now {
      font-size: 190px;
      padding: 0.1em 0;
    }
    .weather-container .temperature-now {
      font-size: 140px;
    }
    .table-datas-container {
      font-size: 40px;
    }
    .pression-now, .humidity-now, .wind-speed-now {
      font-size: 40px;
    }
}

#app {
  background-position: center;
  background-repeat: no-repeat;
  transition: 0.4s;
}

#app.default {
  background-image: linear-gradient(to bottom, rgba(0, 213, 255, 0.5), rgba(0, 123, 255, 0.5));
}

#app.warm {
  background-image: linear-gradient(to bottom, rgba(250, 157, 7, 0.5), rgba(238, 255, 1, 0.5));
}

#app.middle {
  background-image: linear-gradient(to bottom, rgba(88, 250, 7, 0.5), rgba(16, 151, 64, 0.5));
}

#app.cold {
  background-image: linear-gradient(to bottom, rgba(7, 189, 250, 0.5), rgba(46, 122, 236, 0.5));
}

main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.2));
}

.searching-box {
  width: 100%;
  margin-bottom: 35px;

}

.searching-box .searching-bar {
  display: block;
  margin: 0 auto;
  padding: 15px;
  color: #313131;
  font-size: 22px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 15px 0px 15px;
  transition: 0.4s;
}

.searching-box .searching-bar:focus {
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.5);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 15px 0px 15px 0px;
}

.location-container .location {
  color: #FFF;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-container .date {
  color: #FFF;
  font-size: 28px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}

.weather-container {
  text-align: center;
}

.weather-container .temperature-now {
  display: inline-block;
  padding: 35px 25px;
  color: #FFF;
  font-weight: 500;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 14px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-container .weather-now {
  color: #FFF;
  font-weight: 600;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.pression-now, .humidity-now, .wind-speed-now {
  color: #FFF;
  /* font-size: 34px; */
  font-weight: 400;
  padding-bottom: 1.2em;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.table-datas-container {
  /* display: flex;
  align-items: center; */
  text-align: center;
}

#simple-chart {
  display: block;
  height: 500px;
  width: 60%;
  margin-top: 25px;
  margin: 0 auto;
  border: 3px outset black;
  background-color: #fff;
}

</style>
