import { reactive } from 'vue'

type TodayState = {
  date: string
  completed: Set<string>
  init: () => void
  save: () => void
  reset: () => void
  completeGame: (title: string) => void
  toggleCompleteGame: (title: string) => void
}

export const today: TodayState = reactive<TodayState>({
  date: new Date().toDateString(),
  completed: new Set(),
  init: () => {
    const localToday = JSON.parse(localStorage.getItem('today') ?? '{}')

    if (localToday.date === new Date().toDateString()) {
      today.date = localToday.date
      today.completed = new Set(localToday.completed)
    }
  },
  save: () => {
    localStorage.setItem('today', JSON.stringify({
      date: new Date().toDateString(),
      completed: Array.from(today.completed),
    }))
  },
  reset: () => {
    today.completed.clear()
    today.save()
  },
  completeGame: (title: string) => {
    today.completed.add(title)
    today.save()
  },
  toggleCompleteGame: (title: string) => {
    if (today.completed.has(title)) {
      today.completed.delete(title)
    } else {
      today.completed.add(title)
    }
    today.save()
  },
})
