<template>
    <div>
    <admin-card color="secondary" title="Create slideshow" text="Create a new slideshow" elevation="6">
        <v-form>
            <v-row justify="center">
                <v-col cols="12" md="8">
                    <v-container class="py-0">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-select
                                    v-model="type"
                                    :items="typesSelectOptions"
                                    :hint="`${type.description}`"
                                    label="Slideshow type"
                                    item-text="name"
                                    item-value="type"
                                    persistent-hint
                                    return-object
                                ></v-select>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field label="First Name" class="purple-input" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field label="Last Name" class="purple-input" />
                            </v-col>

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
                            </v-col>

                            <v-col cols="12">
                                <v-textarea
                                    class="purple-input"
                                    label="About Me"
                                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                />
                            </v-col>

                            <v-col cols="12" class="text-right">
                                <v-btn color="success">Update Profile</v-btn>
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
import { Component, Vue } from 'vue-property-decorator';
import { slideshowTypes } from '..';
import { SlideshowTypeDetials } from '../types';

@Component({})
export default class SlideshowForm extends Vue {
    private type: SlideshowTypeDetials = slideshowTypes[0];
    get typesSelectOptions() {
        return slideshowTypes;
    }

}
</script>
