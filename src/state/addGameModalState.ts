import { reactive } from 'vue'
import { Game } from '../config/config'
import { config } from './configState'

type AddGameModal = {
  show: boolean
  game: Game
  open: () => void
  close: () => void
  reset: () => void
  addGame: () => void
}

export const addGameModal: AddGameModal = reactive<AddGameModal>({
  show: false,
  game: {
    title: '',
    url: '',
  },
  open: () => addGameModal.show = true,
  close: () => addGameModal.show = false,
  reset: () => addGameModal.game = {
    title: '',
    url: '',
  },
  addGame: () => {
    config.addGame(addGameModal.game)
    addGameModal.reset()
    addGameModal.close()
  },
})
