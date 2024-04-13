import { reactive } from 'vue'
import { Game } from '../config/config'
import { config } from './configState'

type AddGameModal = {
  show: boolean
  game: Game
  open: () => void
  close: () => void
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
  addGame: () => {
    config.addGame(addGameModal.game)
    addGameModal.game = {
      title: '',
      url: '',
    }
    addGameModal.close()
  },
})
