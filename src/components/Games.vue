<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { defaultConfig } from '../config/defaultConfig'
import { Config, isConfig } from '../config/config'
import { id } from '../utils/strings'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/solid'
import { useSortable } from '@vueuse/integrations/useSortable'

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
    <li
      v-for="game in config.games"
      :key="game.title"
    >
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
  </ul>
</template>
