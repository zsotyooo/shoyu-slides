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
                    <SlideEditor
                        v-if="currentSlideIndex > -1"
                        v-model="slides[currentSlideIndex]"
                        @delete="deleteCurrentSlide"
                    />
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
import SlideEditor from './SlideEditor.vue';


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
        SlideEditor,
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

    public mounted() {
        if (this.currentSlideshow) {
            this.setSlideshow(this.currentSlideshow);
        }
        if (!this.$router.currentRoute.params.slideshowId) {
            this.slideSidebar.addNewSlide();
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
        this.type = slideshowTypes.find((t) => t.type === slideshow.type) as SlideshowTypeDetials;
        this.theme = slideshowThemes.find((t) => t.theme === slideshow.theme) as SlideshowThemeDetials;
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