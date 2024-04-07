import { shallowMount } from '@vue/test-utils'
import Games from './Games.vue'
import { it, expect } from 'vitest'

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
