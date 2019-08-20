<template>
    <div class="register-with-email">
        <form-card
                headingText="Sign up to Shoyu slides"
                submitText="SIGN UP"
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

                <v-text-field
                    v-model="confirmPassword"
                    label="confirm Password"
                    :rules="getConfirmPasswordRules()"
                    required
                    :append-icon="confirmPasswordShow ? 'visibility' : 'visibility_off'"
                    :type="confirmPasswordShow ? 'text' : 'password'"
                    @click:append="toggleConfirmPasswordShow"
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
export default class RegisterWithEmail extends Vue {
    @Action public signUpAction!: (payload: EmailAuthCredentials) => void;
    @Action private signOutLightAction!: () => void;

    @Ref() private readonly form!: Vue & { validate: () => boolean, reset: () => void };

    private passwordShow = false;
    private confirmPasswordShow = false;
    private valid = true;
    private email = '';
    private emailRules = [
      (v: string) => !!v || 'E-mail is required',
      (v: string) => /.+@.+/.test(v) || 'E-mail must be valid',
    ];
    private password = '';
    private confirmPassword = '';
    private passwordRules = [
      (v: string) => (v.length >= 6) || 'Minimum password length is 6',
    ];

    private togglePasswordShow() {
        this.passwordShow = !this.passwordShow;
    }

    private toggleConfirmPasswordShow() {
        this.confirmPasswordShow = !this.confirmPasswordShow;
    }

    private getConfirmPasswordRules() {
        const that = this;
        return [
            (v: string) => (!!v && v === that.password) || 'Confirm password mismatch',
        ];
    }

    private validate() {
        if (this.form.validate()) {
            this.signOutLightAction();
            this.registerWithFirebase();
        }
    }

    private registerWithFirebase() {
        this.signUpAction({
            email: this.email,
            password: this.password,
        });
    }
}
</script>
