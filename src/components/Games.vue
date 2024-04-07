<script setup lang="ts">
const games = [
  {
    title: 'Wordle',
  },
  {
    title: 'Connections',
  },
  {
    title: 'Mini Crossword',
  },
  {
    title: 'Crossword',
  },
  {
    title: 'Cinematrix',
  },
  {
    title: 'Framed',
  },
  {
    title: 'Spotle',
  },
]
</script>

<template>
  <ul>
    <li
      v-for="game in games"
      :key="game.title"
    >
      {{ game.title }}
    </li>
  </ul>
</template>
