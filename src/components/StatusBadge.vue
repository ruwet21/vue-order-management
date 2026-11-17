<script setup>
import { computed } from "vue";

// 1. Deklarasikan prop 'status' (String, wajib)
const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});
// 2. Buat computed 'badgeClass' yang mengembalikan class warna sesuai status:
//    Selesai -> hijau, Diproses -> kuning/amber, Dibatalkan -> merah
//    (pakai pasangan bg-*-100 dan text-*-700)
const badgeClass = computed(() => {
  if (props.status === "Selesai") return "bg-green-100 text-green-700";
  if (props.status === "Diproses") return "bg-amber-100 text-amber-700";
  if (props.status === "Dibatalkan") return "bg-red-100 text-red-700";
  return "bg-slate-100 text-slate-700";
});
</script>

<template>
  <!-- 3. Render <span> berbentuk pill (rounded-full px-3 py-1 text-xs font-semibold)
          dengan class dinamis dari badgeClass, isinya teks status -->
  <span
    :class="badgeClass"
    class="rounded-full px-3 py-1 text-xs font-semibold"
  >
    {{ props.status }}
  </span>
</template>
