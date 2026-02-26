import Image from "next/image"

interface LogoProps {
  size?: number
  className?: string
  showText?: boolean
}

export function Logo({ size = 32, className = "", showText = true }: LogoProps) {
  // 텍스트 크기를 로고 크기에 비례하여 계산
  const getTextSize = () => {
    if (size <= 24) return "text-sm"
    if (size <= 32) return "text-base"
    if (size <= 40) return "text-lg"
    if (size <= 48) return "text-xl"
    return "text-2xl"
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* 라이트모드 로고 */}
      <Image
        src="/asset/logo.png"
        alt="Zento Logo"
        width={size}
        height={size}
        style={{ width: size, height: size }}
        priority
        className="dark:hidden"
      />
      {/* 다크모드 로고 */}
      <Image
        src="/asset/logo-dark.png"
        alt="Zento Logo"
        width={size}
        height={size}
        style={{ width: size, height: size }}
        priority
        className="hidden dark:block"
      />
      {showText && (
        <span className={`font-bold ${getTextSize()} text-foreground/60`}>
          Zento
        </span>
      )}
    </div>
  )
}
