// all posible routes and if each route requires authentication
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '',
        props: true,
        name: 'index',
        meta: {
          requiresAuth: true
        },
        component: () => import('pages/Index.vue') },
      { path: '/review',
        meta: {
          requiresAuth: true
        },
        component: () => import('pages/Review.vue') },
      { path: '/detail',
        name: 'detail',
        props: true,
        meta: {
          requiresAuth: true
        },
        component: () => import('pages/Detail.vue') },
      { path: '/profile',
        meta: {
          requiresAuth: true
        },
        component: () => import('pages/Profile.vue') }

    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: '/register', component: () => import('pages/Register.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
