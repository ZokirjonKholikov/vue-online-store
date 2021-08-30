<template>
  <main class="main">
    <div class="container">
      <div class="page">
        <div class="page__sidebar">
          <div class="box" v-show="selectedFilters.length > 0">
            <div class="box-filters">
              <div class="box-filters__header">
                <span class="box-filters__title">Filters</span>
                <a class="box-filters__clear" @click.prevent="removeAll"
                  >Clear</a
                >
              </div>
              <ul class="box-filters__ul">
                <li
                  class="box-filters__li"
                  v-for="filter in selectedFilters"
                  :key="filter"
                >
                  <button
                    class="box-filters__button"
                    @click="removeFilter(filter)"
                  ></button>
                  <span class="box-filters__name">{{ filter }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="box">
            <div class="box__row">
              <div
                class="box__header"
                :class="{ 'box--togglable': !isBrandOpen }"
                @click="isBrandOpen = !isBrandOpen"
              >
                Price
              </div>
              <div class="box__filter" v-show="isBrandOpen">
                <div class="box__content-container">
                  <div class="box__content">
                    <ul class="box__ul">
                      <li class="box__li">
                        <label class="ui-checkbox">
                          <input
                            type="checkbox"
                            class="ui-checkbox__input"
                            value="$0 - $500"
                            v-model="selectedFilters"
                            @change="setFilter(1)"
                          />
                          <span class="ui-checkbox__mark"></span>
                          $0 - $500
                        </label>
                      </li>
                      <li class="box__li">
                        <label class="ui-checkbox">
                          <input
                            type="checkbox"
                            class="ui-checkbox__input"
                            value="$500 - $800"
                            v-model="selectedFilters"
                            @change="setFilter(2)"
                          />
                          <span class="ui-checkbox__mark"></span>
                          $500 - $800
                        </label>
                      </li>
                      <li class="box__li">
                        <label class="ui-checkbox">
                          <input
                            type="checkbox"
                            class="ui-checkbox__input"
                            value="$800+"
                            v-model="selectedFilters"
                            @change="setFilter(3)"
                          />
                          <span class="ui-checkbox__mark"></span>
                          $800+
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="box">
            <div class="box__row">
              <div
                class="box__header"
                :class="{ 'box--togglable': !isColorOpen }"
                @click="isColorOpen = !isColorOpen"
              >
                Colors
              </div>
              <div class="box__filter" v-show="isColorOpen">
                <div class="box__content-container">
                  <div class="box__content">
                    <ul class="box__ul">
                      <li class="box__li">
                        <label
                          class="ui-checkbox"
                          data-fa="black"
                          data-serach="balck black"
                        >
                          <input
                            type="checkbox"
                            class="ui-checkbox__input"
                            value="black"
                            v-model="selectedFilters"
                          />
                          <span class="ui-checkbox__mark"></span>
                          Black
                          <span
                            class="filter__color"
                            style="background: rgb(0, 0, 0)"
                          ></span>
                        </label>
                      </li>
                      <li class="box__li">
                        <label
                          class="ui-checkbox"
                          data-fa="blue"
                          data-serach="blue blue"
                        >
                          <input
                            type="checkbox"
                            class="ui-checkbox__input"
                            value="blue"
                            v-model="selectedFilters"
                          />
                          <span class="ui-checkbox__mark"></span>
                          Blue
                          <span
                            class="filter__color"
                            style="background: rgb(0, 0, 255)"
                          ></span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <div class="box box--switcher">
            <label class="ui-switcher">
              <input type="checkbox" class="ui-switcher__input" />
              <span class="ui-switcher__slider">
                <span class="ui-switcher__toggle"></span>
              </span>
              Only in stock
            </label>
          </div>
        </div>
        <div class="page__content">
          <ul class="breadcrumb">
            <li class="breadcrumb__item breadcrumb__item--hide">
              <a href="" class="breadcrumb__link"
                ><span class="breadcrumb__span">Home</span></a
              >
            </li>
            <li class="breadcrumb__item">
              <a href="" class="breadcrumb__link"
                ><span class="breadcrumb__span">Products</span></a
              >
            </li>
          </ul>
          <div class="products">
            <router-link
              :to="{ name: 'Product', params: { id: item.id } }"
              v-for="item in filteredData.length !== 0
                ? filteredData
                : products"
              :key="item.id"
              class="products__item"
            >
              <div class="card">
                <div class="card__image">
                  <img :src="item.thumbnail" alt="" class="card__img" />
                </div>
                <div class="card__title">
                  {{ item.name }}
                </div>
                <div class="card__price">
                  <span class="card__total-price">{{
                    formattedPrice(item.price)
                  }}</span>
                </div>
                <span class="card__discount"
                  >%{{ Math.floor(Math.random() * 15) }}</span
                >
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Category',

  data: () => ({
    isBrandOpen: true,
    isColorOpen: true,
    selectedFilters: [],
    filteredData: []
  }),
  watch: {
    selectedFilters: {
      immediate: false,
      handler() {
        if (this.selectedFilters.length === 0) {
          this.filteredData = this.products
        }
      }
    }
  },
  computed: {
    numberOne() {
      return 1
    },
    ...mapGetters('products', ['products']),
  },

  methods: {
    removeAll() {
      this.selectedFilters = []
    },
    removeFilter(filter) {
      this.selectedFilters = this.selectedFilters.filter(
        (item) => item !== filter
      )
    },
    setFilter(value) {
      switch (value) {
        case 1:
          {
            this.filteredData = this.products.filter((item) => item.price < 500)
          }
          break
        case 2:
          {
            this.filteredData = this.products.filter(
              (item) => item.price > 500 && item.price < 800
            )
          }
          break
        case 3:
          {
            this.filteredData = this.products.filter((item) => item.price > 800)
          }
          break

        default:
          this.filteredData = this.products
          break
      }
    },
    mounted() {
      console.log(this.selectedFilters)
      this.setFilter()
    },
    formattedPrice(price) {
      return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD'
      }).format(price)
    },
    ...mapActions('products', ['getProducts'])
  },

  created() {
    this.$store.dispatch('products/getProducts', { text: 'dfjghkdfhgdrigh' })
  }
}
</script>

<style></style>
