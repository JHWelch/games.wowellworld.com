import { VueWrapper, mount } from '@vue/test-utils'
import Game from './Game.vue'
import { it, expect, describe, beforeAll, vi } from 'vitest'
import { CheckIcon } from '@heroicons/vue/24/solid'

let wrapper: VueWrapper

const game = {
  title: 'Wordle',
  url: 'https://www.nytimes.com/games/wordle/index.html',
}

const removeGame = vi.fn()

const props = {
  edit: false,
  complete: false,
  game,
  removeGame,
}

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

    it('calls removeGame', () => {
      expect(removeGame).toHaveBeenCalled()
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
})

describe('complete disabled', () => {
  beforeAll(() => {
    wrapper = mount(Game, { props: {
      ...props,
      complete: false,
    } })
  })

  it('does not display complete icon', () => {
    expect(wrapper.findComponent(CheckIcon).exists()).toBe(false)
  })
})

describe('complete enabled', () => {
  beforeAll(() => {
    wrapper = mount(Game, { props: {
      ...props,
      complete: true,
    } })
  })

  it('displays complete icon', () => {
    expect(wrapper.findComponent(CheckIcon).exists()).toBe(true)
  })
})
