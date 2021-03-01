<script>
import {mapGetters} from 'vuex'

export default {
  name: 'AllPlayers',
  created () {
    this.$store.dispatch('getPlayers')
  },
  methods: {
    addLineUp (player) {
      this.$store.dispatch('addLineUp', player)
    },
    dropLineUp (player) {
      if (this.substitues.length !== 0) {
        return
      }
      this.$store.dispatch('dropLineUp', player)
    }
  },
  computed: {
    ...mapGetters(['players', 'substitues'])
  }
}
</script>

<template>
  <v-col class="test">
    <span class="main-title">All Players</span>
    <v-list two-line>
      <template v-for="(player, index) in players">
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
          <v-list-item-action class="pick-button add-pick" v-if="!player.isLineUp">
            <span @click='addLineUp(player)'>PICK</span>
          </v-list-item-action>
           <v-list-item-action class="pick-button drop-pick" v-if="player.isLineUp">
            <span @click='dropLineUp(player)'>UNPICK</span>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
  </v-col>
</template>
