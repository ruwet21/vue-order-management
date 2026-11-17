// 1. Import fungsi pembuat router dan mode history web dari vue-router
import { createRouter, createWebHistory } from "vue-router";
import OrdersView from "../views/OrdersView.vue";
// 2. Import OrderDetailView
import OrderDetailView from "../views/OrderDetailView.vue";

const routes = [
  // 3. Route daftar pesanan
  { path: "/", name: "orders", component: OrdersView },
  // 4. Route detail (dynamic route)
  { path: "/orders/:id", name: "order-detail", component: OrderDetailView },
  // 5. Catch-all: semua URL yang tidak cocok diarahkan ke daftar.
  //    params: {} supaya param 'pathMatch' tidak ikut terbawa ke route 'orders'
  //    (kalau tidak, vue-router menampilkan warning "Discarded invalid param(s)")
  { path: "/:pathMatch(.*)*", redirect: { name: "orders", params: {} } },
];

// 6. Buat router dengan history dan routes di atas
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 7. Export router sebagai default
export default router;
