<template>
    <div v-if="slide" class="slide-editor d-flex flex-column flex-grow-1">
        <div class="d-flex flex-row pl-8 pr-4">
            <v-row class="flex-grow-1">
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="slide.name"
                        :rules="requiredRules"
                        label="Enter Slide name"
                        single-line
                        dense
                        hide-details
                        prepend-icon="mdi-rename-box"
                        required
                    />
                </v-col>
                <v-col cols="6" md="4">
                    <v-select
                        v-model="slide.animationIn"
                        :rules="requiredRules"
                        :items="animationsIn"
                        single-line
                        dense
                        filled
                        hide-details
                        prepend-icon="mdi-animation"
                        required
                    />
                </v-col>
                <v-col cols="6" md="4">
                    <v-select
                        v-model="slide.animationOut"
                        :rules="requiredRules"
                        :items="animationsOut"
                        single-line
                        dense
                        filled
                        hide-details
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
                    <v-card-text>Do you really want to delete "{{slide.name}}"?</v-card-text>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="primary" text @click="deleteDialog = false">Cancel</v-btn>
                        <v-btn color="error" text @click="deleteDialog = false; deleteSlide()">DELETE</v-btn>
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
            v-model="slide.content"
        />
    </div>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch, Prop, Emit } from 'vue-property-decorator';
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
import MediaCenterPopup from '@/modules/media/views/MediaCenterPopup.vue';
import { Editor } from '@toast-ui/vue-editor';

const authNs = namespace('auth');
const { Action, Getter} = namespace('slideshow');

@Component({
    components: {
        Editor,
        MediaCenterPopup,
    },
})
export default class SlideEditor extends Vue {
    @Prop({
        default: null,
    }) private readonly value!: MdSlide | null;

    private deleteDialog = false;
    private helpDialog = false;
    private animationsIn = revealAnimationsIn;
    private animationsOut = revealAnimationsOut;
    private slide: MdSlide | null = null;

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
        this.onValueChange(this.value);
    }

    @Watch('value')
    private onValueChange(v: MdSlide | null) {
        this.slide = v;
    }

    @Watch('slide')
    @Emit('input')
    private onSlideChange(v: MdSlide | null) {
        return this.slide;
    }

    @Emit('delete')
    private deleteSlide() {
        return this.slide;
    }
}
</script>