<script>
export default {
  name: 'FooterCmp',
}
</script>

<template lang="pug">
.footer
  div
    h5 About us
    p About us
    p Newsroom
    p Investors
    p Careers
  div
    h5 Policies
    p Terms conditions
    p Privacy
    p Cookies
  div
    h5 Support
    p Help center
    p Safety information
    p Cancellation options
    p FAQs
  div
    h5 Partner with Bungaa
    p Try hosting
    p Explore hosting resources
    p How to host responsibly
</template>

<style lang="scss">
.footer {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  row-gap: 2.5rem;
  padding: 3.5rem 8rem;
  background: var(--color-background-mute);
}
@media (max-width: 768px) {
  .footer {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
