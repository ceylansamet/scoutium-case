<script>
export default {
  name: 'Header',
  data () {
    return {}
  }
}
</script>

<template>
     <v-app-bar
      app
      class="header"
      flat
    >
      <v-container class="py-0 fill-height header-container">
        <v-row>
          <img
            v-bind:src="require('../../assets/images/Logo.png')"
            class="logo"
            srcset="../../assets/images/Logo@2x.png 2x, ../../assets/images/Logo@3x.png 3x"
            />
            <v-avatar
              class="mr-10"
              color="grey darken-1"
              size="32"
            >
            <img
              v-bind:src="require('../../assets/images/Avatar.png')"
              srcset="../../assets/images/Avatar@2x.png 2x, ../../assets/images/Avatar@3x.png 3x"
                        />
            </v-avatar>
        </v-row>
      </v-container>
    </v-app-bar>
</template>
