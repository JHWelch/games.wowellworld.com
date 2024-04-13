<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { addGameModal } from '../../state/addGameModalState'
</script>

<template>
  <TransitionRoot
    as="template"
    :show="addGameModal.show"
  >
    <Dialog
      as="div"
      class="relative z-10"
      @close="addGameModal.close"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 transition-opacity bg-purple-700 bg-opacity-50 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel class="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform rounded-lg shadow-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 sm:my-8 sm:w-full sm:max-w-md sm:p-6 min-w-80">
              <div>
                <div class="text-center">
                  <DialogTitle
                    as="h3"
                    class="text-lg font-semibold leading-6 text-neutral-950"
                  >
                    {{ addGameModal.game.id ? 'Edit Game' : 'Add Game' }}
                  </DialogTitle>
                  <div
                    v-if="!addGameModal.game.id"
                    class="mt-2"
                  >
                    <p class="text-sm text-white">
                      Fill out the form below to add a new game to the list.
                    </p>
                  </div>
                </div>
              </div>

              <form class="flex flex-col mt-4 space-y-3">
                <div>
                  <label
                    for="title"
                    class="sr-only"
                  >
                    Game Title
                  </label>

                  <input
                    id="title"
                    v-model="addGameModal.game.title"
                    type="text"
                    name="title"
                    class="block w-full rounded-md border-0 py-1.5 px-3 text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Game Title"
                  >
                </div>

                <div>
                  <label
                    for="url"
                    class="sr-only"
                  >
                    Game URL
                  </label>

                  <input
                    id="url"
                    v-model="addGameModal.game.url"
                    type="text"
                    name="url"
                    class="block w-full rounded-md border-0 py-1.5 px-3 text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="https://game.url"
                  >
                </div>
              </form>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                  @click="addGameModal.addGame"
                >
                  {{ addGameModal.game.id ? 'Save' : 'Add' }}
                </button>
                <button
                  ref="cancelButtonRef"
                  type="button"
                  class="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold bg-white rounded-md shadow-sm text-neutral-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  @click="addGameModal.close"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
