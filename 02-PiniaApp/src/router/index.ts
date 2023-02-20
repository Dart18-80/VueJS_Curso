import Counter1Value from '@/counter/pages/Counter1Value.vue'
import Counter2Setup from '@/counter/pages/Counter2Setup.vue'

import ClientsLayout from '@/clients/layout/ClientsLayout.vue';

import ClientPage from '@/clients/pages/ClientPage.vue';
import ListPage from '@/clients/pages/ListPage.vue';

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'counter-1',
      component: Counter1Value
    },
    {
      path: '/counter2',
      name: 'counter-2',
      component: Counter2Setup
    },
    {
      path: '/clients',
      name: 'clients',
      component: ClientsLayout,
      redirect: { name: 'list'},
      children: [
        { path: 'list', name: 'list', component: ListPage },
        { path: '/clients/:id', name: 'client-id', component: ClientPage },
      ]
    },
  ]
})

export default router
