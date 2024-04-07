import { describe, expect, it } from 'vitest'
import { id, kebab } from './strings'

describe('kebab', () => {
  it('converts a string to kebab case', () => {
    expect(kebab('Hello World')).toBe('hello-world')
  })
})

describe('id', () => {
  it('converts a string to kebab case and removes illegal characters', () => {
    expect(id('Hello World!')).toBe('hello-world')
  })
})
