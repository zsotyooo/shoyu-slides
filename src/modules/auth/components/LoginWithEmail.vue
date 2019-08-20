<template>
    <div class="login-with-email">
        <form-card
                headingText="Sign in to Shoyu slides"
                submitText="SIGN IN"
                @submit="validate"
                :valid="valid">
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation>
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    required
                    :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
                    :type="passwordShow ? 'text' : 'password'"
                    @click:append="togglePasswordShow"
                ></v-text-field>
            </v-form>
        </form-card>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Ref, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { EmailAuthCredentials } from '../types';

const { Action, Getter } = namespace('auth');

@Component({})
export default class LoginWithEmail extends Vue {
    @Action private signInAction!: (payload: EmailAuthCredentials) => void;
    @Action private signOutLightAction!: () => void;

    @Ref() private readonly form!: Vue & { validate: () => boolean, reset: () => void };

    private passwordShow = false;
    private valid = true;
    private email = '';
    private emailRules = [
      (v: string) => !!v || 'E-mail is required',
      (v: string) => /.+@.+/.test(v) || 'E-mail must be valid',
    ];
    private password = '';
    private passwordRules = [
      (v: string) => !!v || 'Password and Confirm password Required',
    ];

    private togglePasswordShow() {
        this.passwordShow = !this.passwordShow;
    }

    private validate() {
        if (this.form.validate()) {
            this.signOutLightAction();
            this.signInWithFirebase();
        }
    }

    private signInWithFirebase() {
        this.signInAction({
            email: this.email,
            password: this.password,
        });
    }
}
</script>
