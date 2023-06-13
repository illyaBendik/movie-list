export interface Movie {
  imdbID: string
  Title: string
  Year: number
}

export interface MovieWithFavorite extends Movie {
  isFavorite: boolean
}
