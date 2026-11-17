<script setup>
import StatusBadge from "./StatusBadge.vue";
import { formatRupiah } from "../utils/format";

// 1. Deklarasikan prop 'order' (Object, wajib)
const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});
// 2. Deklarasikan event 'detail' yang akan dikirim ke parent
const emit = defineEmits(["detail"]);
// 3. Buat fungsi yang meng-emit event 'detail' dengan membawa id pesanan
function handleDetailClick() {
  emit("detail", props.order.id);
}
</script>

<template>
  <div
    class="flex items-center justify-between gap-3 border-b border-slate-100 py-3"
  >
    <div>
      <p class="font-semibold text-slate-900">
        <!-- 4. nama pelanggan -->{{ props.order.customer }}
      </p>
      <p class="text-xs text-slate-500">
        <!-- 5. tanggal pesanan -->{{ props.order.date }}
      </p>
    </div>

    <p class="font-semibold">
      <!-- 6. total, diformat rupiah -->{{ formatRupiah(props.order.total) }}
    </p>

    <!-- 7. Tampilkan StatusBadge, kirim status pesanan lewat prop -->
    <StatusBadge :status="props.order.status" />

    <!-- 8. Saat tombol di bawah diklik, panggil fungsi dari langkah 3 -->
    <button
      @click="handleDetailClick"
      class="rounded-lg border border-indigo-300 px-3 py-1 text-sm text-indigo-700 hover:bg-indigo-50"
    >
      Detail
    </button>
  </div>
</template>
