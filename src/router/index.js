import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
//Layouts
import Layout from '../layouts/Layout.vue'
import UserLayout from '../layouts/UserLayout.vue'
//Vistas
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import CartView from '../views/CartView.vue'
import GameDetailsView from '../views/GameDetailsView.vue'
import KeyDetailsView from '../views/KeyDetailsView.vue'
import SalesView from '../views/SalesView.vue'
import ProfileView from '../views/ProfileView.vue'
import CatalogView from '../views/CatalogView.vue'
import PurchaseView from '@/views/PurchaseView.vue'

import SellerView from '../views/SellerView.vue'
import KeySellerView from '../views/KeySellerView.vue'

import AdminView from '../views/admin/AdminView.vue'
import AdminLogin from '../views/admin/LoginView.vue'
import AdminGamesView from '../views/admin/GamesView.vue'
import AdminGenresView from '../views/admin/GenresView.vue'
import AdminUsersView from '../views/admin/UsersView.vue'
import AdminManagementView from '../views/admin/ManagementView.vue'


const routes = [
  {
    path: '/',
    component: Layout, 
    children: [
      { path: '', name: 'home', component: HomeView },
      { path: 'game/:id', name: 'gameDetails', component: GameDetailsView },
      { path: 'key/:id', name: 'keyDetails', component: KeyDetailsView },
      { path: 'cart', name: 'cart', component: CartView },
      { path: 'sales', name: 'sales', component: SalesView},
      { path: 'catalog', name: 'catalog', component: CatalogView},
      { path: '/purchase', name: 'purchaseCart', component: PurchaseView },
      { path: '/purchase/:id', name: 'purchaseSingle', component: PurchaseView },

    ],
  },
  {
    path: '/',
    component: UserLayout, 
    children: [
      { path: 'login', name: 'login', component: LoginView },
      { path: 'signup', name: 'signup', component: SignUpView },
      { path: 'profile/:id', name: 'profile', component: ProfileView },
      { path: 'dashboard', name: 'dashboard', component: SellerView },
      { path: 'dashboard/sell', name: 'sell', component: KeySellerView },
    ],
  },
  {
    path: '/admin/',
    component: UserLayout, 
    children: [
      { path: '', name: 'admin', component: AdminView },
      { path: 'login', name: 'adminlogin', component: AdminLogin },
      
      { path: 'games', name: 'admingames', component: AdminGamesView },
      { path: 'genres', name: 'admingenres', component: AdminGenresView },
      { path: 'users', name: 'adminusers', component: AdminUsersView },
      { path: 'management', name: 'adminmanagement', component: AdminManagementView },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFoundView }, 
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const protectedRoutes = ['cart', 'admin', 'profile', 'purchase/:id']

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (!auth.isLoggedIn && protectedRoutes.includes(to.name)) {
    next({ name: 'login' })

  } else if (auth.isLoggedIn && to.name === 'login') {
    next({ name: 'home' })

  } else {
    next()
  }
})


export default router
