import { describe, expect, it } from 'vitest'
import { addGameModal } from './addGameModalState'

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
