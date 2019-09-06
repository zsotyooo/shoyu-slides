<template>
    
        <v-card
            class="mx-auto"
            :img="imageUrl || ''"
            :color="theme.bgColor || '#fff'"
            height="100%"
        >
            <v-card-title :style="{color: theme.titleColor || '#000'}">
                <slot name="title">
                    I'm a title
                </slot>
            </v-card-title>
            <v-card-text :style="{color: theme.color || '#000'}">
                <slot name="content">
                    I'm a text
                </slot>
            </v-card-text>
        </v-card>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch, Prop } from 'vue-property-decorator';
import { Slide, Slideshow, slideshowTypes, SlideshowThemeDetials, SlideshowTypeDetials, slideshowThemes,
    createSlideshowObject } from '..';

@Component({})
export default class SlideThemePreview extends Vue {
    @Prop({ default: '' }) public imageUrl!: string;
    @Prop({ default: null }) public theme!: SlideshowThemeDetials;
}
</script>