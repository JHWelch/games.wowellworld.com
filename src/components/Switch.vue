<script setup lang="ts">
import { Switch } from '@headlessui/vue'
import { ref } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()
defineEmits(['update:modelValue'])

const enabled = ref(props.modelValue)
</script>

<template>
  <Switch
    v-model="enabled"
    :class="[enabled ? 'bg-purple-400' : 'bg-neutral-500', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2']"
    @click="$emit('update:modelValue', !enabled)"
  >
    <span class="sr-only">Use setting</span>

    <span
      aria-hidden="true"
      :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-neutral-900 shadow ring-0 transition duration-200 ease-in-out']"
    />
  </Switch>
</template>
