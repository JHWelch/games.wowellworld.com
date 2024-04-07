export type Game = {
  title: string
  url: string
}

export type Config = {
  games: Game[]
}

export const isGame = (game: unknown): game is Game =>  game !== null
  && typeof game === 'object'
  && 'title' in game
  && 'url' in game
  && typeof game.title === 'string'
  && typeof game.url === 'string'

export const isConfig = (config: unknown): config is Config => config !== null
    && typeof config === 'object'
    && 'games' in config
    && Array.isArray(config.games)
    && config.games.every(isGame)
