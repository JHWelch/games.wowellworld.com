<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { defaultConfig } from '../config/defaultConfig'
import { Config, isConfig } from '../config/config'
import { useSortable } from '@vueuse/integrations/useSortable'
import Game from './Game.vue'

defineProps<{
  edit: boolean
}>()

const localConfig = JSON.parse(localStorage.getItem('config') ?? '{}')
const config = reactive<Config>(isConfig(localConfig) ? localConfig : defaultConfig)
watch(config, (newConfig) => {
  localStorage.setItem('config', JSON.stringify(newConfig))
})

const removeGame = (title: string) => {
  config.games = config.games.filter(game => game.title !== title)
}

const completed = reactive(new Set<string>())
const completeGame = (title: string) => {
  completed.add(title)
}
watch(completed, (newCompleted) => {
  localStorage.setItem('today', JSON.stringify({
    date: new Date().toDateString(),
    completed: Array.from(newCompleted),
  }))
})

const gamesList = ref<HTMLElement | null>(null)
useSortable(gamesList, config.games, {
  handle: '.handle',
})
</script>

<template>
  <ul
    ref="gamesList"
    class="flex flex-col flex-grow w-full max-w-sm p-4 space-y-4 text-white"
  >
    <Game
      v-for="game in config.games"
      :key="game.title"
      :game="game"
      :complete="completed.has(game.title)"
      :edit="edit"
      :remove-game="removeGame"
      :complete-game="completeGame"
    />
  </ul>
</template>
