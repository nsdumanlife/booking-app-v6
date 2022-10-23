<script>
import { mapActions } from 'vuex'

export default {
  name: 'ImageCmp',
  data() {
    return {
      image: {},
    }
  },
  async created() {
    this.image = await this.fetchBungalowImage({
      bungalowId: this.$route.params.bungalowId,
      imageId: this.$route.params.imageId,
    })
  },
  methods: {
    ...mapActions(['fetchBungalowImage']),
    closeLightbox() {
      this.$router.push({ path: `/bungalows/${this.$route.params.bungalowId}` })
    },
  },
}
</script>

<template lang="pug">
.lightbox(@click.self='closeLightbox')
  img(:src='image.src')
</template>

<style lang="scss" scoped>
.lightbox {
  display: flex;
  justify-content: center;
  padding: 2rem;
  img {
    height: 50%;
    width: 50%;
  }
}
</style>
