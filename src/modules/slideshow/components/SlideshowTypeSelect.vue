<template>
    <v-select
        :rules="requiredRules"
        :value="value"
        :items="typeSelectOptions"
        :hint="`${value.description}`"
        label="Slideshow Type"
        item-text="name"
        item-value="type"
        persistent-hint
        return-object
        required
        @change="updateType"
    ></v-select>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { SlideshowTypeDetials, slideshowTypes } from '..';

@Component({})
export default class SlideshowTypeSelect extends Vue {
    @Prop({
        default: slideshowTypes[0],
    }) private readonly value!: SlideshowTypeDetials;

    private requiredRules = [
      (v: string) => !!v || 'Theme is  required',
    ];

    @Emit('input')
    private updateType(v: SlideshowTypeDetials) {
        return v;
    }

    get typeSelectOptions() {
        return slideshowTypes;
    }
}
</script>