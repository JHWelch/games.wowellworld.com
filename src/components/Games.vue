<script setup lang="ts">
import { ref } from 'vue'
import { config } from '../state/configState'
import { today } from '../state/todayState'
import { useSortable } from '@vueuse/integrations/useSortable'
import Game from './Game.vue'
import AddGameButton from './AddGame/AddGameButton.vue'

defineProps<{
  edit: boolean
}>()

config.init()
today.init()

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
        :edit="edit"
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
