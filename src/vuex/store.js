import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    blog: {
      id: null,
      title: null,
      intro: null,
      cover: null,
      type_id: null,
      type_name: null,
      tag_id: null,
      tag_name: null,
      author: null,
      date: null,
      content: null
    }
  },
  mutations: {
    updateBlog (state, blog) {
      state.blog = blog
    }
  }
})
export default store
