<template>
    <v-dialog v-model="dialog" scrollable>
        <template v-slot:activator="{ on }">
            <v-btn :color="buttonColor" icon v-on="on">
                <v-icon>mdi-image</v-icon>
            </v-btn>
        </template>
        <v-card max-height="90vh">
            <v-card-title>Media center</v-card-title>
            <v-divider />
            <v-card-text>
                <MediaCenter @select="onSelect" />
            </v-card-text>
            <v-divider />
            <v-card-actions>
                <div class="text-center flex-grow-1">
                    <v-btn color="secondary" text @click="dialog = false">Close</v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import MediaCenter from '../components/MediaCenter.vue';

@Component({
  components: {
    MediaCenter,
  },
})
export default class MediaCenterPopup extends Vue {
    @Prop({ default: 'secondary' }) public readonly buttonColor!: string;

    private dialog = false;

    @Emit('select')
    private onSelect(url: string) {
        this.dialog = false;
        return url;
    }
}
</script>
