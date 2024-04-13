import { describe, expect, it } from 'vitest'
import { today } from './todayState'

describe('init', () => {
  it('sets the default values', () => {
    today.init()

    expect(today.date).toBe(new Date().toDateString())
    expect(today.completed).toEqual(new Set())
  })
})
