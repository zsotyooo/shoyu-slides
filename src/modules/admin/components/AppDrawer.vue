<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="drawerValue"
    app
    color="primary darken-3"
    dark
    floating
    mobile-break-point="991"
    persistent
    width="260"
    class="elevation-6"
  >
    <!-- <template #img="attrs">
      <v-img
        v-bind="attrs"
        gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
      />
    </template> -->

    <v-list-item two-line class="primary darken-2">
      <v-list-item-avatar tile>
        <v-img
            src="../../../assets/logo--white.svg"
            contain
        />
      </v-list-item-avatar>

      <v-list-item-title class="title white--text">
        ShoYu
      </v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <template #append>
      <v-list nav>
        <v-list-item
          disabled
          to="/upgrade"
        >
          <v-list-item-action>
            <v-icon>mdi-package-up</v-icon>
          </v-list-item-action>

          <v-list-item-title class="font-weight-light">
            Upgrade To PRO
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
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
export default class AppDrawer extends Vue {
    @Action private setIsDrawerOpenAction: (isDrawerOpen: boolean) => void;
    // @Action private toggleDrawerAction: () => void;
    @Getter private isDrawerOpen!: boolean;

    set drawerValue(val: boolean) {
        this.setIsDrawerOpenAction(val);
    }

    get drawerValue() {
        return this.isDrawerOpen;
    }
}
</script>
