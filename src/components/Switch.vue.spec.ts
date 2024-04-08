import Switch from './Switch.vue'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'

it('toggles the switch when clicked', () => {
  let model = false
  const wrapper = mount(Switch, {
    props: {
      modelValue: false,
      'onUpdate:modelValue': (e) => model = e,
    },
  })
  const input = wrapper.find('.translate-x-0')

  input.trigger('click')

  expect(model).toBe(true)

  input.trigger('click')

  expect(model).toBe(false)
})
