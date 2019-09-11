<template>
  <admin-layout-full>
    <slideshow-form />
  </admin-layout-full>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SlideshowForm from '../components/SlideshowForm.vue';

@Component({
  components: {
    SlideshowForm,
  },
})
export default class Edit extends Vue {
}
</script>
