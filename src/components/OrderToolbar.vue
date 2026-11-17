<script setup>
// 1. Deklarasikan prop 'search' (String) dan 'status' (String)
const props = defineProps({
  search: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
// 2. Deklarasikan tiga event: 'update:search', 'update:status', 'add'
const emit = defineEmits(["update:search", "update:status", "add"]);
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <!-- 3. Input teks (placeholder "Cari nama pelanggan..."):
            nilai tampil dari prop search; setiap diketik, emit 'update:search' dengan teks terbaru -->
    <input
      :value="props.search"
      @input="emit('update:search', $event.target.value)"
      placeholder="Cari nama pelanggan..."
      aria-label="Cari nama pelanggan"
      class="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
    />

    <!-- 4. Select dengan opsi: Semua, Selesai, Diproses, Dibatalkan.
            nilai tampil dari prop status; saat berubah, emit 'update:status' -->
    <select
      :value="props.status"
      @change="emit('update:status', $event.target.value)"
      aria-label="Filter status pesanan"
      class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
    >
      <option value="Semua">Semua</option>
      <option value="Selesai">Selesai</option>
      <option value="Diproses">Diproses</option>
      <option value="Dibatalkan">Dibatalkan</option>
    </select>

    <!-- 5. Saat tombol diklik, emit event 'add' (tanpa data) -->
    <button
      @click="emit('add')"
      class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
    >
      + Tambah Pesanan
    </button>
  </div>
</template>
