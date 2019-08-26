<template>
  <v-card :style="styles" v-bind="$attrs" v-on="$listeners">
    <admin-helper-offset v-if="hasOffset" :inline="inline" :full-width="fullWidth" :offset="offset">
      <v-card
        v-if="!$slots.offset"
        :color="color"
        :elevation="elevation"
        class="v-card--material__header d-flex align-center"
        dark
        min-height="80"
      >
        <slot v-if="!title && !text" name="header" />
        <div v-else class="px-3">
          <h4 class="title font-weight-light mb-2" v-text="title" />
          <p class="category font-weight-thin mb-0" v-text="text" />
        </div>
      </v-card>

      <slot v-else name="offset" />
    </admin-helper-offset>

    <v-card-text>
      <slot />
    </v-card-text>

    <v-divider v-if="$slots.actions" class="mx-3" />

    <v-card-actions v-if="$slots.actions">
      <div class="flex-grow-1" />
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class Card extends Vue {
    @Prop({ default: 'secondary' }) private readonly color!: string;
    @Prop({ default: 24 }) private readonly offset!: number;
    @Prop({ default: 10 }) private readonly elevation!: number;
    @Prop({ default: false }) private readonly inline!: boolean;
    @Prop({ default: false }) private readonly fullWidth!: boolean;
    @Prop({ default: '' }) private readonly title!: string;
    @Prop({ default: '' }) private readonly text!: string;

    get hasOffset() {
        return this.$slots.header || this.$slots.offset || this.title || this.text;
    }

    get styles() {
        if (!this.hasOffset) {
            return null;
        }

        return {
            marginBottom: `${this.offset}px`,
            marginTop: `${this.offset * 2}px`,
        };
    }
}
</script>