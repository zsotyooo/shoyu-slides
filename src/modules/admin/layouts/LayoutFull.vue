<template>
    <v-app>
        <admin-app-bar />
        <slot></slot>
    </v-app>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import AdminAppBar from '../components/AppBar.vue';

@Component({
    components: {
        AdminAppBar,
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