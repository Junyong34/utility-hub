'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface CustomOgFormValues {
  title: string
  description: string
  image: string
  imageEnabled: boolean
  bgColor: string
  accentColor: string
  label: string
  themePreset: string
  layoutVariant: string
  mascotEnabled: boolean
}

interface CustomOgFormProps {
  defaultValues: CustomOgFormValues
}

const THEME_PRESETS = [
  { value: 'cream', label: '크림', color: '#FFF8EF' },
  { value: 'mint', label: '민트', color: '#D9F5E6' },
  { value: 'sky', label: '스카이', color: '#D9EEFF' },
  { value: 'sun', label: '선', color: '#FFFCF0' },
  { value: 'peach', label: '피치', color: '#FFE3D2' },
  { value: 'dark', label: '다크', color: '#0f172a' },
]

const LAYOUT_VARIANTS = [
  { value: 'play-card', label: '플레이 카드' },
  { value: 'tool-card', label: '도구 카드' },
  { value: 'custom-studio', label: '커스텀 (레거시)' },
]

function SegmentedOption({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        active
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
    >
      {children}
    </button>
  )
}

export function CustomOgForm({ defaultValues }: CustomOgFormProps) {
  const [title, setTitle] = useState(defaultValues.title)
  const [description, setDescription] = useState(defaultValues.description)
  const [image, setImage] = useState(defaultValues.image)
  const [imageEnabled, setImageEnabled] = useState(defaultValues.imageEnabled)
  const [bgColor, setBgColor] = useState(defaultValues.bgColor)
  const [accentColor, setAccentColor] = useState(defaultValues.accentColor)
  const [label, setLabel] = useState(defaultValues.label)
  const [themePreset, setThemePreset] = useState(defaultValues.themePreset)
  const [layoutVariant, setLayoutVariant] = useState(defaultValues.layoutVariant)
  const [mascotEnabled, setMascotEnabled] = useState(defaultValues.mascotEnabled)

  const isLegacyLayout = layoutVariant === 'custom-studio'

  return (
    <form action="/tools/og-image-studio" method="get" className="space-y-5">
      <input type="hidden" name="mode" value="custom" />
      <input type="hidden" name="imageEnabled" value={imageEnabled ? '1' : '0'} />
      <input type="hidden" name="mascotEnabled" value={mascotEnabled ? '1' : '0'} />

      {/* 테마 프리셋 */}
      <div className="grid gap-2.5">
        <span className="text-sm font-medium text-foreground">테마 프리셋</span>
        <div className="grid grid-cols-3 gap-2">
          {THEME_PRESETS.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => setThemePreset(preset.value)}
              className={cn(
                'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors',
                themePreset === preset.value
                  ? 'border-primary bg-primary/5 font-medium text-foreground'
                  : 'border-border text-muted-foreground hover:bg-muted'
              )}
            >
              <span
                className="inline-block h-4 w-4 shrink-0 rounded-full border border-border/50"
                style={{ backgroundColor: preset.color }}
              />
              {preset.label}
            </button>
          ))}
        </div>
        <input type="hidden" name="themePreset" value={themePreset} />
      </div>

      {/* 레이아웃 변형 */}
      <div className="grid gap-2.5">
        <span className="text-sm font-medium text-foreground">레이아웃</span>
        <select
          value={layoutVariant}
          onChange={(e) => setLayoutVariant(e.target.value)}
          className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-10 w-full rounded-lg border bg-transparent px-3 text-sm outline-none focus-visible:ring-3"
        >
          {LAYOUT_VARIANTS.map((v) => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </select>
        <input type="hidden" name="layoutVariant" value={layoutVariant} />
      </div>

      {/* 마스코트 on/off */}
      <div className="grid gap-2.5">
        <span className="text-sm font-medium text-foreground">마스코트</span>
        <div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-muted/30 p-1">
          <SegmentedOption
            active={mascotEnabled}
            onClick={() => setMascotEnabled(true)}
          >
            사용
          </SegmentedOption>
          <SegmentedOption
            active={!mascotEnabled}
            onClick={() => setMascotEnabled(false)}
          >
            미사용
          </SegmentedOption>
        </div>
      </div>

      <label className="grid gap-2.5">
        <span className="text-sm font-medium text-foreground">제목</span>
        <Input name="title" value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>

      <label className="grid gap-2.5">
        <span className="text-sm font-medium text-foreground">설명</span>
        <Textarea
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>

      <div className="grid gap-2.5">
        <span className="text-sm font-medium text-foreground">이미지 링크</span>
        <div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-muted/30 p-1">
          <SegmentedOption
            active={imageEnabled}
            onClick={() => setImageEnabled(true)}
          >
            사용
          </SegmentedOption>
          <SegmentedOption
            active={!imageEnabled}
            onClick={() => setImageEnabled(false)}
          >
            미사용
          </SegmentedOption>
        </div>
      </div>

      {imageEnabled ? (
        <label className="grid gap-2.5">
          <span className="text-sm font-medium text-foreground">
            이미지 경로 또는 URL
          </span>
          <Input
            name="image"
            value={image}
            placeholder="/og-images/post/example.webp"
            onChange={(event) => setImage(event.target.value)}
          />
        </label>
      ) : (
        <input type="hidden" name="image" value={image} />
      )}

      {/* 커스텀 색상 — 레거시 레이아웃이거나 직접 지정 시 */}
      {isLegacyLayout ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2.5">
            <span className="text-sm font-medium text-foreground">배경색</span>
            <Input
              name="bgColor"
              value={bgColor}
              onChange={(event) => setBgColor(event.target.value)}
            />
          </label>

          <label className="grid gap-2.5">
            <span className="text-sm font-medium text-foreground">포인트 색상</span>
            <Input
              name="accentColor"
              value={accentColor}
              onChange={(event) => setAccentColor(event.target.value)}
            />
          </label>
        </div>
      ) : null}

      <label className="grid gap-2.5">
        <span className="text-sm font-medium text-foreground">라벨</span>
        <Input name="label" value={label} onChange={(event) => setLabel(event.target.value)} />
      </label>

      <Button type="submit" className="mt-1 w-full">
        미리보기 갱신
      </Button>
    </form>
  )
}
