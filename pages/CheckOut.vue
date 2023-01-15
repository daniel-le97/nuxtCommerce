<template>
  <div id="iban-element" class="mt-2 stripe-iban-element"></div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js/pure'

loadStripe.setLoadParameters({ advancedFraudSignals: false }) // https://github.com/stripe/stripe-js#disabling-advanced-fraud-detection-signals
let stripe, elements

export default {
  methods: {
    async loadStripeWhenModalOpens() {
      if (!stripe) {
        stripe = await loadStripe(this.$config.stripePublishableKey)
        elements = stripe.elements()
      }
      this.$nextTick(async () => {
        const iban = elements.create('iban', {
          supportedCountries: ['SEPA'],
          placeholderCountry: 'FR',
          iconStyle: 'default',

        })
        // eslint-disable-next-line
        await new Promise((r) => setTimeout(r, 100)) // ugly but needed if you hard refresh the exact page where the module is imported
        iban.mount('#iban-element')
      })
    },

    destroyStripeIbanElement() {
      const ibanElement = elements?.getElement('iban')
      if (ibanElement) ibanElement.destroy()
    },
  },
  beforeDestroy() {
    this.destroyStripeIbanElement()
  },
}

</script>
