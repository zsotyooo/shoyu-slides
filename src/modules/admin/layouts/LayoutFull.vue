<template>
    <v-app>
        <admin-app-bar />
        <admin-app-drawer />
        <v-content class="grey lighten-3">
            <v-divider />
            <div id="core-view" class="pl-4 pr-4">
                <v-fade-transition mode="out-in">
                    <slot></slot>
                </v-fade-transition>
            </div>
        </v-content>
        <slot name="outside"></slot>
    </v-app>
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