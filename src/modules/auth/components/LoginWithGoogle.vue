<template>
    <div class="login-with-google">
        <v-container>
            <v-btn class="login-with-google__button" x-large block color="primary" @click="signInWithFirebase">
                <v-icon left>mdi-google</v-icon> Sign in with Google
            </v-btn>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Ref, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { EmailAuthCredentials } from '../types';

const { Action, Getter } = namespace('auth');

@Component({})
export default class LoginWithGoogle extends Vue {
    @Action private signInWithGoogleAction!: () => void;
    @Action private signOutLightAction!: () => void;

    private signInWithFirebase() {
        this.signOutLightAction();
        this.signInWithGoogleAction();
    }
}
</script>

<style lang="scss" scoped>
    .login-with-google {
        &__button {
            background: linear-gradient(to right, #4285f4, #34a853, #fbbc05, #ea4335);
        }
    }
</style>
