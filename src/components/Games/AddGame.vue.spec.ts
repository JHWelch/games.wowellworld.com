import { VueWrapper, mount } from '@vue/test-utils'
import AddGame from './AddGame.vue'
import { addGameModal } from '../../state/addGameModalState.ts'
import { it, expect, describe, beforeEach } from 'vitest'

let wrapper: VueWrapper

beforeEach(() => {
  wrapper = mount(AddGame)
})

it('has cta', () => {
  expect(wrapper.text()).toContain('Add Game')
})

describe('click add game button', () => {
  beforeEach(async () => {
    await wrapper.find('#add-game').trigger('click')
  })

  it('launches the add game modal', () => {
    expect(addGameModal.show).toBe(true)
  })
})
