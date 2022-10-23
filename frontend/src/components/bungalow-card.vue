<script>
import { mapState } from 'vuex'
export default {
  name: 'BungalowCard',
  props: ['bungalow'],
  data() {
    return {}
  },
  computed: {
    ...mapState(['checkInDate', 'checkOutDate']),
    totalPrice() {
      if (new Date(this.checkOutDate) - new Date(this.checkInDate) < 0) return

      return (this.bungalow.price * (new Date(this.checkOutDate) - new Date(this.checkInDate))) / (24 * 60 * 60 * 1000)
    },
  },
}
</script>

<template lang="pug">
.bungalow-list-item
  .img-container
    img(:src='bungalow.images?.[0]?.src', :alt='bungalow.images?.[0].alt')
  .info
    p {{ bungalow.location }}
    h4 {{ bungalow.name }}
    p.info-guest {{ bungalow.capacity }} guests
    .info-bottom
      p(v-if='bungalow.rating') 
        .material-icons.star star
        | {{ bungalow.rating }} ({{ this.bungalow.reviews.length }})
      p(v-else) No review yet
      .info-price
        p.price {{ bungalow.price }} TRY / night
        p.total(v-show='checkInDate&&checkOutDate') {{ totalPrice }} TRY total
</template>

<style lang="scss" scoped>
.bungalow-list-item {
  padding: 1rem;
  border: 1px solid var(--color-border-hover);
  border-radius: 0.3rem;
  margin: 0.8rem 0;
  display: flex;

  &:hover {
    img {
      transform: scale(1.1);
    }
  }

  .img-container {
    position: relative;
    height: 13rem;
    width: 20rem;
    img {
      display: block;
      width: 100%;
      height: 13rem;
      object-fit: cover;
      transition: 0.5s ease transform;
      border-radius: 0.5rem;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-left: 1.25rem;

    h4 {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }

    .info-guest {
      padding-top: 0.5rem;
      font-size: 0.85rem;
      line-height: 1.25rem;
      color: var(--color-text);
      flex-grow: 1;
    }

    .info-bottom {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      p {
        display: flex;
        font-size: 0.9rem;
        align-items: center;
        margin: auto 0;

        .star {
          margin-right: 0.25rem;
          font-size: 1rem;
        }
      }
      .info-price {
        .price {
          // padding-bottom: 0.5rem;
          font-size: 1.125rem;
          line-height: 1.75rem;
          font-weight: 600;
          margin: auto 0;
        }
        .total {
          justify-content: flex-end;
          font-weight: 200;
        }
      }
    }
  }
}
</style>
