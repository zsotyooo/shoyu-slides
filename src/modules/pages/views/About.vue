<template>
  <admin-layout-logo>
    <div class="about">
      <current-user></current-user>
    </div>
  </admin-layout-logo>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CurrentUser from '@/modules/user/components/CurrentUser.vue';

@Component({
  components: {
    CurrentUser,
  },
})
export default class About extends Vue {
}
</script>
