<script setup lang="ts">
const games = [
  {
    title: 'Wordle',
    url: 'https://www.nytimes.com/games/wordle/index.html',
  },
  {
    title: 'Connections',
    url: 'https://www.nytimes.com/games/connections',
  },
  {
    title: 'Mini Crossword',
    url: 'https://www.nytimes.com/crosswords/game/mini',
  },
  {
    title: 'Crossword',
    url: 'https://www.nytimes.com/crosswords',
  },
  {
    title: 'Cinematrix',
    url: 'https://www.vulture.com/article/daily-movie-grid-trivia-game-cinematrix.html',
  },
  {
    title: 'Framed',
    url: 'https://framed.wtf/',
  },
  {
    title: 'Spotle',
    url: 'https://spotle.io/',
  },
]
</script>

<template>
  <ul>
    <li
      v-for="game in games"
      :key="game.title"
    >
      <a
        :href="game.url"
        target="blank"
      >
        {{ game.title }}
      </a>
    </li>
  </ul>
</template>
