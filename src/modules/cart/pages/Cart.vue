<template>
  <main class="main">
    <div class="container">
      <div class="cart">
        <h1 class="cart__title">Cart</h1>
        <form action="">
          <p v-if="items.length < 1">your cart is empty</p>
          <CartItem v-for="item in items" :key="item.id" :item="item" />
        </form>
        <div class="cart__info">
          <div class="cart__coupon">
            <form action="">
              <div class="cart__coupon-div">
                <input
                  type="text"
                  placeholder="Enter your coupon code..."
                  class="cart__coupon-input"
                />
                <button class="btn-coupon">Apply</button>
              </div>
            </form>
          </div>
          <div class="cart__table">
            <table>
              <tbody>
                <tr>
                  <th>Subtotal</th>
                  <td>{{ formattedPrice(subtotal) }}</td>
                </tr>
                <tr>
                  <th>Tax</th>
                  <td>{{ formattedPrice(tax) }}</td>
                </tr>
                <tr>
                  <th>Discount</th>
                  <td class="text-red">0</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td class="text-blue">{{ formattedPrice(total) }}</td>
                </tr>
              </tbody>
            </table>
            <button class="btn btn--brand btn--boxshadow">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import CartItem from '../components/CartItem'
export default {
  name: 'Cart',

  components: {
    CartItem
  },

  computed: {
    ...mapState('cart', ['items']),
    ...mapGetters('cart', ['subtotal', 'tax', 'total'])
  },
  methods: {
    formattedPrice(price) {
      return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD'
      }).format(price)
    }
  }
}
</script>

<style></style>
