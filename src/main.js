import Vue from 'vue'
import App from './App.vue'
import router from './router'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faImages, faTrash, faPaperPlane, faHeart, faPen, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

library.add(faTrash, faImages, faPaperPlane, faHeart, faPen, faEllipsisH)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
