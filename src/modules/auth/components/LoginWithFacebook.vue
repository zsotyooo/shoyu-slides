<template>
    <div class="login-with-facebook">
        <v-container>
            <v-btn class="login-with-facebook__button" x-large block color="#4267B2" @click="signInWithFirebase">
                <v-icon left>mdi-facebook</v-icon> Sign in with Facebook
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
export default class LoginWithFacebook extends Vue {
    @Action private signInWithFacebookAction!: () => void;
    @Action private signOutLightAction!: () => void;

    private signInWithFirebase() {
        this.signOutLightAction();
        this.signInWithFacebookAction();
    }
}
</script>
