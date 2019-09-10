<template>
    <v-form ref="form" class="slideshow-edit d-flex flex-column flex-grow-1"
                v-model="valid"
                lazy-validation>
        <div class="edit-panel d-flex flex-column flex-grow-1">
            <div class="edit-panel__settings grey lighten-2">
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
                            <v-col cols="12" md="8" class="d-flex flex-row">
                                <v-text-field label="Background image URL" v-model="imageUrl" class="flex-grow-1"/>
                                <div class="flex-grow-0 ml-4 mt-4">
                                    <MediaCenterPopup @select="setImageUrl"/>
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </EditableTitleCard>
                <v-divider />
            </div>
            <v-row class="edit-panel__slides flex-grow-1 d-flex flew-row edit-slides pl-2">
                <div class="edit-slides__edit flex-grow-1 d-flex flew-column pl-0">
                    <v-divider vertical />
                    <div v-if="currentSlideIndex > -1" class="edit-slides__form d-flex flex-column flex-grow-1">
                        <div class="d-flex flex-row pl-8 pr-4">
                            <v-row class="flex-grow-1">
                                <v-col cols="4">
                                    <v-text-field
                                        v-model="slides[currentSlideIndex].name"
                                        :rules="requiredRules"
                                        label="Enter Slide name"
                                        single-line
                                        prepend-icon="mdi-rename-box"
                                        required
                                    />
                                </v-col>
                                <v-col cols="4">
                                    <v-select
                                        v-model="slides[currentSlideIndex].animationIn"
                                        :rules="requiredRules"
                                        :items="animationsIn"
                                        single-line
                                        prepend-icon="mdi-animation"
                                        required
                                    />
                                    </v-col>
                                <v-col cols="4">
                                    <v-select
                                        v-model="slides[currentSlideIndex].animationOut"
                                        :rules="requiredRules"
                                        :items="animationsOut"
                                        single-line
                                        prepend-icon="mdi-animation-outline"
                                        required
                                    />
                                </v-col>
                            </v-row>
                            <div class="mt-8 ml-4">
                                <v-dialog v-model="helpDialog" persistent max-width="290">
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="grey"
                                            dark
                                            icon
                                            v-on="on"
                                        >
                                            <v-icon>mdi-help-box</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-card>
                                    <v-card-title class="headline">Help:</v-card-title>
                                    <v-card-text>
                                        <p>Use fragment: &lt;||&gt;</p>
                                    </v-card-text>
                                    <v-card-actions>
                                        <div class="flex-grow-1"></div>
                                        <v-btn color="primary" text @click="helpDialog = false">Close</v-btn>
                                    </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <v-dialog v-model="deleteDialog" persistent max-width="290">
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="error"
                                            dark
                                            icon
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
                            </div>
                        </div>
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
                </div>
                <v-navigation-drawer right :mini-variant="isSlidesMini" color="grey lighten-1 elevation-8" permanent>
                    <div class="edit-slides__sidebar-scroll px-0">
                        <v-list avatar dark>
                            <v-list-item-group>
                                <Draggable 
                                    :list="slides"
                                    ghost-class="is-ghost"
                                    chosen-class="is-chosen"
                                    drag-class="is-drag"
                                    class="mini-slides"
                                >
                                    <transition-group>
                                        <v-list-item
                                            active-class="accent"
                                            v-for="(slide, i) in slides" :key="`minislide_${i}`"
                                            class="mini-slides__item"
                                            @click.stop="switchToSlide(i)"
                                        >
                                            <v-list-item-avatar color="accent">
                                                <strong>#{{ i + 1 }}</strong>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title v-html="slide.name"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </transition-group>
                                </Draggable>
                            </v-list-item-group>
                        </v-list>
                    </div>
                    <template #append>
                        <v-list rounded dense dark color="grey">
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
            </v-row>
            <div class="edit-panel__toolbar">
                <v-divider />
                <v-toolbar
                    height="55px"
                    color="transparent"
                    flat
                    bottom>
                    <v-row justify="center">
                        <div class="text-center">
                            <v-btn color="primary" ripple @click.stop="save"><v-icon>mdi-content-save-outline</v-icon>Save</v-btn>
                            <!-- <v-btn color="accent" ripple @click.stop="log" class="ml-2"><v-icon>mdi-checkbox-marked-circle-outline</v-icon>Publish</v-btn> -->
                        </div>
                    </v-row>
                </v-toolbar>
            </div>
        </div>
    </v-form>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import 'highlight.js/styles/github.css';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'codemirror/lib/codemirror.css';
import hljs from 'highlight.js';
import { AuthUser } from '@/modules/auth';
import { SlideshowType, SlideshowDocument, MdSlide } from '../types';
import { Slide, Slideshow, slideshowTypes, SlideshowThemeDetials, SlideshowTypeDetials, slideshowThemes,
    createSlideshowObject, slideshowService, revealAnimationsIn, revealAnimationsOut} from '..';

import EditableTitleCard from '@/modules/admin/components/EditableTitleCard.vue';
import MediaCenterPopup from '@/modules/media/views/MediaCenterPopup.vue';
import SlideThemePreview from './SlideThemePreview.vue';
import SlideshowThemeSelect from './SlideshowThemeSelect.vue';
import SlideshowTypeSelect from './SlideshowTypeSelect.vue';
import Draggable from 'vuedraggable';

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
        MediaCenterPopup,
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
    @Getter private readonly currentSlideshow!: Slideshow<MdSlide> | null;

    private isSlidesMini = false;

    private deleteDialog = false;
    private helpDialog = false;

    private currentSlideIndex = -1;

    private valid = true;

    private type: SlideshowTypeDetials = slideshowTypes[0];
    private theme: SlideshowThemeDetials = slideshowThemes[0];
    private imageUrl = '';
    private title = '';
    private settingsOpened = false;
    private id: string | undefined = undefined;
    private slides: MdSlide[] = [];

    private animationsIn = revealAnimationsIn;
    private animationsOut = revealAnimationsOut;

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
     private onCurrentSlideshowChange(val: Slideshow<MdSlide> | null) {
         if (val) {
             this.setSlideshow(val);
         }
     }

     private setSlideshow(val: Slideshow<MdSlide>) {
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
             name: `Slide #${this.slides.length + 1}`,
             content: '',
             order: this.slides.length,
             animationIn: 'slide-in',
             animationOut: 'slide-out',
         });
         this.switchToSlide(this.slides.length - 1);
     }

     private switchToSlide(index: number) {
         this.currentSlideIndex = index;
         setTimeout(() => {
             if (document.querySelectorAll('.mini-slides__item').item(index)) {
                // document.querySelectorAll('.mini-slides__item').item(index).scrollIntoView();
            }
         }, 100);

     }

     private deleteCurrentSlide() {
         const pos = this.currentSlideIndex;
        //  if (this.slides.length === 1) {
         this.currentSlideIndex = -1;
        //  }
        //  if (this.slides.length === this.currentSlideIndex) {
        //      this.currentSlideIndex = -1;
        //  }
         this.slides.splice(pos, 1);
     }

     private setImageUrl(url: string) {
         this.imageUrl = url;
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
            bottom: 125px;
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

    .hover-show {
        overflow: hidden;
        width: 0;
        transition: all 0.1s ease-in;
        .v-btn:hover & {
            width: 100%;   
        }
    }
</style>