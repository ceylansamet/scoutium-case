import Vue from 'vue'
import Vuex from 'vuex'
import ApiService from '@/core/api.service'

Vue.use(Vuex)

const state = {
  players: [],
  lineUps: [],
  substitues: [],
  currentStaff: []
}
const getters = {
  players: state => state.players,
  lineUps: state => state.lineUps,
  substitues: state => state.substitues,
  currentStaff: state => state.currentStaff
}

const mutations = {
  SET_PLAYERS (state, data) {
    data.sort((a, b) => {
      a.position = a.position ? a.position : {}
      b.position = b.position ? b.position : {}
      return a.position.id - b.position.id
    })
    state.players = data
  },
  ADD_LINE_UP (state, payload) {
    if (state.lineUps.length === 11) {
      return
    }
    let dropPlayerIndex = state.players.map(item => item.id).indexOf(payload.id)
    payload.isLineUp = true
    state.players.splice(dropPlayerIndex, 1, payload)
    state.lineUps.push(payload)
    state.currentStaff.push(payload)
  },
  DROP_LINE_UP (state, payload) {
    let dropLineUpIndex = state.lineUps.map(item => item.id).indexOf(payload.id)
    let unpickPlayerIndex = state.players.map(item => item.id).indexOf(payload.id)
    let currentStaffIndex = state.currentStaff.map(item => item.id).indexOf(payload.id)
    payload.isLineUp = false
    state.players.splice(unpickPlayerIndex, 1, payload)
    state.lineUps.splice(dropLineUpIndex, 1)
    state.currentStaff.splice(currentStaffIndex, 1)
  },
  ADD_SUBSTITUES (state, payload) {
    let outPlayerIndex = state.lineUps.map(item => item.id).indexOf(payload.outPlayer)
    let inPlayerIndex = state.players.map(item => item.id).indexOf(payload.inPlayer)
    let currentStaffIndex = state.currentStaff.map(item => item.id).indexOf(payload.outPlayer)
    let inPlayer = state.players[inPlayerIndex]
    inPlayer.isSubstitues = true
    inPlayer.inMinute = payload.changeMinute
    state.players.splice(inPlayerIndex, 1, inPlayer)
    state.currentStaff.splice(currentStaffIndex, 1)
    state.currentStaff.push(inPlayer)
    state.substitues.push(inPlayer)
    if (outPlayerIndex === -1) {
      state.currentStaff.splice(currentStaffIndex, 1)
      let substituesIndex = state.substitues.map(item => item.id).indexOf(payload.outPlayer)
      let outPlayer = state.substitues[substituesIndex]
      outPlayer.outMinute = payload.changeMinute
      state.substitues.splice(substituesIndex, 1, outPlayer)
    } else {
      let outPlayer = state.lineUps[outPlayerIndex]
      outPlayer.outMinute = payload.changeMinute
      state.lineUps.splice(outPlayerIndex, 1, outPlayer)
    }
  }
}

const actions = {
  getPlayers ({ commit }) {
    ApiService.get('/clubs/4029/players?count=100').then(response => {
      commit('SET_PLAYERS', response.data.players)
    })
  },
  addLineUp ({ commit }, payload) {
    commit('ADD_LINE_UP', payload)
  },
  dropLineUp ({ commit }, payload) {
    commit('DROP_LINE_UP', payload)
  },
  addSubstitues ({ commit }, payload) {
    commit('ADD_SUBSTITUES', payload)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
