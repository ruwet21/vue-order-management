<script setup>
import { computed } from "vue";
// 1. Import fungsi untuk mengambil route aktif dari vue-router
import { useRoute, RouterLink } from "vue-router";
import { orders } from "../data/orders";
import StatusBadge from "../components/StatusBadge.vue";
import { formatRupiah } from "../utils/format";

// 2. Ambil route aktif
const route = useRoute();

// 3. Computed 'order': cari pesanan yang id-nya sama dengan param id di URL.
//    Param URL selalu string, sedangkan id di orders.js berupa number,
//    jadi param diubah dulu ke Number sebelum dibandingkan.
const order = computed(() =>
  orders.find((item) => item.id === Number(route.params.id)),
);

// 4. Computed 'total': jumlahkan qty * price semua item.
//    Kembalikan 0 jika order tidak ditemukan
const total = computed(() => {
  if (!order.value) return 0;
  return order.value.items.reduce((sum, item) => sum + item.qty * item.price, 0);
});
</script>

<template>
  <section class="space-y-4">
    <!-- 5. Link kembali ke halaman daftar, tujuan berdasarkan NAMA route 'orders' -->
    <RouterLink
      :to="{ name: 'orders' }"
      class="inline-block text-sm text-indigo-700 hover:underline"
    >
      &larr; Kembali ke daftar
    </RouterLink>

    <!-- 6. Jika order ada tampilkan kartu detail di bawah; jika tidak,
            tampilkan teks "Pesanan tidak ditemukan" -->
    <div
      v-if="order"
      class="space-y-4 rounded-2xl bg-white p-4 shadow-sm"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold">Pesanan #{{ order.id }}</h2>
        <StatusBadge :status="order.status" />
      </div>

      <dl class="space-y-1 text-sm">
        <div class="flex gap-2">
          <dt class="w-24 text-slate-500">Pelanggan</dt>
          <dd>{{ order.customer }}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="w-24 text-slate-500">Tanggal</dt>
          <dd>{{ order.date }}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="w-24 text-slate-500">Telepon</dt>
          <dd>{{ order.phone }}</dd>
        </div>
      </dl>

      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-slate-500">
            <th>Produk</th>
            <th>Qty</th>
            <th>Harga</th>
            <th class="text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <!-- Nama produk tidak dijamin unik, jadi key memakai kombinasi nama + index -->
          <tr
            v-for="(item, index) in order.items"
            :key="`${item.name}-${index}`"
            class="border-t border-slate-100"
          >
            <td class="py-2">{{ item.name }}</td>
            <td>{{ item.qty }}</td>
            <td>{{ formatRupiah(item.price) }}</td>
            <td class="text-right">{{ formatRupiah(item.qty * item.price) }}</td>
          </tr>
        </tbody>
      </table>

      <div
        class="flex justify-between rounded-lg bg-indigo-50 px-3 py-2 font-bold text-indigo-700"
      >
        <span>Total</span>
        <span>{{ formatRupiah(total) }}</span>
      </div>
    </div>

    <p v-else class="rounded-2xl bg-white p-4 text-center text-slate-500 shadow-sm">
      Pesanan tidak ditemukan
    </p>
  </section>
</template>
