import { VueWrapper, mount } from '@vue/test-utils'
import Games from './Games.vue'
import { it, expect, describe, beforeEach, beforeAll } from 'vitest'
import { defaultConfig } from '../config/defaultConfig'

let wrapper: VueWrapper

it('shows all game titles', () => {
  const text = mount(Games, { props: { edit: false } }).text()

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
    wrapper = mount(Games, { props: { edit: true } })
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

  it('displays reset button', () => {
    expect(wrapper.text()).toContain('Reset Games to Default')
  })
})

describe('edit disabled', () => {
  beforeAll(() => {
    wrapper = mount(Games, { props: { edit: false } })
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

  it('does not display reset button', () => {
    expect(wrapper.text()).not.toContain('Reset Games to Default')
  })
})

describe('removeGame', () => {
  beforeAll(async () => {
    wrapper = mount(Games, { props: { edit: true } })
    await wrapper.vm.removeGame('Wordle')
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

describe('completeGame', () => {
  beforeAll(async () => {
    wrapper = mount(Games, { props: { edit: false } })
    await wrapper.vm.completeGame('Wordle')
  })

  it('marks the game as complete', async () => {
    expect(wrapper.vm.completed.has('Wordle')).toBe(true)
  })

  it('marks the game as complete in localStorage', () => {
    const today = JSON.parse(localStorage.getItem('today') || '{}')

    expect(today.completed).toContain('Wordle')
    expect(today.date).toBe(new Date().toDateString())
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
    const text = mount(Games, { props: { edit: false } }).text()

    expect(text).toContain('Wordle')
    expect(text).toContain('Connections')
    expect(text).not.toContain('Mini Crossword')
    expect(text).not.toContain('Crossword')
    expect(text).not.toContain('Cinematrix')
    expect(text).not.toContain('Framed')
    expect(text).not.toContain('Spotle')
  })

  it('can reset the games to the default list', async () => {
    const wrapper = mount(Games, { props: { edit: true } })
    await wrapper.vm.resetGames()

    const config = JSON.parse(localStorage.getItem('config') || '{}')
    expect(config.games).toEqual(defaultConfig.games)
    expect(wrapper.vm.config.games).toEqual(defaultConfig.games)
  })
})

describe('has existing completions from today', () => {
  beforeAll(async () => {
    localStorage.setItem('today', JSON.stringify({
      date: new Date().toDateString(),
      completed: ['Wordle'],
    }))

    wrapper = mount(Games, { props: { edit: false } })
  })

  it('marks the game as complete', async () => {
    expect(wrapper.vm.completed.has('Wordle')).toBe(true)
  })
})

describe('has existing completions from yesterday', () => {
  beforeAll(async () => {
    localStorage.setItem('today', JSON.stringify({
      date: new Date(Date.now() - 86400000).toDateString(),
      completed: ['Wordle'],
    }))

    wrapper = mount(Games, { props: { edit: false } })
  })

  it('does not mark the game as complete', async () => {
    expect(wrapper.vm.completed.has('Wordle')).toBe(false)
  })
})
