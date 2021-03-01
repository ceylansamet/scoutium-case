<script>
import Lineup from '../Lineup'
import Substitues from '../Substitues'
import {mapGetters} from 'vuex'

export default {
  components: { Lineup, Substitues },
  name: 'TeamView',
  computed: {
    ...mapGetters(['lineUps'])
  },
  created () {
    if (this.lineUps.length !== 11) {
      this.$router.push('team-create')
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
                 <v-container class="info-area">
                <v-avatar
              color="grey darken-1"
              size="32"
            >
            <img
              v-bind:src="require('../../assets/images/success.png')"
              srcset="../../assets/images/success@2x.png 2x, ../../assets/images/success@3x.png 3x"
                        />
            </v-avatar>
            <span class="info-title">Squad saved successfully</span>
              </v-container>
                <v-row :align="end">
                    <v-col class="test centerTextInfo view-club-icon-area">
                       <div class="view-club-icon">
                        <v-avatar
                        color="grey darken-1"
                        size="80"
                        >
                        <img
                        v-bind:src="require('../../assets/images/userpic_club_big.png')"
                        srcset="../../assets/images/userpic_club_big@2x.png 2x, ../../assets/images/userpic_club_big@3x.png 3x"
                                    />
                        </v-avatar>
                        <div><span>Beşiktaş JK</span></div>
                        </div>
                    </v-col>
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
