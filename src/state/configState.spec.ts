import { it, expect, describe, beforeEach } from 'vitest'
import { defaultConfig } from '../config/defaultConfig'
import { config } from './configState'

const customGames = [
  {
    'title': 'Wordle',
    'url': 'https://www.nytimes.com/games/wordle/index.html',
  },
  {
    'title': 'Connections',
    'url': 'https://www.nytimes.com/puzzles/connections',
  },
]

describe('init', () => {
  it('loads the default config', () => {
    config.init()

    expect(config.games).toEqual(defaultConfig.games)
  })

  describe('games have been customized', () => {
    beforeEach(() => {
      localStorage.setItem('config', JSON.stringify({
        games: customGames,
      }))
    })

    it('loads the customized games', () => {
      config.init()

      expect(config.games).toEqual(customGames)
    })
  })
})
