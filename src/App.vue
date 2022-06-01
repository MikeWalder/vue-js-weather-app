<template>
  <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
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

        <!-- Add the style and icon you want -->
        <p></p>

        <div class="weather-container">
          <div class="temperature"> {{ Math.round(weather.main.temp) }}°C <fa icon="temperature-half" /></div>
          <div class="weather-now"> {{ weather.weather[0].main }} ({{ weather.weather[0].description }}) </div>
          <div class="pression-now">{{ weather.main.pressure }} HPa - <fa icon="droplet" /> {{ weather.main.humidity }}% </div>
        </div>

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
      const dayEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const monthEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
      'September', 'October', 'November', 'December'];

      let d = new Date();
      //console.log(d);
      let seconds = d.getSeconds();
      let minutes = d.getMinutes();
      let hours = d.getHours();

      let day = dayEn[d.getDay()];
      let date = d.getDate();
      let month = monthEn[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year} - ${hours}:${minutes}:${seconds}`;
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

#app {
  background-image: url('./assets/cold-weather.jpg');
  background-size: 60% auto;
  background-position: center;
  background-repeat: no-repeat;
  transition: 0.4s;
  border-left: 10px solid black;
  border-right: 10px solid black;
}

#app.warm {
  background-image: url('./assets/warm-weather.jpg');
}

#app.snow {
  background-image: url('');
}

main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.3));
}

.searching-box {
  width: 100%;
  margin-bottom: 35px;

}

.searching-box .searching-bar {
  display: block;
  width: 35%;
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
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 12px;
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

.weather-container .temperature {
  display: inline-block;
  padding: 10px 25px;
  color: #FFF;
  font-size: 100px;
  font-weight: 500;

  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 14px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-container .weather-now {
  color: #FFF;
  font-size: 48px;
  font-weight: 600;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-container .pression-now, .humidity {
  color: #FFF;
  font-size: 34px;
  font-weight: 400;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
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
