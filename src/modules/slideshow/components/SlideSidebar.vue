<template>
    <v-navigation-drawer
        class="slides-sidebar"
        right
        :mini-variant="isSlidesMini"
        color="info elevation-4"
        permanent
        style="min-width: 80px"
    >
        <div class="slides-sidebar__scroll px-0">
            <v-list avatar dark rounded>
                <v-list-item-group :value="currentSlideIndex" mandatory>
                    <Draggable 
                        :list="slides"
                        ghost-class="is-ghost"
                        chosen-class="is-chosen"
                        drag-class="is-drag"
                        class="mini-slides"
                    >
                        <transition-group>
                            <v-list-item
                                active-class="warning"
                                v-for="(slide, i) in slides" :key="`minislide_${i}`"
                                class="mini-slides__item"
                                @click.stop="switchToSlide(i)"
                                :value="i"
                            >
                                <v-list-item-avatar color="white info--text">
                                    <strong>{{ i + 1 }}</strong>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-html="slide.name"></v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-icon>
                                    <v-icon>mdi-drag</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                        </transition-group>
                    </Draggable>
                </v-list-item-group>
            </v-list>
        </div>
        <template #append>
            <v-list rounded dense dark color="info darken-2">
                <v-list-item @click.stop="addNewSlide">
                    <v-list-item-action>
                        <v-icon>mdi-plus</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>add slide</v-list-item-title>
                </v-list-item>
            
                <v-list-item @click="isSlidesMini = !isSlidesMini">
                    <v-list-item-action>
                        <v-icon>{{ isSlidesMini ? 'mdi-backburger' : 'mdi-forwardburger' }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>collapse slides</v-list-item-title>
                </v-list-item>
            </v-list>
        </template>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch, Prop, Emit } from 'vue-property-decorator';
import { MdSlide } from '..';
import Draggable from 'vuedraggable';

@Component({
    components: {
        Draggable,
    },
})
export default class SlideSidebar extends Vue {
    @Prop({
        default: [],
    }) private readonly value!: MdSlide[];

    private isSlidesMini = false;
    private currentSlideIndex = -1;
    private slides: MdSlide[] = [];

    private requiredRules = [
      (v: string) => !!v || 'Field is required',
    ];

    public mounted() {
        this.onValueChange(this.value);
    }

    @Emit('input')
    public addNewSlide() {
        this.slides.push({
            name: `Slide #${this.slides.length + 1}`,
            content: '',
            order: this.slides.length,
            animationIn: 'slide-in',
            animationOut: 'slide-out',
        });
        this.switchToSlide(this.slides.length - 1);
        return this.slides;
    }

    @Emit('switched')
    public switchToSlide(index: number) {
        this.currentSlideIndex = index;
        return this.currentSlideIndex;
    }

    @Emit('input')
    public deleteCurrentSlide() {
        const pos = this.currentSlideIndex;
        this.switchToSlide(pos - 1);
        this.slides.splice(pos, 1);
        return this.slides;
    }

    @Watch('value')
    private onValueChange(v: MdSlide[]) {
        this.slides = v;
    }
}
</script>

<style lang="scss">
    .slides-sidebar {
        &__scroll {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 116px;
            left: 0;
            overflow: scroll;
        }
    }

    .mini-slides {
        &__item {
            border: 1px solid #fff;
            margin-right: 8px;
            &.is-ghost {
                border: 1px dotted #fff;
                opacity: 0.2;
            }
        }
    }
</style>