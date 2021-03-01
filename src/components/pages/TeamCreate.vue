<script>
import AllPlayers from '../AllPlayers'
import Lineup from '../Lineup'
import Substitues from '../Substitues'
import {mapGetters} from 'vuex'

export default {
  components: { AllPlayers, Lineup, Substitues },
  name: 'TeamCreate',
  computed: {
    ...mapGetters(['lineUps'])
  },
  methods: {
    routeViewPage () {
      this.$router.push('team-view')
    }
  }
}
</script>

<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col>
          <v-sheet min-height="70vh" rounded="lg">
            <v-container>
              <v-container>
                <v-avatar
              class="mr-10"
              color="grey darken-1"
              size="32"
            >
            <img
              v-bind:src="require('../../assets/images/userpic_club.png')"
              srcset="../../assets/images/userpic_club@2x.png 2x, ../../assets/images/userpic_club@3x.png 3x"
                        />
            </v-avatar>
            <span>Beşiktaş JK</span>
            <button @click="routeViewPage()" class="confirm-button" :disabled="lineUps.length!==11">Confirm</button>
              </v-container>
              <v-row :align="end">
                <AllPlayers></AllPlayers>
                <Lineup></Lineup>
                <Substitues></Substitues>
              </v-row>
            </v-container>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
