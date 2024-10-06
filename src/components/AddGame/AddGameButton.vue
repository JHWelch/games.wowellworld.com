<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline'
import { addGameModal } from '../../state/addGameModalState'
</script>

<template>
  <button
    id="add-game"
    class="flex items-center justify-center w-full h-full p-4 space-x-2 text-xl align-middle border-2 border-dashed rounded-lg cursor-pointer backdrop-contrast-75"
    @click="() => addGameModal.open()"
  >
    <PlusIcon class="w-6 h-6 stroke-[3px]" />

    <span>Add Game</span>
  </button>
</template>
