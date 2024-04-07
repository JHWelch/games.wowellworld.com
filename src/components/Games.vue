<script setup lang="ts">
import { games } from '../config/defaultConfig'
</script>

<template>
  <ul class="flex flex-col flex-grow max-w-sm p-4 space-y-4 text-white">
    <li
      v-for="game in games"
      :key="game.title"
    >
      <a
        :href="game.url"
        target="blank"
        class="flex w-full h-full p-4 align-middle border cursor-pointer hover:underline"
      >
        {{ game.title }}
      </a>
    </li>
  </ul>
</template>
