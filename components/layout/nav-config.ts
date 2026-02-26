import {
  BookOpenIcon,
  WrenchIcon,
  CircleHelpIcon,
  InfoIcon,
  LucideIcon,
} from "lucide-react"

export interface NavItem {
  name: string
  href: string
  icon?: LucideIcon
}

/**
 * 네비게이션 메뉴 공통 설정
 * Header와 BottomNav에서 동일하게 사용
 */
export const NAV_ITEMS: NavItem[] = [
  { name: "Blog", href: "/blog", icon: BookOpenIcon },
  { name: "Tools", href: "/tools", icon: WrenchIcon },
  { name: "About", href: "/about", icon: InfoIcon },
  { name: "FAQ", href: "/faq", icon: CircleHelpIcon },
]
