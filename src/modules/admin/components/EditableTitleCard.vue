<template>
    <v-card color="transparent" tile flat class="editable-title-card">
        <v-card-title>
            <v-list-item>
                <v-text-field
                    :value="value"
                    :rules="requiredRules"
                    @focus="isOpen = true"
                    @change="updateTitle"
                    :class="[`text-field--${size}`]"
                    :label="label"
                    single-line
                    required
                />
                <v-btn
                    v-if="isCloseable"
                    large
                    icon
                    color="dark"
                    :class="`editable-title-card__button ml-6 ${isOpen ? 'is-open' : ''}`"
                    @click.stop="isOpen = !isOpen"
                >
                    <v-icon>mdi-settings-outline</v-icon>
                </v-btn>
            </v-list-item>
        </v-card-title>
    
        <v-expand-transition>
            <v-row v-show="isOpen" class="px-8">
                <slot />
            </v-row>
        </v-expand-transition>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class EditableTitleCard extends Vue {
    @Prop({
        default: '',
    }) private readonly value!: string;

    @Prop({
        default: 'Enter slideshow title',
    }) private readonly label!: string;

    @Prop({
        default: false,
    }) private readonly open!: boolean;

    @Prop({
        default: true,
    }) private readonly isCloseable!: boolean;

    @Prop({
        default: 'Value is required',
    }) private readonly requiredText!: string;

    @Prop({
        default: 'large',
    }) private readonly size!: string;

    private isOpen = false;

    private requiredRules = [
      (v: string) => !!v || this.requiredText,
    ];

    public mounted() {
        this.isOpen = this.open;
    }

    @Emit('input')
    private updateTitle(v: string) {
        return v;
    }
}
</script>

<style lang="scss">
    .editable-title-card {
        &__button {
            transition: all 0.5s ease-out;
            &.is-open {
                transform: rotate(360deg);
            }
        }
    }
</style>