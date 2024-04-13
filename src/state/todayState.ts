import { reactive } from 'vue'

type TodayState = {
  date: string
  completed: Set<string>
  init: () => void
}

export const today: TodayState = reactive<TodayState>({
  init: () => {
    today.date = new Date().toDateString()
    today.completed = new Set()
  },
})
