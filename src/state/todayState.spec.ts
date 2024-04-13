import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { today } from './todayState'

afterEach(() => {
  localStorage.removeItem('today')
  today.reset()
})

describe('init', () => {
  it('sets the default values', () => {
    today.init()

    expect(today.date).toBe(new Date().toDateString())
    expect(today.completed).toEqual(new Set())
  })

  describe('today has been started', () => {
    beforeEach(() => {
      localStorage.setItem('today', JSON.stringify({
        date: new Date().toDateString(),
        completed: ['Wordle'],
      }))
    })

    it('loads the saved values', () => {
      today.init()

      expect(today.date).toBe(new Date().toDateString())
      expect(today.completed).toEqual(new Set(['Wordle']))
    })
  })

  describe('has completions from yesterday', () => {
    beforeEach(async () => {
      localStorage.setItem('today', JSON.stringify({
        date: new Date(Date.now() - 86400000).toDateString(),
        completed: ['Wordle'],
      }))
    })

    it('resets the completions', () => {
      today.init()

      expect(today.date).toBe(new Date().toDateString())
      expect(today.completed).toEqual(new Set())
    })
  })
})

describe('completeGame', () => {
  beforeEach(() => {
    today.init()
  })

  it('marks the game as complete', async () => {
    today.completeGame('Wordle')

    expect(today.completed.has('Wordle')).toBe(true)
  })

  it('marks the game as complete in localStorage', () => {
    today.completeGame('Wordle')

    const localToday = JSON.parse(localStorage.getItem('today') || '{}')

    expect(localToday.completed).toContain('Wordle')
    expect(localToday.date).toBe(new Date().toDateString())
  })
})

describe('toggleCompleteGame', () => {
  beforeEach(() => {
    today.init()
  })

  it('marks the game as complete and uncomplete', async () => {
    expect(today.completed.has('Wordle')).toBe(false)

    await today.toggleCompleteGame('Wordle')

    expect(today.completed.has('Wordle')).toBe(true)

    await today.toggleCompleteGame('Wordle')

    expect(today.completed.has('Wordle')).toBe(false)
  })
})
