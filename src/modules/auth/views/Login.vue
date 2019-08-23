<template>
    <div class="login">
        <layout-empty>
            <v-subheader>Sign in or register with one click</v-subheader>
            <v-divider></v-divider>
            <login-with-google></login-with-google>
            <login-with-facebook></login-with-facebook>
            <v-subheader>Sing in using Email and Password</v-subheader>
            <v-divider></v-divider>
            <v-container>
                <v-tabs>
                    <v-tab>Sign in</v-tab>
                    <v-tab>Register</v-tab>
                    <v-tab-item>
                        <login-with-email></login-with-email>
                    </v-tab-item>
                    <v-tab-item>
                        <register-with-email></register-with-email>
                    </v-tab-item>
                </v-tabs>
            </v-container>
            <template #outside>
                <v-snackbar
                    v-model="showError"
                    bottom
                    color="error"
                    multi-line>
                    {{ error }}
                    <v-btn icon text @click="showError = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-snackbar>
                <v-snackbar
                    v-model="showLogoutMessage"
                    bottom
                    color="success"
                    multi-line>
                    You have successfully signed out.
                    <v-btn icon text @click="showLogoutMessage = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-snackbar>
            </template>
        </layout-empty>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Ref, Vue, Watch, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import LoginWithGoogle from '../components/LoginWithGoogle.vue';
import LoginWithFacebook from '../components/LoginWithFacebook.vue';
import LoginWithEmail from '../components/LoginWithEmail.vue';
import RegisterWithEmail from '../components/RegisterWithEmail.vue';

const { Action, Getter } = namespace('auth');

@Component({
    components: {
        LoginWithGoogle,
        LoginWithFacebook,
        LoginWithEmail,
        RegisterWithEmail,
    },
})
export default class Login extends Vue {
    @Prop({ default: false }) public logout?: boolean;

    @Action private signOutAction!: () => void;

    @Getter private isLoggedIn!: boolean;
    @Getter private error!: string;

    private showError = false;
    private showLogoutMessage = false;

    public mounted() {
        if (this.logout) {
            this.signOutAction();
        }
    }

    @Watch('isLoggedIn')
    private onLoggedInChanged(val: boolean, prev: boolean) {
        if (val === true) {
            this.$router.push('about');
        } else if (val === false && this.logout) {
            this.showLogoutMessage = true;
        }
    }

    @Watch('error')
    private onErrorChanged(val: string, prev: string) {
        if (val) {
            this.showError = true;
        }
    }
}
</script>
