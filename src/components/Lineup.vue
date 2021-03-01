<script>
import {mapGetters} from 'vuex'

export default {
  name: 'LineUps',
  computed: {
    ...mapGetters(['lineUps'])
  }
}
</script>
<template>
  <v-col v-bind:class = "(lineUps.length)?'test':'test centerTextInfo'">
    <span class="main-title">Lineup</span>
    <span class='textInfo' v-if="lineUps.length==0">You haven’t selected any player for lineup yet.</span>
    <v-list two-line>
      <template v-for="(player, index) in lineUps">
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
              >{{ player.firstname }} {{ player.lastname }}</v-list-item-title
            >

            <v-list-item-subtitle class="title-2" v-if="player.position">
              {{ player.position.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action class="pick-button add-pick" v-if="player.outMinute">
            <v-icon
              small
              color="red darken-2"
            >
              mdi-arrow-down
            </v-icon>
            <span>{{player.outMinute+"'"}}</span>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
  </v-col>
</template>
