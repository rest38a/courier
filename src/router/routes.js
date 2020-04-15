const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/Index'),
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('pages/Order'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/order/:id',
        name: 'orderById',
        component: () => import('pages/OrderItem'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/Login'),
      },
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
