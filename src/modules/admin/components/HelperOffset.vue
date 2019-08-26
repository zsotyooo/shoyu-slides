<template>
    <div
        :style="styles"
        :class="classes"
        class="v-offset"
    >
        <slot />
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class HelperOffset extends Vue {
    @Prop({ default: 0 }) private readonly offset!: number;
    @Prop({ default: false }) private readonly fullWidth!: boolean;

    get classes() {
        return {
            'v-offset--full-width': this.fullWidth,
        };
    }

    get styles() {
        return {
            top: `-${this.offset}px`,
            marginBottom: `-${this.offset}px`,
        };
    }
}
</script>

<style>
.v-offset {
  margin: 0 auto;
  max-width: calc(100% - 32px);
  position: relative;
  z-index: 1;
}
.v-offset--full-width {
  max-width: 100%;
}
</style>