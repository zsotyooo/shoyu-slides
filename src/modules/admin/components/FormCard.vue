<template>
    <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat v-if="heading">
            <v-toolbar-title>{{ headingText }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <slot></slot>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary"
                :disabled="!valid"
                @click="submit">{{ submitText }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class FormCard extends Vue {
    @Prop({ default: false }) public heading: boolean = false;
    @Prop() public headingText!: string;
    @Prop() public submitText!: string;
    @Prop({ default: true }) public valid!: boolean;

    @Emit()
    public submit() {
        return;
    }
}
</script>
