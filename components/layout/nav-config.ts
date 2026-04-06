import {
  BookOpenIcon,
  WrenchIcon,
  GiftIcon,
  MapPinIcon,
  LucideIcon,
} from "lucide-react"

export interface NavItem {
  name: string
  href: string
  icon?: LucideIcon
}

/**
 * 주 네비게이션 — Header & BottomNav
 * 순서: 나들이 → 도구 → 혜택 → 블로그
 */
export const NAV_ITEMS: NavItem[] = [
  { name: "나들이", href: "/places", icon: MapPinIcon },
  { name: "도구", href: "/tools", icon: WrenchIcon },
  { name: "혜택", href: "/benefits", icon: GiftIcon },
  { name: "블로그", href: "/blog", icon: BookOpenIcon },
]

/**
 * 푸터 링크 — 소개, FAQ, 기타 보조 페이지
 */
export const FOOTER_ITEMS: NavItem[] = [
  { name: "소개", href: "/about" },
  { name: "FAQ", href: "/faq" },
]
