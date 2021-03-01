<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Substitues',
  data () {
    return {
      substitueDialog: false,
      inPlayerId: null,
      outPlayerId: null,
      changeMinute: null
    }
  },
  methods: {
    isNumber (val) {
      if (isNaN(Number(val.key))) {
        return val.preventDefault()
      }
      if (this.changeMinute.toString().length === 3) {
        return val.preventDefault()
      }
      if (parseInt(this.changeMinute + val.key) > 120) {
        return val.preventDefault()
      }
    },
    addSubstitues () {
      if (isNaN(Number(this.changeMinute))) {
        return
      }
      if (Number(this.changeMinute) <= 0) {
        return
      }
      if (!this.outPlayerId || !this.inPlayerId) {
        return
      }
      let params = { 'inPlayer': this.inPlayerId, 'outPlayer': this.outPlayerId, 'changeMinute': this.changeMinute }
      this.$store.dispatch('addSubstitues', params)
      this.substitueDialog = false
      this.changeMinute = null
      this.inPlayerId = null
      this.outPlayerId = null
    }
  },
  computed: {
    ...mapGetters(['lineUps', 'players', 'substitues', 'currentStaff']),
    isEditPage () {
      return this.$route.name === 'team-create'
    }
  }
}
</script>
<template>
  <v-col v-bind:class = "(lineUps.length==11)?'test':'test centerTextInfo'">
     <span class="main-title">Substitutes</span>
    <span class='textInfo' v-if="lineUps.length!=11">Please pick 11 players for lineup before creating any substitutions</span>
      <v-list two-line>
      <template v-for="(player, index) in substitues">
        <v-list-item :key="index">
          <v-list-item-avatar color="grey darken-1">
            <img
              class="player-avatar"
              v-bind:src="player.image_url"
              srcset="
                ../assets/images/Avatar@2x.png 2x,
                ../assets/images/Avatar@3x.png 3x
              "
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="title"
              >{{ player.display_name }}</v-list-item-title
            >

            <v-list-item-subtitle class="title-2" v-if="player.position">
              {{ player.position.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action class="pick-button add-pick">
            <template v-if="player.inMinute">
              <v-icon
                small
                color="green darken-2"
              >
                mdi-arrow-up
              </v-icon>
              <span>{{player.inMinute+"'"}}</span>
          </template>
          <template v-if="player.outMinute">
            <v-icon
              small
              color="red darken-2"
            >
              mdi-arrow-down
            </v-icon>
                    <span>{{player.outMinute+"'"}}</span>
          </template>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
    <span class='addSubstitution' @click='substitueDialog=true' v-if="lineUps.length==11&&substitues.length!=3&&isEditPage">+ Add Substitution</span>
    <v-dialog v-model="substitueDialog" width="auto">
      <v-card>
        <v-card-title class="headline dialog-title" style="text-align: center">
          Add Substition
        </v-card-title>
        <div class="form-group mr-5 ml-5 combobox-area">
          <div class="combobox-label">OUT PLAYER</div>
          <select
            class="substitues-combobox"
            v-model="outPlayerId"
          >
            <option value="" disabled selected hidden>Enter Player Name</option>
            <template v-for="(player, index) in currentStaff">
              <option
                v-bind:key="index"
                v-bind:value="player.id"
              >
                {{ player.display_name }}
              </option>
            </template>
          </select>
        </div>
        <div class="form-group mr-5 ml-5 combobox-area">
          <div class="combobox-label">IN PLAYER</div>
          <select
            class="substitues-combobox"
            v-model="inPlayerId"
          >
          <option disabled selected>Enter Player Name</option>
          <template v-for="(player, index) in players">
            <option
              v-if="!player.isLineUp&&!player.isSubstitues"
              v-bind:key="index"
              v-bind:value="player.id"
            >
              {{ player.display_name }}
            </option>
          </template>
          </select>
        </div>
        <div class="form-group mr-5 ml-5 combobox-area">
          <div class="combobox-label">SUBSTITUTION MINUTE</div>
          <div>
            <input type='text' @keypress="isNumber" v-model="changeMinute" class="form-input"/>
         </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div
            class="dialog-cancel"
            @click="substitueDialog=false"
          >
            Cancel
          </div>
          <div class="dialog-confirm" @click="addSubstitues()">
           <span class="dialog-confirm-text">Add</span>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-col>
</template>
