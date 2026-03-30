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
}

interface CustomOgFormProps {
  defaultValues: CustomOgFormValues
}

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

  return (
    <form action="/tools/og-image-studio" method="get" className="space-y-5">
      <input type="hidden" name="mode" value="custom" />
      <input type="hidden" name="imageEnabled" value={imageEnabled ? '1' : '0'} />

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
