import { reactive, watch } from 'vue'
import { Config, isConfig } from '../config/config'
import { defaultConfig } from '../config/defaultConfig'

type ConfigState = Config & {
  init: () => void
  load: () => void
  save: () => void
  toConfig: () => Config
}

export const config: ConfigState = reactive<ConfigState>({
  init: () => {
    config.load()
    watch(config, (newConfig) => {
      localStorage.setItem('config', JSON.stringify(newConfig))
    })
  },
  load: () => {
    const localConfig = JSON.parse(localStorage.getItem('config') ?? '{}')
    if (isConfig(localConfig)) {
      Object.assign(config, localConfig)
    }
  },
  save: () => {
    localStorage.setItem('config', JSON.stringify(config.toConfig()))
  },
  toConfig: () => ({
    games: config.games,
  }),
  ...defaultConfig,
})
