<template>
  <v-card :style="styles" v-bind="$attrs" v-on="$listeners" class="elevation-2">
    <!-- <admin-helper-offset v-if="hasOffset" :inline="inline" :full-width="fullWidth" :offset="offset">
      <v-card
        v-if="!$slots.offset"
        :color="color"
        :elevation="elevation"
        class="v-card--material__header d-flex align-center"
        dark
        min-height="80"
      > -->
        <slot v-if="!title && !text" name="header" />
        <v-list-item two-line class="py-4" v-else>
          <v-list-item-content>
            <v-list-item-title class="headline font-weight-light">{{ title }}</v-list-item-title>
            <v-list-item-subtitle>{{ text }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      <!-- </v-card>

      <slot v-else name="offset" />
    </admin-helper-offset> -->

    <v-card-text>
      <slot />
    </v-card-text>

    <v-divider v-if="$slots.actions" class="mx-3" />

    <v-card-actions v-if="$slots.actions" class="py-6">
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