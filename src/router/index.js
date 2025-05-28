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
import AdminGamesView from '../views/admin/GamesView.vue'
import AdminGenresView from '../views/admin/GenresView.vue'
import AdminUsersView from '../views/admin/UsersView.vue'
import AdminManagementView from '../views/admin/ManagementView.vue'
import OrderView from '@/views/OrderView.vue'


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
      { path: 'catalog', name: 'catalog', component: CatalogView, props: (route) => ({ query: route.query.q })}, //aqui iria la ruta con el query
      { path: 'purchase', name: 'purchaseCart', component: PurchaseView },
      { path: 'purchase/:id', name: 'purchaseSingle', component: PurchaseView },
      { path: 'orders', name: 'orders', component: OrderView },

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

const roleRoutes = {
  admin: ['admin', 'admingames', 'admingenres', 'adminusers', 'adminmanagement'],
  seller: ['dashboard', 'sell'],
  user: ['profile', 'cart', 'purchaseCart', 'purchaseSingle', 'orders']
}

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  // Si no está logueado y la ruta es protegida
  if (!auth.isLoggedIn && (roleRoutes.admin.includes(to.name) || 
                          roleRoutes.seller.includes(to.name) || 
                          roleRoutes.user.includes(to.name))) {
    next({ name: 'login' })
    return
  }

  // Si está logueado pero intenta ir a login/signup
  if (auth.isLoggedIn && (to.name === 'login' || to.name === 'signup')) {
    next({ name: 'home' })
    return
  }

  // Verificación de roles
  if (auth.isLoggedIn) {
    // Admin solo puede acceder a rutas de admin
    if (auth.userRole === 'admin' && !to.path.startsWith('/admin')) {
      next({ name: 'admin' })
      return
    }

    // Seller no puede acceder a rutas de admin
    if (auth.userRole === 'seller' && roleRoutes.admin.includes(to.name)) {
      next({ name: 'home' })
      return
    }

    // User no puede acceder a rutas de admin ni seller
    if (auth.userRole === 'user' && 
        (roleRoutes.admin.includes(to.name) || roleRoutes.seller.includes(to.name))) {
      next({ name: 'home' })
      return
    }
  }

  next()
})


export default router
