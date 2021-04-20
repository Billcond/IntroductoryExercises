import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{//用于权限的控制  其实这里就是共享了一下这个privilege  实际操作中  刷新页面的时候这里的数据会丢失 
      username:"null",
      privilege:"null"
    }
  },
  mutations: {

  },
  actions: {

  },
  modules: {

  }
})
