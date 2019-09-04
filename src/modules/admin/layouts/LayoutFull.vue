<template>
    <admin-layout-empty class="layout">
        <admin-app-bar class="layout__appbar" />
        <admin-app-drawer  class="layout__drawer" />
        <v-content class="grey lighten-3 layout__content">
            <div class="flex-grow-1 d-flex flex-column">
                
                <v-fade-transition mode="out-in">
                    <div class="layout__slot flex-grow-1  d-flex flex-column">    
                        <slot></slot>
                    </div>
                </v-fade-transition>
            </div>
        </v-content>
        <slot name="outside"></slot>
    </admin-layout-empty>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import AdminAppBar from '../components/AppBar.vue';
import AdminAppDrawer from '../components/AppDrawer.vue';

@Component({
    components: {
        AdminAppBar,
        AdminAppDrawer,
    },
})
export default class LayoutFull extends Vue {
    public created() {
        this.$vuetify.theme.dark = false;
    }
}
</script>

<style lang="scss">
    .layout {
        &__content {
            .v-content__wrap {
                display: flex;
                flex-direction: column;
            }
        }
    }
</style>