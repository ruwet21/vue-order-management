<script setup>
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { orders } from "../data/order";
import StatusBadge from "../components/StatusBadge.vue";
import { formatRupiah } from "../utils/format";

const route = useRoute();

const order = computed(() => {
  return orders.find((item) => String(item.id) === String(route.params.id));
});

const total = computed(() => {
  if (!order.value) return 0;

  return order.value.items.reduce((sum, item) => {
    return sum + item.qty * item.price;
  }, 0);
});
</script>

<template>
  <section class="space-y-4">
    <RouterLink
      :to="{ name: 'orders' }"
      class="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
    >
      <span aria-hidden="true">←</span>
      Kembali ke daftar pesanan
    </RouterLink>

    <div
      v-if="order"
      class="space-y-4 rounded-2xl bg-white p-4 shadow-sm sm:p-6"
    >
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 class="text-lg font-bold text-slate-900">
          Pesanan #{{ order.id }}
        </h2>
        <StatusBadge :status="order.status" />
      </div>

      <dl class="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt class="text-slate-500">Pelanggan</dt>
          <dd class="font-medium text-slate-900">{{ order.customer }}</dd>
        </div>
        <div>
          <dt class="text-slate-500">Tanggal</dt>
          <dd class="font-medium text-slate-900">{{ order.date }}</dd>
        </div>
        <div>
          <dt class="text-slate-500">Telepon</dt>
          <dd class="font-medium text-slate-900">{{ order.phone }}</dd>
        </div>
      </dl>

      <div class="overflow-x-auto">
        <table class="w-full min-w-[480px] text-sm">
          <thead>
            <tr class="border-b border-slate-200 text-left text-slate-500">
              <th class="py-3 pr-3 font-medium">Produk</th>
              <th class="px-3 py-3 font-medium">Qty</th>
              <th class="px-3 py-3 font-medium">Harga</th>
              <th class="py-3 pl-3 text-right font-medium">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in order.items"
              :key="`${order.id}-${item.name}-${index}`"
              class="border-b border-slate-100"
            >
              <td class="py-3 pr-3 font-medium text-slate-800">
                {{ item.name }}
              </td>
              <td class="px-3 py-3">{{ item.qty }}</td>
              <td class="px-3 py-3">{{ formatRupiah(item.price) }}</td>
              <td class="py-3 pl-3 text-right font-medium">
                {{ formatRupiah(item.qty * item.price) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="flex justify-between rounded-lg bg-indigo-50 px-3 py-3 font-bold text-indigo-700"
      >
        <span>Total</span>
        <span>{{ formatRupiah(total) }}</span>
      </div>
    </div>

    <div
      v-else
      class="rounded-2xl bg-white p-6 text-center shadow-sm"
    >
      <h2 class="font-semibold text-slate-900">Pesanan tidak ditemukan</h2>
      <p class="mt-1 text-sm text-slate-500">
        Pesanan dengan nomor tersebut tidak tersedia.
      </p>
      <RouterLink
        :to="{ name: 'orders' }"
        class="mt-4 inline-block text-sm font-medium text-indigo-600 hover:underline"
      >
        Kembali ke daftar pesanan
      </RouterLink>
    </div>
  </section>
</template>
