<template>
  <admin-layout-full>
    <slideshow-table />
  </admin-layout-full>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SlideshowTable from '../components/SlideshowTable.vue';

@Component({
  components: {
    SlideshowTable,
  },
})
export default class Home extends Vue {}
</script>
