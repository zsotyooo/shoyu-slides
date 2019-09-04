<template>
    
        <v-card
            class="mx-auto"
            :img="imageUrl || ''"
            :dark="theme.theme == 'dark'"
            height="100%"
        >
            <v-card-title>
                <slot name="title">
                    I'm a title
                </slot>
            </v-card-title>
            <v-card-text>
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