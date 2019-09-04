<template>
  <admin-layout-full>
    <slideshow-form />
  </admin-layout-full>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Slideshow } from '..';
import SlideshowForm from '../components/SlideshowForm.vue';

const { Getter } = namespace('slideshow');

@Component({
  components: {
    SlideshowForm,
  },
})
export default class Create extends Vue {
  @Getter private readonly currentSlideshow!: Slideshow | null;
  public created() {
    // console.log(this.$router.currentRoute.path, this.currentSlideshow);
    // if (this.$router.currentRoute.path.indexOf('/new') > -1 && this.currentSlideshow) {
    //   this.$router.push(`/admin/slideshows/${this.currentSlideshow.id}/edit`);
    // }
  }
}
</script>
