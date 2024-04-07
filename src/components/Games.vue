<script setup lang="ts">
import { reactive, watch } from 'vue'
import { defaultConfig } from '../config/defaultConfig'
import { Config, isConfig } from '../config/config'
import { id } from '../utils/strings'
import { XMarkIcon } from '@heroicons/vue/24/solid'

const localConfig = JSON.parse(localStorage.getItem('config') ?? '{}')
const config = reactive<Config>(isConfig(localConfig) ? localConfig : defaultConfig)

watch(config, (newConfig) => {
  localStorage.setItem('config', JSON.stringify(newConfig))
})

const removeGame = (title: string) => {
  config.games = config.games.filter(game => game.title !== title)
}
</script>

<template>
  <ul class="flex flex-col flex-grow max-w-sm p-4 space-y-4 text-white">
    <li
      v-for="game in config.games"
      :key="game.title"
    >
      <a
        :href="game.url"
        target="blank"
        class="flex justify-between w-full h-full p-4 align-middle border cursor-pointer hover:underline"
      >
        <span>
          {{ game.title }}
        </span>

        <button
          :id="'remove-' + id(game.title)"
          @click.stop.prevent="removeGame(game.title)"
        >
          <XMarkIcon class="w-4 h-4" />
        </button>
      </a>
    </li>
  </ul>
</template>
