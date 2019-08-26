<template>
    <v-app>
        <admin-app-bar />
        <admin-app-drawer />
        <slot></slot>
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
    // @Prop({ default: false }) public heading: boolean = false;
    // @Prop() public headingText!: string;
    // @Prop() public submitText!: string;
    // @Prop({ default: true }) public valid!: boolean;

    // @Emit()
    // public submit() {
    //     return;
    // }
}
</script>