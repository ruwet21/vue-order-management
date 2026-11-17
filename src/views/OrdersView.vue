<script setup>
import { ref, computed } from "vue";
// 1. Import fungsi untuk mengambil instance router dari vue-router
import { useRouter } from "vue-router";
import { orders } from "../data/orders";
import OrderToolbar from "../components/OrderToolbar.vue";
import OrderRow from "../components/OrderRow.vue";

// 2. State: 'search' dan 'statusFilter'
const search = ref("");
const statusFilter = ref("Semua");

// 3. Computed 'filteredOrders': lolos jika nama cocok DAN status cocok
const filteredOrders = computed(() => {
  return orders.filter((order) => {
    const cocokNama = order.customer
      .toLowerCase()
      .includes(search.value.toLowerCase());
    const cocokStatus =
      order.status === statusFilter.value || statusFilter.value === "Semua";

    return cocokNama && cocokStatus;
  });
});

// 4. Ambil instance router
const router = useRouter();

// 5. Fungsi 'goToDetail(id)': navigasi pakai nama route
function goToDetail(id) {
  router.push({ name: "order-detail", params: { id } });
}

// 6. Fungsi 'handleAdd'
function handleAdd() {
  alert("Fitur tambah pesanan belum tersedia");
}
</script>

<template>
  <section class="space-y-4 rounded-2xl bg-white p-4 shadow-sm">
    <!-- 7. OrderToolbar: prop turun, event naik, tangkap 'add' -->
    <OrderToolbar
      :search="search"
      :status="statusFilter"
      @update:search="search = $event"
      @update:status="statusFilter = $event"
      @add="handleAdd"
    />

    <div>
      <!-- 8. v-for atas filteredOrders, key unik, prop order, tangkap 'detail' -->
      <OrderRow
        v-for="item in filteredOrders"
        :key="item.id"
        :order="item"
        @detail="goToDetail"
      />

      <!-- 9. Teks kalau hasil filter kosong -->
      <p v-if="filteredOrders.length === 0" class="text-center text-slate-500">
        Pesanan tidak ditemukan
      </p>
    </div>
  </section>
</template>
