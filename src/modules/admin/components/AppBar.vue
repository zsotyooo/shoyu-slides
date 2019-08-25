<template>
  <v-app-bar id="core-app-bar" absolute app color="transparent" flat height="88">
    <v-toolbar-title class="tertiary--text font-weight-light align-self-center">
      <v-btn dark icon @click.stop="onClick">
        <v-icon>mdi-view-list</v-icon>
      </v-btn>Shoyu slides
    </v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <v-row align="center" class="mx-0">
        <v-btn icon to="/">
          <v-icon color="tertiary">mdi-view-dashboard</v-icon>
        </v-btn>
      </v-row>
	  <v-row align="center" class="mx-0">
        <current-user />
      </v-row>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import CurrentUser from '../../user/components/CurrentUser.vue';
// import AdminAppBar from '../components/AppBar.vue';

@Component({
  components: {
    CurrentUser,
  },
})
export default class AppBar extends Vue {}
</script>

<style>
/* Fix coming in v2.0.8 */
#core-app-bar {
  width: auto;
}

#core-app-bar a {
  text-decoration: none;
}
</style>