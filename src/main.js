import { createApp } from 'vue'
import App from './App.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';

import { fas } from '@fortawesome/free-solid-svg-icons'

// import { FontAwesomeIconomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(fas)

createApp(App)
.component('fa', FontAwesomeIcon)
.mount('#app')
