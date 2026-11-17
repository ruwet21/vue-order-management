<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white"
        >
          🛒
        </div>
        <div>
          <h1 class="text-xl font-bold">Order Management</h1>
          <p class="text-sm text-slate-500">Kelola data pesanan pelanggan</p>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-3xl px-4 py-6">
      <!-- 1. Render halaman (view) yang sesuai dengan URL aktif -->
      <RouterView />
    </main>
  </div>
</template>
