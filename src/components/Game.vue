<script setup lang="ts">
import { Game } from '../config/config'
import { id } from '../utils/strings'
import { Bars3Icon, CheckIcon, XMarkIcon } from '@heroicons/vue/24/solid'

defineProps<{
  complete: boolean
  edit: boolean
  game: Game
  removeGame: (title: string) => void
  completeGame: (title: string) => void
}>()
</script>

<template>
  <li :key="game.title">
    <a
      :href="game.url"
      target="blank"
      class="flex justify-between w-full h-full p-4 align-middle border cursor-pointer hover:underline"
      @click="completeGame(game.title)"
    >
      <div class="flex items-center space-x-2">
        <Bars3Icon
          v-if="edit"
          class="w-4 h-4 handle"
        />

        <button
          v-else
          class="flex items-center justify-center w-6 h-6 bg-purple-300 border-2 rounded-md"
          @click.stop.prevent="completeGame(game.title)"
        >
          <CheckIcon
            v-if="complete"
            class="w-6 h-6 text-purple-900"
          />
        </button>

        <span>
          {{ game.title }}
        </span>
      </div>

      <div>
        <button
          v-if="edit"
          :id="'remove-' + id(game.title)"
          @click.stop.prevent="removeGame(game.title)"
        >
          <XMarkIcon class="w-4 h-4" />
        </button>
      </div>
    </a>
  </li>
</template>
