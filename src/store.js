import Vue from 'vue'
import Vuex from 'vuex'
import { resolve } from 'path';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nightMode: false,
    isShowSideBar: false,
    sentences: [],
    currentSentence: null,
  },
  mutations: {
    NIGHTMODE(state, payload) {
      state.nightMode = payload
    },
    ISSHOWSIDEBAR(state, payload) {
      state.isShowSideBar = payload
    },
    SETLOCALDATA(state, payload) {
      state.sentences = payload
    },
    UPDATESENTENCE(state, payload) {
      if (payload.index > state.sentences.length - 1) {
        state.sentences.push(payload.ctx)
      } else {
        state.sentences[payload.index] = payload.ctx
      }
    },
    DELETESENTENCE(state, payload) {
      state.sentences.splice(payload, 1)
    },
    SETSENTENCE(state, payload) {
      let newArr = []
      state.currentSentence = payload
    },
  },
  actions: {
    getloacalData(context) {
      let defaultdata = [
        '蹲跟你講電話的那個晚上，我聽見了你的聲音。',
        '當我閉上雙眼，眼前只有一片漆黑。',
        '與你在一起的夏天比冬天更溫暖。'
      ]
      chrome.storage.sync.get('rubbishData', data => {
        context.commit('SETLOCALDATA', data.rubbishData)
        context.dispatch('setSentence')

      })
    },
    changeMode(context, payload) {
      context.commit('NIGHTMODE', payload)
    },
    isShowSideBar(context, payload) {
      context.commit('ISSHOWSIDEBAR', payload)
    },
    setSentence(context) {
      if (context.state.sentences) {
        let index = Math.floor(Math.random() * context.state.sentences.length)
        let ctx = context.state.sentences[index]
        context.commit('SETSENTENCE', { ctx, index })
      }
    },
    updateSentence(context, payload) {
      context.commit('UPDATESENTENCE', payload)
      if (context.state.currentSentence.index === payload.index) {
        context.commit('SETSENTENCE', payload)
      }
      chrome.storage.sync.set({ 'rubbishData': context.state.sentences })
    },
    addNewSentence(context, payload) {
      let index = context.state.sentences.length
      context.commit('UPDATESENTENCE', { ctx: payload, index })
      chrome.storage.sync.set({ 'rubbishData': context.state.sentences })
    },
    deleteSentence(context, payload) {
      context.commit('DELETESENTENCE', payload)
      chrome.storage.sync.set({ 'rubbishData': context.state.sentences }, () => {
        if (payload === context.state.currentSentence.index) {
          context.dispatch('setSentence')
        }
      })
    }
  },
  getters: {
    nightMode: (state) => { return state.nightMode },
    isShowSideBar: (state) => { return state.isShowSideBar },
    sentences: (state) => { return state.sentences },
    currentSentence: (state) => { return state.currentSentence },
  }
})
