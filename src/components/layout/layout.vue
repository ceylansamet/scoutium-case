<script>
import Header from '@/components/layout/header'
import {mapGetters} from 'vuex'

export default {
  components: { Header },
  name: 'Layout',
  computed: {
    ...mapGetters(['players'])
  }
}
</script>

<template>
    <v-app id="inspire">
       <Header></Header>
       <router-view/>
  </v-app>
</template>
