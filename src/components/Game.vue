<script setup lang="ts">
import { Game } from '../config/config'
import { id } from '../utils/strings'
import { Bars3Icon, CheckIcon, XMarkIcon } from '@heroicons/vue/24/solid'

defineProps<{
  complete: boolean
  edit: boolean
  game: Game
  removeGame: (title: string) => void
}>()
</script>

<template>
  <li :key="game.title">
    <a
      :href="game.url"
      target="blank"
      class="flex justify-between w-full h-full p-4 align-middle border cursor-pointer hover:underline"
    >
      <div class="flex items-center space-x-2">
        <Bars3Icon
          v-if="edit"
          class="w-4 h-4 handle"
        />

        <div
          v-else
          class="flex items-center justify-center w-6 h-6 bg-purple-300 border-2 rounded-md"
        >
          <CheckIcon
            v-if="complete"
            class="w-6 h-6 text-purple-900"
          />
        </div>

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
