<template>
    <div class="media-center">
        <v-tabs icons-and-text grow @change="tabChange">
            <v-tab>upload<v-icon>mdi-cloud-upload-outline</v-icon></v-tab>
            <v-tab>Browse<v-icon>mdi-image-multiple</v-icon></v-tab>
            <v-tab-item>
                <v-form ref="form" class="slideshow-edit d-flex flex-column flex-grow-1"
                            v-model="valid"
                            lazy-validation>
                    <v-row class="px-8">
                        <v-col cols="12">
                            <v-file-input
                                small-chips
                                multiple
                                clearable
                                label="Add files"
                                filled
                                shaped
                                show-size
                                :rules="rules"
                                @change="add"
                                prepend-icon="mdi-cloud-upload"
                            />
                        </v-col>
                        <v-col cols="12" v-if="filesToUpload && filesToUpload.length">
                            <v-subheader>Upload queue:</v-subheader>
                            <v-divider />
                            <v-row>
                                <v-col
                                    v-for="(f,i) in filesToUpload"
                                    :key="`ftu_${f.id}`"
                                    cols="4"
                                    sm="2"
                                >
                                    <v-card
                                        class="pa-2"
                                        outlined
                                    >
                                        <v-img
                                            height="200px"
                                            :src="f.localImageData"
                                            contain
                                            gradient="to top, rgba(0, 0, 0, 0.4) 40%, transparent 90%"
                                        >
                                            <v-btn
                                                class="mr-n4"
                                                color="error"
                                                icon
                                                absolute
                                                right
                                                @click.stop="removeUpload(f.id)"
                                            >
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                            <v-card-title class="caption align-end fill-height white--text">{{ f.file.name  }}</v-card-title>
                                        </v-img>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" class="text-center">
                                    <v-btn color="primary" ripple @click.stop="upload"><v-icon>mdi-cloud-upload</v-icon>upload</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" v-if="currentUploads && currentUploads.length">
                            <v-subheader>Recently uploaded:</v-subheader>
                            <v-divider />
                            <v-row>
                                <v-col
                                    v-for="(url,i) in currentUploads"
                                    :key="`cu_${i}`"
                                    cols="4"
                                    sm="2"
                                >
                                    <v-card
                                        class="pa-2"
                                        outlined
                                        @click="$emit('select', url)"
                                    >
                                        <v-img
                                            height="200px"
                                            :src="url"
                                            contain
                                        >
                                            <v-btn
                                                class="mr-n4"
                                                color="error"
                                                icon
                                                absolute
                                                right
                                            >
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                        </v-img>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-form>
            </v-tab-item>
            <v-tab-item>
                <v-row class="px-8">
                    <v-col cols="12">
                        <v-subheader>media items:</v-subheader>
                        <v-divider />
                        <v-row v-if="list">
                            <v-col
                                v-for="(url,i) in list"
                                :key="`l_${i}`"
                                cols="4"
                                sm="2"
                            >
                                <v-hover>
                                    <template v-slot:default="{ hover }">
                                        <v-card
                                            class="pa-2"
                                            outlined
                                        >
                                            <v-img
                                                height="200px"
                                                :src="url"
                                                contain
                                            >
                                                <v-btn
                                                    class="mr-n4"
                                                    color="error"
                                                    icon
                                                    absolute
                                                    right
                                                >
                                                    <v-icon>mdi-delete</v-icon>
                                                </v-btn>
                                            </v-img>
                                            <template v-if="selectable">
                                                <v-fade-transition>
                                                    <v-overlay
                                                        v-if="hover"
                                                        absolute
                                                        color="#036358"
                                                    >
                                                        <v-btn @click.stop="$emit('select', url)">select</v-btn>
                                                    </v-overlay>
                                                </v-fade-transition>
                                            </template>
                                        </v-card>
                                    </template>
                                </v-hover>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Prop } from 'vue-property-decorator';
import { AuthUser } from '@/modules/auth';
import { namespace } from 'vuex-class';
import { FileUpload } from '..';
import { storage } from 'firebase';

const authNs = namespace('auth');
const { Getter, Action } = namespace('media');

let lastId = 0;

@Component({
  components: {
  },
})
export default class MediaCenter extends Vue {
    @Prop({ default: true }) public readonly selectable!: boolean;
    @Action public uploadUserFileAction!: (payload: {
        authUser: AuthUser | null,
        file: File,
        onStarted?: () => void,
        onProgress?: (progress: number) => void,
        onPaused?: () => void,
    }) => Promise<string>;
    @Action public fetchUserFileList!: (authUser: AuthUser) => void;
    @Ref() private readonly form!: Vue & { validate: () => boolean, reset: () => void };

    @authNs.Getter private readonly authUser!: AuthUser;
    @Getter private readonly currentUploads: string[] | null;
    @Getter private readonly list: string[] | null;

    private files: File[] = [];
    private filesToUpload: FileUpload[] = [];
    private valid = true;

    private rules = [
        (v: File[]) => v.reduce((a, file) => a && file.type.indexOf('image/') !== 0, true as boolean)
            && 'You can only select images!',
    ];

    public mounted() {
        this.fetchUserFileList(this.authUser);
    }

    private async add(files: File[]) {
        files.forEach(async (file) => {
            try {
                const localImageData = await this.loadLocalImageData(file);
                const id = lastId++;
                const upload = {
                    id,
                    file,
                    progress: 0,
                    done: false,
                    localImageData,
                };
                this.filesToUpload.push(upload);
            } catch (e) {
                console.error('Cannot read local URL');
            }
        });
    }

    private upload() {
        this.filesToUpload.forEach((u) => {
            this.uploadUserFileAction({
                authUser: this.authUser,
                file: u.file,
            }).then(() => {
                this.removeUpload(u.id);
            });
        });
    }

    private async loadLocalImageData(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                resolve(((ev.target as any).result as string));
            };
            reader.onabort = () => reject();
            reader.onerror = () => reject();
            reader.readAsDataURL(file);
        });
    }

    private removeUpload(id: number) {
        const i = this.filesToUpload.findIndex((u) => u.id === id);
        this.filesToUpload.splice(i, 1);
    }

    private tabChange(n: number) {
        if (n === 1) {
            this.fetchUserFileList(this.authUser);
        }
    }
}
</script>
