export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/About.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('../pages/Category.vue')
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../pages/Product.vue')
  },
]