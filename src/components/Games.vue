<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { defaultConfig } from '../config/defaultConfig'
import { Config, isConfig } from '../config/config'
import { useSortable } from '@vueuse/integrations/useSortable'
import Game from './Game.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'

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

const resetGames = () => {
  config.games = defaultConfig.games
}

const today = JSON.parse(localStorage.getItem('today') ?? '{}')

const completed = reactive(
  today.date === new Date().toDateString()
    ? new Set(today.completed)
    : new Set<string>(),
)
const completeGame = (title: string) => {
  completed.add(title)
}
const toggleCompleteGame = (title: string) => {
  if (completed.has(title)) {
    completed.delete(title)
  } else {
    completed.add(title)
  }
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
  <div class="flex flex-col flex-grow w-full max-w-sm p-4 space-y-10 text-white">
    <ul
      ref="gamesList"
      class="flex flex-col flex-grow w-full space-y-5"
    >
      <Game
        v-for="game in config.games"
        :key="game.title"
        :game="game"
        :complete="completed.has(game.title)"
        :edit="edit"
        :remove-game="removeGame"
        :complete-game="completeGame"
        :toggle-complete-game="toggleCompleteGame"
      />

      <button
        v-if="edit"
        class="flex items-center justify-center w-full h-full p-4 space-x-2 text-xl align-middle border-2 border-dashed rounded-lg cursor-pointer backdrop-contrast-75"
      >
        <PlusIcon class="w-6 h-6 stroke-[3px]" />

        <span>Add Game</span>
      </button>
    </ul>

    <button
      v-if="edit"
      class="w-full p-2 text-white bg-red-500 rounded-md"
      @click="resetGames"
    >
      Reset Games to Default
    </button>
  </div>
</template>
