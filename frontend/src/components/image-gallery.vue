<script>
export default {
  name: 'ImageGallery',
  props: ['bungalow'],
}
</script>

<template lang="pug">
.image-gallery
  .img(v-for='image in bungalow.images')
    router-link(:to='`/bungalows/${bungalow._id}/image/${image._id}`')
      img(:src='image.src', :alt='image.alt')
</template>

<style lang="scss" scoped>
.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 1.2rem;
  max-width: 80rem;
  margin: 1rem auto;
  padding: 0 3rem;

  .img {
    flex-basis: 13rem;
    img {
      width: 100%;
      height: 22vw;
      object-fit: cover;
      border-radius: 0.75rem;
    }
  }
}
</style>
