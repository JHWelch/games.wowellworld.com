import { reactive } from 'vue'
import { Game } from '../config/config'
import { config } from './configState'

type AddGameModal = {
  show: boolean
  game: Game
  open: (game?: Game) => void
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
  open: (game: Game|undefined = undefined) => {
    if (game) {
      addGameModal.game = { ...game }
    } else {
      addGameModal.reset()
    }

    addGameModal.show = true
  },
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
