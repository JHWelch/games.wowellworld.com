import { beforeEach, describe, expect, it } from 'vitest'
import { addGameModal } from './addGameModalState'
import { config } from './configState'

const game = {
  title: 'Test Game',
  url: 'test-game.com',
}

describe('open', () => {
  it('sets show to true', () => {
    addGameModal.open()

    expect(addGameModal.show).toBe(true)
  })
})

describe('close', () => {
  it('sets show to false', () => {
    addGameModal.close()

    expect(addGameModal.show).toBe(false)
  })
})

describe('addGame', () => {
  beforeEach(() => {
    addGameModal.game = game
  })

  it('saves the game to the config', () => {
    addGameModal.addGame()

    expect(config.games).toContainEqual(game)
  })

  it('resets the game', () => {
    addGameModal.addGame()

    expect(addGameModal.game).toEqual({
      title: '',
      url: '',
    })
  })

  it('closes the modal', () => {
    addGameModal.addGame()

    expect(addGameModal.show).toBe(false)
  })
})

describe('reset', () => {
  it('resets the game', () => {
    addGameModal.game = game

    addGameModal.reset()

    expect(addGameModal.game).toEqual({
      title: '',
      url: '',
    })
  })
})
