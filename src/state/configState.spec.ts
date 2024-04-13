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

describe('removeGame', () => {
  beforeEach(() => {
    config.init()

    config.removeGame('Wordle')
  })

  it('removes the game from the list', () => {
    expect(config.games).not.toContainEqual({ title: 'Wordle', url: 'https://www.nytimes.com/games/wordle/index.html' })
  })

  it('removes the item from localStorage', () => {
    config.removeGame('Wordle')
    const localConfig = JSON.parse(localStorage.getItem('config') || '{}')

    expect(localConfig.games).not.toContainEqual({ title: 'Wordle', url: 'https://www.nytimes.com/games/wordle/index.html' })
  })
})
