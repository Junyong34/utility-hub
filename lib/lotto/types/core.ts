export interface LottoRoundResult {
  round: number
  numbers: number[]
  bonus: number
  drawDate: string
  drawYear: string
  source: '동행복권'
}

export interface LottoNumbers {
  id: string
  numbers: number[]
  bonus?: number
  timestamp: number
}

export interface LottoGameSet {
  id: string
  games: number[][]
  timestamp: number
}
