import { it, expect, describe, beforeEach, afterEach } from 'vitest'
import { defaultConfig } from '../config/defaultConfig'
import { config } from './configState'

const customGames = [
  {
    'id': 'wordle',
    'title': 'Wordle',
    'url': 'https://www.nytimes.com/games/wordle/index.html',
  },
  {
    'id': 'connections',
    'title': 'Connections',
    'url': 'https://www.nytimes.com/puzzles/connections',
  },
]

afterEach(() => {
  localStorage.removeItem('config')
  config.resetGames()
})

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

describe('addGame', () => {
  describe('proper urls passed', () => {
    it('adds the games to the list', () => {
      config.init()

      config.addGame({ title: 'New Game', url: 'https://example.com/game' })
      config.addGame({ title: 'Unsecure game', url: 'http://example.com/Unsecure' })


      expect(config.games).toContainEqual({ title: 'New Game', url: 'https://example.com/game' })
      expect(config.games).toContainEqual({ title: 'Unsecure game', url: 'http://example.com/Unsecure' })
    })
  })

  describe('url missing protocol passed', () => {
    it('adds the games to the list with https:// protocol', () => {
      config.init()

      config.addGame({ title: 'New Game', url: 'example.com/game' })

      expect(config.games).toContainEqual({ title: 'New Game', url: 'https://example.com/game' })
    })
  })
})

describe('resetGames', () => {
  it('can reset the games to the default list', async () => {
    localStorage.setItem('config', JSON.stringify({
      games: customGames,
    }))
    config.init()

    config.resetGames()

    const localConfig = JSON.parse(localStorage.getItem('config') || '{}')
    expect(localConfig.games).toEqual(defaultConfig.games)
    expect(config.games).toEqual(defaultConfig.games)
  })
})
