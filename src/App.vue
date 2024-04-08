<script setup lang="ts">
import { ref } from 'vue'
import Games from './components/Games.vue'
import Switch from './components/Switch.vue'

const enabled = ref(false)
</script>

<template>
  <div class="flex flex-col items-center min-h-screen bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
    <div class="flex items-center justify-center w-full h-full p-2 bg-neutral-900">
      <div class="flex justify-end w-full max-w-xl space-x-2 text-purple-300">
        <span>Edit</span>

        <Switch v-model="enabled" />
      </div>
    </div>

    <Games />
  </div>
</template>
