<template>
    <div class="login">
        <admin-layout-logo>
            <template v-if="isLoggedIn">
                <v-subheader>Signed in as</v-subheader>
                <v-divider></v-divider>
                <current-user />
            </template>
            <v-subheader>Sign in or register with one click</v-subheader>
            <v-divider></v-divider>
            <login-with-google></login-with-google>
            <login-with-facebook></login-with-facebook>
            <v-subheader>Sing in using Email and Password</v-subheader>
            <v-divider></v-divider>
            <v-container>
                <v-tabs icons-and-text dark>
                    <v-tab>Sign in<v-icon>mdi-login-variant</v-icon></v-tab>
                    <v-tab>Register<v-icon>mdi-account-plus-outline</v-icon></v-tab>
                    <v-tab-item>
                        <login-with-email></login-with-email>
                    </v-tab-item>
                    <v-tab-item>
                        <register-with-email></register-with-email>
                    </v-tab-item>
                </v-tabs>
            </v-container>
        </admin-layout-logo>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Ref, Vue, Watch, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import CurrentUser from '@/modules/user/components/CurrentUser.vue';
import LoginWithGoogle from '../components/LoginWithGoogle.vue';
import LoginWithFacebook from '../components/LoginWithFacebook.vue';
import LoginWithEmail from '../components/LoginWithEmail.vue';
import RegisterWithEmail from '../components/RegisterWithEmail.vue';
import { AuthUser } from '../types';

const { Getter } = namespace('auth');

@Component({
    components: {
        CurrentUser,
        LoginWithGoogle,
        LoginWithFacebook,
        LoginWithEmail,
        RegisterWithEmail,
    },
})
export default class Login extends Vue {
    @Prop({ default: false }) public logout?: boolean;

    @Getter private isLoggedIn!: boolean;
    @Getter private authUser!: AuthUser | null;

    @Watch('authUser')
    public onAuthUserChanged(user: AuthUser | null) {
        if (user) {
            this.$router.push('/admin/slideshows');
        }
    }

    public created() {
        this.$vuetify.theme.dark = true;
    }
}
</script>
