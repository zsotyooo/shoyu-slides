<template>
    <v-row justify="center">
        <v-col cols="12" class="px-8">
            <!-- <admin-card color="secondary" title="Slideshows" text="Your slideshows" elevation="6"> -->
                <v-row>
                    <div class="flex-grow-1" />
                    <v-col>
                        <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Search"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-data-table
                    class="transparent"
                    v-model="selected"
                    :headers="headers"
                    :items="slideshows || []"
                    :single-select="true"
                    :search="search"
                    item-key="id"
                    :loading="status === 'loading'"
                    show-select
                >
                    <template #item.title="{ item, select }">
                        <!-- <strong v-if="item.isPublished">
                            {{ item.title }}
                        </strong>
                        <span v-else>
                            {{ item.title }}
                        </span> -->
                        <span>
                            {{ item.title }}
                        </span>
                    </template>

                    <template #item.nrOfSlides="{ item, select }">
                        <em>
                            {{ item.slides.length }} slide{{item.slides.length > 1 ? 's' : ''}}
                        </em>
                    </template>

                    <template #item.edit="{ item, select }">
                        <!-- <transition type="fade">
                            <v-btn ripple :disabled="item.isPublished" depressed rounded color="accent">
                                <v-icon>mdi-checkbox-marked-circle-outline</v-icon>publish
                            </v-btn>
                        </transition> -->
                        <v-btn ripple depressed rounded color="primary" class="ml-2" :to="`/admin/slideshows/${item.id}/edit`">
                            <v-icon>mdi-circle-edit-outline</v-icon>edit
                        </v-btn>
                    </template>
                </v-data-table>

                <!-- <template #actions>
                    <v-btn color="accent" ripple><v-icon>mdi-checkbox-marked-circle-outline</v-icon>Publish selection</v-btn>
                    <v-btn color="error" outlined ripple>Unpublish selection</v-btn>
                </template> -->
            <!-- </admin-card> -->
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { namespace } from 'vuex-class';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { AuthUser } from '@/modules/auth';
import { Slideshow } from '..';
import { AdminStatus } from '../../admin';

const { Action, Getter } = namespace('slideshow');
const authNs = namespace('auth');
const adminNs = namespace('admin');

@Component({})
export default class AppBar extends Vue {
    @Action private fetchSlideshowsAction: (authUser: AuthUser) => void;
    @authNs.Getter private authUser!: AuthUser | null;
    @Getter private slideshows!: Slideshow[];
    @adminNs.Getter private status!: AdminStatus;

    private selected: Slideshow[] = [];

    private headers = [
        {
            text: 'Title',
            align: 'left',
            sortable: true,
            value: 'title',
        },
        {
            text: 'Nr. of slides',
            align: 'left',
            sortable: false,
            value: 'nrOfSlides',
        },
        {
            text: '',
            align: 'right',
            sortable: false,
            value: 'edit',
        },
    ];

    private search = '';

    public mounted() {
        if (this.authUser) {
            this.fetchSlideshowsAction({...this.authUser} as AuthUser);
        }
    }
}
</script>

<style>
    .theme--light.v-data-table tbody tr:not(.v-data-table__expand-row) {
        background: #eeeeee !important;
    }
    .theme--light.v-data-table tbody tr:hover:not(.v-data-table__expand-row) {
        background: #cccccc !important;
    }
</style>
