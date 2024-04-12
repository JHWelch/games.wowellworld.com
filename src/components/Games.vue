<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { config } from '../state/configState'
import { useSortable } from '@vueuse/integrations/useSortable'
import Game from './Game.vue'
import AddGameButton from './AddGame/AddGameButton.vue'

defineProps<{
  edit: boolean
}>()

config.init()

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
        :remove-game="config.removeGame"
        :complete-game="completeGame"
        :toggle-complete-game="toggleCompleteGame"
      />

      <AddGameButton v-if="edit" />
    </ul>

    <button
      v-if="edit"
      id="reset-games"
      class="w-full p-2 text-white bg-red-500 rounded-md"
      @click="config.resetGames"
    >
      Reset Games to Default
    </button>
  </div>
</template>
