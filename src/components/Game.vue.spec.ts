import { VueWrapper, mount } from '@vue/test-utils'
import Game from './Game.vue'
import { it, expect, describe, beforeAll, afterEach } from 'vitest'
import { CheckIcon } from '@heroicons/vue/24/solid'
import { today } from '../state/todayState'
import { config } from '../state/configState'
import { addGameModal } from '../state/addGameModalState'

let wrapper: VueWrapper

const game = {
  title: 'Wordle',
  url: 'https://www.nytimes.com/games/wordle/index.html',
}

const props = {
  edit: false,
  complete: false,
  game,
}

afterEach(() => {
  today.reset()
  config.resetGames()
})

it('shows all game title', () => {
  const text = mount(Game, { props }).text()

  expect(text).toContain('Wordle')
})

describe('edit enabled', () => {
  beforeAll(async () => {
    wrapper = mount(Game, { props: {
      ...props,
      edit: true,
    } })
  })

  it('displays remove icon', () => {
    expect(wrapper.find('#remove-wordle').exists()).toBe(true)
  })

  it('displays sort handle', () => {
    expect(wrapper.find('.handle').exists()).toBe(true)
  })

  describe('click remove icon on game', () => {
    beforeAll(async () => {
      await wrapper.find('#remove-wordle').trigger('click')
    })

    it('removes game from config', () => {
      expect(config.games).not.toContain(game)
    })
  })

  describe('click on game', () => {
    it('does not complete the game', () => {
      wrapper.find('a').trigger('click')

      expect(today.completed).not.toContain(game.title)
    })

    it('edits the game', () => {
      wrapper.find('a').trigger('click')

      expect(addGameModal.show).toBe(true)
      expect(addGameModal.game).toEqual(game)
    })
  })
})

describe('edit disabled', () => {
  beforeAll(() => {
    wrapper = mount(Game, { props })
  })

  it('does not display remove icon', () => {
    expect(wrapper.find('#remove-wordle').exists()).toBe(false)
  })

  it('does not display sort handles', () => {
    expect(wrapper.findAll('.handle').length).toBe(0)
  })

  describe('click on game', () => {
    it('completes the game', () => {
      wrapper.find('a').trigger('click')

      expect(today.completed).toContain(game.title)
    })
  })
})

describe('game is not completed', () => {
  beforeAll(() => {
    wrapper = mount(Game, { props })
  })

  it('does not display complete icon', () => {
    expect(wrapper.findComponent(CheckIcon).exists()).toBe(false)
  })
})

describe('game is completed', () => {
  beforeAll(() => {
    today.completeGame(game.title)
    wrapper = mount(Game, { props })
  })

  it('displays complete icon', () => {
    expect(wrapper.findComponent(CheckIcon).exists()).toBe(true)
  })
})
