import { VueWrapper, mount } from '@vue/test-utils'
import Games from './Games.vue'
import { it, expect, describe, beforeEach } from 'vitest'

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
  beforeEach(async () => {
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

  it('shows the add game button', () => {
    expect(wrapper.text()).toContain('Add Game')
  })
})

describe('edit disabled', () => {
  beforeEach(() => {
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

describe('games have been customized', () => {
  beforeEach(() => {
    localStorage.setItem('config', JSON.stringify({
      games: [
        {
          id: 'wordle',
          title: 'Wordle',
          url: 'https://www.nytimes.com/games/wordle/index.html',
        },
        {
          id: 'connections',
          title: 'Connections',
          url: 'https://www.nytimes.com/puzzles/connections',
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
    await wrapper.find('#reset-games').trigger('click')

    expect(wrapper.text()).toContain('Wordle')
    expect(wrapper.text()).toContain('Connections')
    expect(wrapper.text()).toContain('Mini Crossword')
    expect(wrapper.text()).toContain('Crossword')
    expect(wrapper.text()).toContain('Cinematrix')
    expect(wrapper.text()).toContain('Framed')
    expect(wrapper.text()).toContain('Spotle')
  })
})
