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
                                    <MediaCenterPopup @select="setImageUrl" buttonColor="secondary" />
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </EditableTitleCard>
                <v-divider />
            </div>
            <div class="edit-panel__slides flex-grow-1 d-flex flew-row edit-slides pl-2">
                <div class="edit-slides__edit flex-grow-1 d-flex flew-column pl-0">
                    <v-divider vertical />
                    <div v-if="currentSlideIndex > -1" class="edit-slides__form d-flex flex-column flex-grow-1">
                        <div class="d-flex flex-row pl-8 pr-4">
                            <v-row class="flex-grow-1">
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model="slides[currentSlideIndex].name"
                                        :rules="requiredRules"
                                        label="Enter Slide name"
                                        single-line
                                        prepend-icon="mdi-rename-box"
                                        required
                                    />
                                </v-col>
                                <v-col cols="6" md="4">
                                    <v-select
                                        v-model="slides[currentSlideIndex].animationIn"
                                        :rules="requiredRules"
                                        :items="animationsIn"
                                        single-line
                                        prepend-icon="mdi-animation"
                                        required
                                    />
                                </v-col>
                                <v-col cols="6" md="4">
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
                                            color="warning"
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
                <SlideSidebar ref="slideSidebar" v-model="slides" @switched="setCurrentSlideIndex" />
            </div>
            <div class="edit-panel__toolbar">
                <v-divider />
                <v-toolbar
                    height="55px"
                    color="transparent"
                    flat
                    bottom>
                    <v-row justify="center">
                        <div class="text-center">
                            <v-btn color="accent" ripple @click.stop="save"><v-icon>mdi-content-save-outline</v-icon>Save</v-btn>
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
import { SlideshowType, SlideshowDocument, MdSlide, Slideshow, slideshowTypes,
    SlideshowThemeDetials, SlideshowTypeDetials, slideshowThemes, createSlideshowObject,
    slideshowService, revealAnimationsIn, revealAnimationsOut} from '..';
import Draggable from 'vuedraggable';
import EditableTitleCard from '@/modules/admin/components/EditableTitleCard.vue';
import MediaCenterPopup from '@/modules/media/views/MediaCenterPopup.vue';
import SlideThemePreview from './SlideThemePreview.vue';
import SlideshowThemeSelect from './SlideshowThemeSelect.vue';
import SlideshowTypeSelect from './SlideshowTypeSelect.vue';
import SlideSidebar from './SlideSidebar.vue';


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
        SlideSidebar,
    },
})
export default class SlideshowForm extends Vue {
    @Ref() private readonly form!: Vue & { validate: () => boolean, reset: () => void };
    @Ref() private readonly slideSidebar!: Vue & {
        addNewSlide: () => void,
        switchToSlide: (index: number) => void,
        deleteCurrentSlide: () => void,
    };

    @Action private addSlideshowAction!: (payload: Slideshow) => void;
    @Action private updateSlideshowAction!: (payload: SlideshowDocument) => void;

    @authNs.Getter private readonly authUser!: AuthUser;
    @Getter private readonly currentSlideshow!: Slideshow<MdSlide> | null;

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

    get typeSelectOptions() {
        return slideshowTypes;
    }

    get themeSelectOptions() {
        return slideshowThemes;
    }

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
                slides: this.slides.map((s: MdSlide, i) => ({ ...s, order: i })),
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
            this.slideSidebar.addNewSlide();
        } else {
            this.slideSidebar.switchToSlide(this.slides.length - 1);
        }
        this.id = slideshow.id || undefined;
    }

    private setImageUrl(url: string) {
        this.imageUrl = url;
    }

    private setCurrentSlideIndex(index: number) {
        this.currentSlideIndex = index;
    }

    private deleteCurrentSlide() {
        this.slideSidebar.deleteCurrentSlide();
    }
}
</script>

<style lang="scss">
    .edit-panel {
        height: calc(100vh - 88px);
    }
</style>