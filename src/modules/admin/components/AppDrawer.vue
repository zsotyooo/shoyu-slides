<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="drawerValue"
    app
    color="primary darken-1"
    dark
    floating
    mobile-break-point="991"
    persistent
    width="260"
    class="elevation-12"
  >
    <!-- <template #img="attrs">
      <v-img
        v-bind="attrs"
        gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
      />
    </template> -->

    <v-list-item two-line>
      <v-list-item-avatar height="58" min-width="58" color="white" class="elevation-3">
        <v-img
            src="../../../assets/logo--color.svg"
            contain
        />
      </v-list-item-avatar>

      <v-list-item-title class="title white--text">
        <h1 class="white--text display-1 font-weight-light">ShoYu</h1>
      </v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <v-list nav>
        <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
        <div />

        <v-list-item
            v-for="(link, i) in topMenu"
            :key="i"
            :to="link.to"
            active-class="accent white--text"
        >
            <v-list-item-action>
                <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-title v-text="link.text" />
        </v-list-item>
    </v-list>

    <template #append>
      <v-list nav>
        <v-divider />
        <v-list-item
            v-for="(link, i) in bottomMenu"
            :key="i"
            :to="link.to"
            active-class="accent white--text"
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-title v-text="link.text" class="font-weight-light" />
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { namespace } from 'vuex-class';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import CurrentUser from '@/modules/user/components/CurrentUser.vue';
import { MenuItem } from '..';

const { Action, Getter } = namespace('admin');

@Component({
    components: {
        CurrentUser,
    },
})
export default class AppDrawer extends Vue {
    @Action private setIsDrawerOpenAction: (isDrawerOpen: boolean) => void;
    @Getter private isDrawerOpen!: boolean;
    @Getter private menu!: MenuItem[];

    set drawerValue(val: boolean) {
        this.setIsDrawerOpenAction(val);
    }

    get drawerValue() {
        return this.isDrawerOpen;
    }

    get topMenu() {
        return this.menu.filter((m) => m.slot === 'top');
    }

    get bottomMenu() {
        return this.menu.filter((m) => m.slot === 'bottom');
    }
}
</script>

<style scoped>
 h1 {
     text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.14), 0px 0px 18px rgba(0, 0, 0, 0.12);
 }
</style>