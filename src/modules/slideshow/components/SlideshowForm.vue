<template>
    <div>
    <admin-card color="secondary" title="Create slideshow" text="Create a new slideshow" elevation="6">
        <v-form ref="form"
                v-model="valid"
                lazy-validation>
            <v-row justify="center">
                <v-col cols="12" md="8">
                    <v-container class="py-0">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field :rules="requiredRules" label="Title" v-model="title" required/>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select
                                    :rules="requiredRules"
                                    v-model="type"
                                    :items="typeSelectOptions"
                                    :hint="`${type.description}`"
                                    label="Slideshow type"
                                    item-text="name"
                                    item-value="type"
                                    persistent-hint
                                    return-object
                                    required
                                ></v-select>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select
                                    :rules="requiredRules"
                                    v-model="theme"
                                    :items="themeSelectOptions"
                                    :hint="`${theme.description}`"
                                    label="Theme"
                                    item-text="name"
                                    item-value="theme"
                                    persistent-hint
                                    return-object
                                    required
                                ></v-select>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field label="Background image URL" v-model="imageUrl"/>
                            </v-col>
<!-- 
                            <v-col cols="12">
                                <v-text-field label="Adress" class="purple-input" />
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field label="City" class="purple-input" />
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field label="Country" class="purple-input" />
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field class="purple-input" label="Postal Code" type="number" />
                            </v-col> -->

                            <v-col cols="12">
                                <v-textarea
                                    class="purple-input"
                                    label="About Me"
                                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                />
                            </v-col>

                            <v-col cols="12" class="text-right">
                                <v-btn color="success" @click.stop="save">Update Profile</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-form>
    </admin-card>
    </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Slideshow, slideshowTypes, SlideshowThemeDetials, SlideshowTypeDetials, slideshowThemes,
    createSlideshowObject } from '..';
import { AuthUser } from '../../auth';

const authNs = namespace('auth');
const { Action, Getter} = namespace('slideshow');

@Component({})
export default class SlideshowForm extends Vue {

    get typeSelectOptions() {
        return slideshowTypes;
    }

    get themeSelectOptions() {
        return slideshowThemes;
    }

    @Action public addSlideshowAction!: (payload: Slideshow) => void;
    @Ref() private readonly form!: Vue & { validate: () => boolean, reset: () => void };

    @authNs.Getter private readonly authUser!: AuthUser;

    private valid = true;

    private type: SlideshowTypeDetials = slideshowTypes[0];
    private theme: SlideshowThemeDetials = slideshowThemes[0];
    private imageUrl = '';
    private title = '';

    private requiredRules = [
      (v: string) => !!v || 'Field is  required',
    ];
     private save() {
         if (this.form.validate()) {
             const payload = createSlideshowObject({
                 title: this.title,
                 type: this.type.type,
                 theme: this.theme.theme,
                 imageUrl: this.imageUrl,
                 isPublished: false,
                 uid: this.authUser.uid,
             });
             this.addSlideshowAction(payload);
         }
     }
}
</script>
