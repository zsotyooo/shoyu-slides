<template>
    <v-select
        :rules="requiredRules"
        :value="value"
        :items="themeSelectOptions"
        label="Theme"
        item-text="name"
        item-value="theme"
        persistent-hint
        return-object
        required
        @change="updateTheme"
    ></v-select>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { SlideshowThemeDetials, slideshowThemes } from '..';

@Component({})
export default class SlideshowThemeSelect extends Vue {
    @Prop({
        default: slideshowThemes[0],
    }) private readonly value!: SlideshowThemeDetials;

    private requiredRules = [
      (v: string) => !!v || 'Theme is  required',
    ];

    @Emit('input')
    private updateTheme(v: SlideshowThemeDetials) {
        return v;
    }

    get themeSelectOptions() {
        return slideshowThemes;
    }
}
</script>