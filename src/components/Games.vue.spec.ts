import { VueWrapper, shallowMount } from '@vue/test-utils'
import Games from './Games.vue'
import { it, expect, describe, beforeEach, beforeAll } from 'vitest'

let wrapper: VueWrapper

it('shows all game titles', () => {
  const text = shallowMount(Games, { props: { edit: false } }).text()

  expect(text).toContain('Wordle')
  expect(text).toContain('Connections')
  expect(text).toContain('Mini Crossword')
  expect(text).toContain('Crossword')
  expect(text).toContain('Cinematrix')
  expect(text).toContain('Framed')
  expect(text).toContain('Spotle')
})

describe('edit enabled', () => {
  beforeAll(async () => {
    wrapper = shallowMount(Games, { props: { edit: true } })
  })

  it('displays remove icon on each game', () => {
    expect(wrapper.find('#remove-wordle').exists()).toBe(true)
    expect(wrapper.find('#remove-connections').exists()).toBe(true)
    expect(wrapper.find('#remove-mini-crossword').exists()).toBe(true)
    expect(wrapper.find('#remove-crossword').exists()).toBe(true)
    expect(wrapper.find('#remove-cinematrix').exists()).toBe(true)
    expect(wrapper.find('#remove-framed').exists()).toBe(true)
    expect(wrapper.find('#remove-spotle').exists()).toBe(true)
  })

  it('displays sort handles', () => {
    expect(wrapper.findAll('.handle').length).toBe(7)
  })

  describe('click remove icon on game', () => {
    beforeAll(async () => {
      await wrapper.find('#remove-wordle').trigger('click')
    })

    it('removes the game from the list', async () => {
      const text = wrapper.text()
      expect(text).not.toContain('Wordle')
    })

    it('removes the item from localStorage', () => {
      const config = JSON.parse(localStorage.getItem('config') || '{}')
      expect(config.games).not.toContainEqual({ title: 'Wordle', url: 'https://www.nytimes.com/games/wordle/index.html' })
    })
  })
})

describe('edit disabled', () => {
  beforeAll(() => {
    wrapper = shallowMount(Games, { props: { edit: false } })
  })

  it('does not display remove icon on each game', () => {
    expect(wrapper.find('#remove-wordle').exists()).toBe(false)
    expect(wrapper.find('#remove-connections').exists()).toBe(false)
    expect(wrapper.find('#remove-mini-crossword').exists()).toBe(false)
    expect(wrapper.find('#remove-crossword').exists()).toBe(false)
    expect(wrapper.find('#remove-cinematrix').exists()).toBe(false)
    expect(wrapper.find('#remove-framed').exists()).toBe(false)
    expect(wrapper.find('#remove-spotle').exists()).toBe(false)
  })

  it('does not display sort handles', () => {
    expect(wrapper.findAll('.handle').length).toBe(0)
  })
})

describe('games have been customized', () => {
  beforeEach(() => {
    localStorage.setItem('config', JSON.stringify({
      games: [
        {
          'title': 'Wordle',
          'url': 'https://www.nytimes.com/games/wordle/index.html',
        },
        {
          'title': 'Connections',
          'url': 'https://www.nytimes.com/puzzles/connections',
        },
      ],
    }))
  })

  it('shows only the games that have been customized', () => {
    const text = shallowMount(Games, { props: { edit: false } }).text()

    expect(text).toContain('Wordle')
    expect(text).toContain('Connections')
    expect(text).not.toContain('Mini Crossword')
    expect(text).not.toContain('Crossword')
    expect(text).not.toContain('Cinematrix')
    expect(text).not.toContain('Framed')
    expect(text).not.toContain('Spotle')
  })
})
