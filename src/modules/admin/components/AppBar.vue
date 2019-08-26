<template>
  <v-app-bar id="core-app-bar" absolute app color="transparent" flat height="88">
    <v-toolbar-title class="tertiary--text font-weight-light align-self-center">
      <v-btn v-if="isResponsive" dark icon @click.stop="toggleDrawerAction">
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
import { namespace } from 'vuex-class';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import CurrentUser from '../../user/components/CurrentUser.vue';

const { Action, Getter } = namespace('admin');

@Component({
    components: {
        CurrentUser,
    },
})
export default class AppBar extends Vue {
    @Action private setIsResponsiveAction: (isResponsive: boolean) => void;
    @Action private toggleDrawerAction: () => void;
    @Getter private isResponsive!: boolean;

    public mounted() {
        this.onResponsiveInverted();
        window.addEventListener('resize', this.onResponsiveInverted);
    }

    public beforeDestroy() {
        window.removeEventListener('resize', this.onResponsiveInverted);
    }

    private onResponsiveInverted() {
        if (window.innerWidth < 991) {
            this.setIsResponsiveAction(true);
            this.setIsResponsiveAction(true);
        } else {
            this.setIsResponsiveAction(false);
            this.setIsResponsiveAction(false);
        }
    }
}
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