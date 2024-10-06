import { VueWrapper, mount } from '@vue/test-utils'
import AddGameModal from './AddGameModal.vue'
import { it, expect, beforeEach, describe, vi } from 'vitest'
import { addGameModal } from '../../state/addGameModalState.ts'

let wrapper: VueWrapper

beforeEach(() => {
  const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))

  vi.stubGlobal('ResizeObserver', ResizeObserverMock)
  wrapper = mount(AddGameModal)
})

it('does not display the modal by default', () => {
  expect(wrapper.text()).not.toContain('Game Title')
  expect(wrapper.text()).not.toContain('Game URL')
  expect(wrapper.text()).not.toContain('Add Game')
})

describe('modal open', () => {
  beforeEach(async () => {
    addGameModal.open()
  })

  it.skip('displays the modal', () => {
    expect(wrapper.text()).toContain('Game Title')
    expect(wrapper.text()).toContain('Game URL')
    expect(wrapper.text()).toContain('Add Game')
  })
})
