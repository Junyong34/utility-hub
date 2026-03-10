export interface LottoNumberPalette {
  backgroundClassName: string
  backgroundColor: string
  textColor: string
  borderColor: string
  shadowColor: string
}

export function getLottoNumberPalette(num: number): LottoNumberPalette {
  if (num <= 10) {
    return {
      backgroundClassName:
        'bg-yellow-400 text-yellow-950 dark:bg-yellow-500 dark:text-yellow-950',
      backgroundColor: '#facc15',
      textColor: '#422006',
      borderColor: '#fde68a',
      shadowColor: 'rgba(250, 204, 21, 0.35)',
    }
  }

  if (num <= 20) {
    return {
      backgroundClassName:
        'bg-blue-500 text-white dark:bg-blue-600 dark:text-white',
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
      borderColor: '#93c5fd',
      shadowColor: 'rgba(59, 130, 246, 0.35)',
    }
  }

  if (num <= 30) {
    return {
      backgroundClassName:
        'bg-red-500 text-white dark:bg-red-600 dark:text-white',
      backgroundColor: '#ef4444',
      textColor: '#ffffff',
      borderColor: '#fca5a5',
      shadowColor: 'rgba(239, 68, 68, 0.35)',
    }
  }

  if (num <= 40) {
    return {
      backgroundClassName:
        'bg-gray-600 text-white dark:bg-gray-500 dark:text-white',
      backgroundColor: '#4b5563',
      textColor: '#ffffff',
      borderColor: '#d1d5db',
      shadowColor: 'rgba(75, 85, 99, 0.3)',
    }
  }

  return {
    backgroundClassName:
      'bg-green-600 text-white dark:bg-green-600 dark:text-white',
    backgroundColor: '#16a34a',
    textColor: '#ffffff',
    borderColor: '#86efac',
    shadowColor: 'rgba(22, 163, 74, 0.35)',
  }
}

export function getLottoBallColor(num: number): string {
  return getLottoNumberPalette(num).backgroundClassName
}
