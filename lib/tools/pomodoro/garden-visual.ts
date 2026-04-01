export type GardenVisualStatus = 'idle' | 'running' | 'paused' | 'completed'

export interface GardenVisualStateInput {
  progress: number
  status: GardenVisualStatus
  timeMs?: number
}

export interface GardenVisualState {
  stemProgress: number
  bloom: 'bud' | 'flower'
  sway: number
  glowPulse: number
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) {
    return 0
  }

  return Math.min(1, Math.max(0, value))
}

function interpolateStage(progress: number): number {
  const inputStops = [0, 0.08, 0.22, 0.42, 0.68, 0.86, 1]
  const outputStops = [0.08, 0.18, 0.34, 0.58, 0.78, 0.92, 1]

  for (let index = 1; index < inputStops.length; index += 1) {
    const start = inputStops[index - 1]
    const end = inputStops[index]

    if (progress <= end) {
      const local =
        end === start ? 0 : (progress - start) / (end - start)

      return outputStops[index - 1] + (outputStops[index] - outputStops[index - 1]) * local
    }
  }

  return 1
}

export function getGardenVisualState({
  progress,
  status,
  timeMs = 0,
}: GardenVisualStateInput): GardenVisualState {
  const rawProgress = clamp01(progress)
  const stemProgress =
    status === 'completed' ? 1 : interpolateStage(rawProgress)
  const running = status === 'running'
  const sway = running ? Math.sin(timeMs / 900) * 6 : 0
  const glowPulse = running ? 0.9 + (Math.sin(timeMs / 1200) + 1) * 0.12 : 1

  return {
    stemProgress,
    bloom: status === 'completed' ? 'flower' : 'bud',
    sway,
    glowPulse,
  }
}
