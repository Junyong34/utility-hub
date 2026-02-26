'use client'

import { useEffect } from 'react'

const ADSENSE_SCRIPT_ID = 'adsense-loader-script'
const ADSENSE_SCRIPT_SRC =
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3902027059531716'

/**
 * Hydration 이후에 AdSense 스크립트를 동적으로 주입합니다.
 * - React가 관리하는 <head> 초기 마크업을 변경하지 않도록 분리
 * - 중복 주입 방지
 */
export function AdSenseScript() {
  useEffect(() => {
    const hasById = document.getElementById(ADSENSE_SCRIPT_ID)
    const hasBySrc = document.querySelector<HTMLScriptElement>(
      `script[src="${ADSENSE_SCRIPT_SRC}"]`
    )

    if (hasById || hasBySrc) {
      return
    }

    const script = document.createElement('script')
    script.id = ADSENSE_SCRIPT_ID
    script.async = true
    script.src = ADSENSE_SCRIPT_SRC
    script.crossOrigin = 'anonymous'
    document.head.appendChild(script)
  }, [])

  return null
}
