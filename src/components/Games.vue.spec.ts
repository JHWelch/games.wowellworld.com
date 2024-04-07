import { shallowMount } from '@vue/test-utils'
import Games from './Games.vue'
import { it, expect, describe, beforeEach } from 'vitest'

it('shows all game titles', () => {
  const text = shallowMount(Games).text()

  expect(text).toContain('Wordle')
  expect(text).toContain('Connections')
  expect(text).toContain('Mini Crossword')
  expect(text).toContain('Crossword')
  expect(text).toContain('Cinematrix')
  expect(text).toContain('Framed')
  expect(text).toContain('Spotle')
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
    const text = shallowMount(Games).text()

    expect(text).toContain('Wordle')
    expect(text).toContain('Connections')
    expect(text).not.toContain('Mini Crossword')
    expect(text).not.toContain('Crossword')
    expect(text).not.toContain('Cinematrix')
    expect(text).not.toContain('Framed')
    expect(text).not.toContain('Spotle')
  })
})
