import { shallowMount } from '@vue/test-utils'
import HelloWorld from './HelloWorld.vue'
import { it, expect } from 'vitest'

it('should shows default component', () => {
  const wrapper = shallowMount(HelloWorld)
  expect(wrapper.text())
    .toContain('Click on the Vite and Vue logos to learn more')
})
