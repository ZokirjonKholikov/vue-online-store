import axios from 'axios'
import { SET_PRODUCTS_MUTATIONS } from './types'

export default {
  async getProducts(context, { text }) {
    

    const { data } = await axios.get('https://jsonplaceholder.typicode.com/albums/1/photos')
    console.log(data)
    const newData = data.map(item => ({
      id: item.id,
      name: item.title.split(" ")[0],
      img: item.url,
      price: Math.floor((Math.random() * 1000)),
      thumbnail: item.thumbnailUrl
    }));
    console.log(newData)
    context.commit(SET_PRODUCTS_MUTATIONS, newData)
    context.dispatch('log', text)
  },
  log(ctx, payload) {
    console.log(payload)
  }
}