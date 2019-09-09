<template>
  <v-app>
    <slot></slot>
    <v-snackbar :value="showError" bottom color="error" multi-line>
        {{ error }}
    </v-snackbar>
    <v-snackbar :value="showSuccess" bottom color="success" multi-line>
        {{ success }}
    </v-snackbar>
    <v-overlay :value="showLoader">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <slot name="outside"></slot>
  </v-app>
</template>

<script lang="ts">
import { namespace } from 'vuex-class';
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import { AdminStatus } from '..';

const { Getter } = namespace('admin');

@Component({})
export default class LayoutEmpty extends Vue {
    @Getter private error!: string | null;
    @Getter private success!: string | null;
    @Getter private status!: AdminStatus;

    // private showError = false;
    // private showSuccess = false;
    // private showLoader = false;

    get showError(): boolean {
        return !!this.error;
    }

    get showSuccess(): boolean {
        return !!this.success;
    }

    get showLoader(): boolean {
        return this.status === 'loading';
    }
}
</script>
