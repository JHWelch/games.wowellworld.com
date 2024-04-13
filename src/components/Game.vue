<script setup lang="ts">
import { Game } from '../config/config'
import { today } from '../state/todayState'
import { id } from '../utils/strings'
import { Bars3Icon, CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'

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
      :href="edit ? undefined : game.url"
      target="blank"
      class="flex items-center justify-between w-full h-full p-4 text-xl align-middle border-2 rounded-lg cursor-pointer backdrop-contrast-150"
      :class="{
        'text-purple-950 border-purple-950 line-through': complete,
        'border-purple-200': !complete,
        'hover:underline': !complete && !edit,
      }"
      @click="edit ? undefined : today.completeGame(game.title)"
    >
      <div class="flex items-center space-x-4">
        <Bars3Icon
          v-if="edit"
          class="w-6 h-6 handle"
        />

        <button
          v-else
          class="flex items-center justify-center w-6 h-6 border-2 rounded-md"
          :class="{
            'border-purple-900 bg-purple-900': complete,
            'border-purple-200 bg-purple-200': !complete,
          }"
          @click.stop.prevent="today.toggleCompleteGame(game.title)"
        >
          <CheckIcon
            v-if="complete"
            class="w-6 h-6 text-purple-200 stroke-[3px]"
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
          class="flex items-center justify-center w-6 h-6"
          @click.stop.prevent="removeGame(game.title)"
        >
          <XMarkIcon class="w-6 h-6 stroke-[2px]" />
        </button>
      </div>
    </a>
  </li>
</template>
