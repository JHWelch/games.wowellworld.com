import { reactive } from 'vue'
import { v4 as uuid } from 'uuid'
import { Config, Game, isConfig } from '../config/config'
import { defaultConfig } from '../config/defaultConfig'

type ConfigState = Config & {
  init: () => void
  load: () => void
  save: () => void
  toConfig: () => Config
  addGame: (game: Game) => void
  removeGame: (title: string) => void
  resetGames: () => void
}

export const config: ConfigState = reactive<ConfigState>({
  init: () => {
    config.load()
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
  addGame: (game: Game) => {
    if (!game.url.startsWith('http://') && !game.url.startsWith('https://')) {
      game.url = `https://${game.url}`
    }
    const index = game.id ? config.games.findIndex(g => g.id === game.id) : -1
    if (index !== -1) {
      config.games[index] = game
    } else {
      config.games.push({
        ...game,
        id: uuid(),
      })
    }
    config.save()
  },
  resetGames: () => {
    config.games = defaultConfig.games
    config.save()
  },
  removeGame: (title: string) => {
    config.games = config.games.filter(game => game.title !== title)
    config.save()
  },
  ...defaultConfig,
})
