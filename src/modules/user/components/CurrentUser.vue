<template>
    <v-list-item v-if="isLoggedIn">
        <v-list-item-avatar v-if="photoUrl">
            <v-img
                :error="error = true"
                class="elevation-6"
                :src="photoUrl"
            ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
        <v-list-item-title>{{ displayName }}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { User } from '../types';

const userNs = namespace('user');
const authNs = namespace('auth');

@Component({

})
export default class CurrentUser extends Vue {
    @userNs.Getter private currentUser!: User;
    @authNs.Getter private isLoggedIn!: boolean;

    private error = false;

    get photoUrl() {
        const getDefaultImg = () => {
            if (!this.currentUser) {
                return 'https://api.adorable.io/avatars/100/shoyu-slides.png';
            }
            return `https://api.adorable.io/avatars/100/${this.currentUser.uid}.png`;
        };

        if (this.error || !this.currentUser) {
            return getDefaultImg();
        }
        return this.currentUser.photoUrl || getDefaultImg();
    }

    get displayName() {
        return this.currentUser ? this.currentUser.displayName || 'no name' : 'XXX';
    }
}
</script>
