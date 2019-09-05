<template>
    <v-navigation-drawer
        id="app-drawer"
        v-model="drawerValue"
        app
        color="primary"
        dark
        floating
        mobile-break-point="991"        
        width="260"
        disable-route-watcher
        class="elevation-12"
        :mini-variant="isDrawerMini"
        >
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
        <v-divider class="mx-3 mb-3 mt-3" />
        
        <v-list rounded>
            <v-list-item active-class="primary lighten-1 white--text" @click="toggleDrawerMiniAction">
                <v-list-item-action>
                    <v-icon>{{ isDrawerMini ? 'mdi-forwardburger' : 'mdi-backburger' }}</v-icon>
                </v-list-item-action>
                <v-list-item-title>collapse menu</v-list-item-title>
            </v-list-item>
        </v-list>
        <v-divider class="mx-3 mb-3 mt-3" />
        <current-user />
        <v-divider class="mx-3 mb-3 mt-3" />
        <v-list nav>
            <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
            <v-list-item-group>
                <v-list-item
                    v-for="(link, i) in topMenu"
                    :key="i"
                    :to="link.to"
                    active-class="primary lighten-1 white--text"
                >
                    <v-list-item-action>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-action>

                    <v-list-item-title v-text="link.text" />
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <template #append>
            <v-list nav>
                <v-divider class="mx-2 mb-3 mt-3" />
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
    @Action private toggleDrawerMiniAction: () => void;
    @Getter private isDrawerOpen!: boolean;
    @Getter private isDrawerMini!: boolean;
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
 .theme--dark.v-sheet {
     background-color: transparent;
 }
</style>