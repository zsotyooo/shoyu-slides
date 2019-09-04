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
                    color="accent"
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

    .v-input.text-field--large input,
    .v-input.text-field--large label {
        font-size: 36px !important;
        height: 36px !important;
        max-height: 50px !important;
        line-height: 36px !important;
        top: 0 !important;
        font-weight: 200 !important;
    }

    .v-input.text-field--medium input,
    .v-input.text-field--medium label {
        font-size: 26px !important;
        height: 26px !important;
        max-height: 40px !important;
        line-height: 26px !important;
        top: 0 !important;
        font-weight: 200 !important;
    }

    .v-input.text-field--large:not(.v-input--is-focused),
    .v-input.text-field--medium:not(.v-input--is-focused) {
        & > .v-input__control > .v-input__slot:before,
        & > .v-input__control > .v-input__slot:after,
        & > .v-input__control > .v-input__slot > input {
            border-color: transparent;
        }
    }
</style>