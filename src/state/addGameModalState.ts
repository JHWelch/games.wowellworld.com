import { reactive } from 'vue'

type AddGameModal = {
  show: boolean
  open: () => void
  close: () => void
}

export const addGameModal: AddGameModal = reactive<AddGameModal>({
  show: false,
  open: () => addGameModal.show = true,
  close: () => addGameModal.show = false,
})
