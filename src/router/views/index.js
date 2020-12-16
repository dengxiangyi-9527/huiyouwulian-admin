import Layout from '@/page/index/'

export default [{
  path: '/info',
  component: Layout,
  redirect: '/info/index',
  children: [{
    path: 'index',
    name: '个人信息',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/views/admin/user/info')
  }]
}, {
  path: '/activti',
  component: Layout,
  redirect: '/activti/detail',
  children: [{
    path: 'detail/:id',
    component: () =>
      import(/* webpackChunkName: "views" */ '@/views/activiti/detail')
  }]
}
  , {
  path: '/mall',
  component: Layout,
  redirect: '/goods/create',
  children: [{
    path: 'create',
    name: '添加商品',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/mall/goods/create')
  }, {
    path: 'edit',
    name: '修改商品',
    component: () => import(/* webpackChunkName: "views" */ '@/views/mall/goods/edit'),
    meta: { title: '修改商品', icon: 'product-add' },
    hidden: true
  }
  ]
},
{
  path: '/combo',
  component: Layout,
  redirect: '/combo/create',
  children: [{
    path: 'create',
    name: '套餐商品添加',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/mall/combo/create')
  }, {
    path: 'edit',
    name: '套餐商品修改',
    component: () => import(/* webpackChunkName: "views" */ '@/views/mall/combo/edit'),
    meta: { title: '套餐商品修改', icon: 'product-add' },
    hidden: true
  }
  ]
},
  {
    path: '/goodsgive',
    component: Layout,
    redirect: '/goodsgive/create',
    children: [{
      path: 'create',
      name: '体验水商品添加',
      component: () =>
        import( /* webpackChunkName: "views" */ '@/views/mall/goodsgive/create')
    }, {
      path: 'edit',
      name: '体验水商品修改',
      component: () => import(/* webpackChunkName: "views" */ '@/views/mall/goodsgive/edit'),
      meta: { title: '体验水商品修改', icon: 'product-add' },
      hidden: true
    }
    ]
  }
]
