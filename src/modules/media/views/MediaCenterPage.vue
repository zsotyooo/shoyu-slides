<template>
  <admin-layout-full>
    <MediaCenter :selectable="false" />
  </admin-layout-full>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MediaCenter from '../components/MediaCenter.vue';

@Component({
  components: {
    MediaCenter,
  },
})
export default class MediaCenterPage extends Vue {
}
</script>
