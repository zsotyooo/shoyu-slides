<template>
    <v-form ref="form" class="slideshow-edit d-flex flex-column flex-grow-1"
                v-model="valid"
                lazy-validation>
        <div class="edit-panel d-flex flex-column flex-grow-1">
            <div class="edit-panel__settings">
                <EditableTitleCard
                    v-model="title"
                    label="Enter slideshow title"
                    requiredText="Slideshow title is required"
                >
                    <v-col cols="12" sm="4">
                        <SlideThemePreview
                            :image-url="imageUrl"
                            :theme="theme"
                        />
                    </v-col>
                    <v-col cols="12" sm="8">
                        <v-row>
                            <v-col cols="12">
                                <SlideshowTypeSelect
                                    v-model="type"
                                />
                            </v-col>
                            <v-divider />
                            <v-col cols="12" md="4">
                                <SlideshowThemeSelect
                                    v-model="theme"
                                />
                            </v-col>
                            <v-col cols="12" md="8">
                                <v-text-field label="Background image URL" v-model="imageUrl"/>
                            </v-col>
                        </v-row>
                    </v-col>
                </EditableTitleCard>
                <v-divider />
            </div>
            <v-row class="edit-panel__slides flex-grow-1 d-flex flew-row edit-slides pl-2">
                <v-col class="edit-slides__sidebar px-0" cols="3">
                    <div class="edit-slides__sidebar-scroll px-0 white">
                        <v-list rounded avatar>
                            <v-list-item-group color="secondary">
                                <Draggable 
                                    :list="slides"
                                    ghost-class="is-ghost"
                                    chosen-class="is-chosen"
                                    drag-class="is-drag"
                                    class="mini-slides"
                                >
                                    <transition-group>
                                        <v-list-item
                                            v-for="(slide, i) in slides" :key="`minislide_${i}`"
                                            class="mini-slides__item"
                                            @click.stop="switchToSlide(i)"
                                        >
                                            <v-list-item-avatar color="accent white--text">
                                                <strong>#{{ i }}</strong>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title v-html="slide.name"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </transition-group>
                                </Draggable>
                                <v-divider />
                                <v-btn
                                    color="primary"
                                    dark
                                    small
                                    absolute
                                    bottom
                                    left
                                    fab
                                    @click.stop="addNewSlide"
                                >
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </v-list-item-group>
                        </v-list>
                    </div>
                </v-col>
                
                <v-col class="edit-slides__edit flex-grow-1 d-flex flew-column pl-0" cols="9">
                    <v-divider vertical />
                    <div v-if="currentSlideIndex > -1" class="edit-slides__form d-flex flex-column flex-grow-1">
                        <EditableTitleCard
                            v-model="slides[currentSlideIndex].name"
                            label="Enter Slide name"
                            requiredText="Slide name is required"
                            :isCloseable="false"
                            :open="true"
                            size="medium"
                        >
                            <v-dialog v-model="deleteDialog" persistent max-width="290">
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        color="error"
                                        dark
                                        small
                                        absolute
                                        top
                                        right
                                        fab
                                        v-on="on"
                                    >
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </template>
                                <v-card>
                                <v-card-title class="headline">Delete slide</v-card-title>
                                <v-card-text>Do you really want to delete "{{slides[currentSlideIndex].name}}"?</v-card-text>
                                <v-card-actions>
                                    <div class="flex-grow-1"></div>
                                    <v-btn color="primary" text @click="deleteDialog = false">Cancel</v-btn>
                                    <v-btn color="error" text @click="deleteDialog = false; deleteCurrentSlide()">DELETE</v-btn>
                                </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </EditableTitleCard>
                        <Editor
                            ref="editor"
                            previewStyle="vertical"
                            height="100%"
                            :options="{
                                previewStyle: 'vertical',
                                initialEditType: 'markdown',
                            }"
                            v-model="slides[currentSlideIndex].content"
                        />
                    </div>
                </v-col>
            </v-row>
            <div class="edit-panel__toolbar">
                <v-divider />
                <v-toolbar
                    height="55px"
                    color="transparent"
                    flat
                    bottom>
                    <v-row justify="center">
                        <v-col cols="12" class="text-center">
                            <v-btn color="primary" ripple @click.stop="save"><v-icon>mdi-content-save-outline</v-icon>Save</v-btn>
                            <!-- <v-btn color="accent" ripple @click.stop="log" class="ml-2"><v-icon>mdi-checkbox-marked-circle-outline</v-icon>Publish</v-btn> -->
                        </v-col>
                    </v-row>
                </v-toolbar>
            </div>
        </div>
    </v-form>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Slide, Slideshow, slideshowTypes, SlideshowThemeDetials, SlideshowTypeDetials, slideshowThemes,
    createSlideshowObject,
    slideshowService} from '..';
import { AuthUser } from '../../auth';
import { SlideshowType, SlideshowDocument } from '../types';
import EditableTitleCard from '@/modules/admin/components/EditableTitleCard.vue';
import SlideThemePreview from './SlideThemePreview.vue';
import SlideshowThemeSelect from './SlideshowThemeSelect.vue';
import SlideshowTypeSelect from './SlideshowTypeSelect.vue';
import Draggable from 'vuedraggable';
import 'highlight.js/styles/github.css';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'codemirror/lib/codemirror.css';
import hljs from 'highlight.js';
import { Editor } from '@toast-ui/vue-editor';

const authNs = namespace('auth');
const { Action, Getter} = namespace('slideshow');

@Component({
    components: {
        EditableTitleCard,
        SlideThemePreview,
        SlideshowTypeSelect,
        SlideshowThemeSelect,
        Draggable,
        Editor,
    },
})
export default class SlideshowForm extends Vue {

    get typeSelectOptions() {
        return slideshowTypes;
    }

    get themeSelectOptions() {
        return slideshowThemes;
    }

    @Action public addSlideshowAction!: (payload: Slideshow) => void;
    @Action public updateSlideshowAction!: (payload: SlideshowDocument) => void;
    @Ref() private readonly form!: Vue & { validate: () => boolean, reset: () => void };

    @authNs.Getter private readonly authUser!: AuthUser;
    @Getter private readonly currentSlideshow!: Slideshow | null;

    private unSavedSlideshow: Slideshow = {
        title: '',
        type: slideshowTypes[0].type,
        theme: slideshowThemes[0].theme,
        imageUrl: '',
        uid: '',
        isPublished: false,
        slides: [],
        createdAt: null,
        updatedAt: null,
    };

    private deleteDialog = false;

    private currentSlideIndex = -1;

    private valid = true;

    private type: SlideshowTypeDetials = slideshowTypes[0];
    private theme: SlideshowThemeDetials = slideshowThemes[0];
    private imageUrl = '';
    private title = '';
    private settingsOpened = false;
    private id: string | undefined = undefined;
    private slides: Slide[] = [
        // {
        //     name: 'Slide #1',
        //     content: '',
        //     order: 0,
        // },
        // {
        //     name: 'Slide #2',
        //     content: '',
        //     order: 0,
        // },
        // {
        //     name: 'Slide #3',
        //     content: '',
        //     order: 0,
        // },
        // {
        //     name: 'Slide #4',
        //     content: '',
        //     order: 0,
        // },
        // {
        //     name: 'Slide #5',
        //     content: '',
        //     order: 0,
        // },
        // {
        //     name: 'Slide #6',
        //     content: '',
        //     order: 0,
        // },
        // {
        //     name: 'Slide #7',
        //     content: '',
        //     order: 0,
        // },
        // {
        //     name: 'Slide #8',
        //     content: '',
        //     order: 0,
        // },
        // {
        //     name: 'Slide #9',
        //     content: '',
        //     order: 0,
        // },
        // {
        //     name: 'Slide #10',
        //     content: '',
        //     order: 0,
        // },
        // {
        //     name: 'Slide #11',
        //     content: '',
        //     order: 0,
        // },
        // {
        //     name: 'Slide #12',
        //     content: '',
        //     order: 0,
        // },
    ];

    private requiredRules = [
      (v: string) => !!v || 'Field is  required',
    ];

     public mounted() {
         if (this.currentSlideshow) {
             this.setSlideshow(this.currentSlideshow);
         }
     }

    private save() {
        this.doSave(false);
    }

    private publish() {
        this.doSave(true);
    }

     private async doSave(publish: boolean) {
         if (this.form.validate()) {
            const payload = createSlideshowObject({
                title: this.title,
                type: this.type.type,
                theme: this.theme.theme,
                imageUrl: this.imageUrl,
                isPublished: publish,
                uid: this.authUser.uid,
                slides: this.slides.map((s: Slide, i) => ({ ...s, order: i })),
            });
            if (this.id) {
                payload.id = this.id;
                await this.updateSlideshowAction({ id: this.id, data: payload });
            } else {
                await this.addSlideshowAction(payload);
            }

            if (this.$router.currentRoute.path.indexOf('/new') > -1 && this.currentSlideshow) {
                this.$router.push(`/admin/slideshows/${this.currentSlideshow.id}/edit`);
            }
        }
     }

     @Watch('currentSlideshow')
     private onCurrentSlideshowChange(val: Slideshow | null) {
         if (val) {
             this.setSlideshow(val);
         }
     }

     private setSlideshow(val: Slideshow) {
         const slideshow = { ...val };
         this.title = slideshow.title;
         this.type = this.typeSelectOptions.find((t) => t.type === slideshow.type) as SlideshowTypeDetials;
         this.theme = this.themeSelectOptions.find((t) => t.theme === slideshow.theme) as SlideshowThemeDetials;
         this.imageUrl = slideshow.imageUrl;
         this.slides = slideshow.slides;
         if (this.slides.length === 0) {
             this.addNewSlide();
         } else {
             this.switchToSlide(this.slides.length - 1);
         }
         this.id = slideshow.id || undefined;
     }

     private addNewSlide() {
         this.slides.push({
             name: `Slide #${this.slides.length}`,
             content: '',
             order: this.slides.length,
         });
         this.switchToSlide(this.slides.length - 1);
     }

     private switchToSlide(index: number) {
         this.currentSlideIndex = index;
     }

     private deleteCurrentSlide() {
         this.slides.splice(this.currentSlideIndex, 1);
     }
}
</script>

<style lang="scss">
    
    .edit-panel {
        height: calc(100vh - 88px);
    }

    .edit-slides {
        &__sidebar {
            position: relative;
        }

        &__sidebar-scroll {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            overflow: scroll;
        }
    }

    .mini-slides {
        &__item {
            &.is-ghost {
                opacity: 0.2;
            }
        }
    }
</style>