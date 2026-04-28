'use client'

import { useState, useEffect } from 'react'

const IMAGES = ['/hero-bg-1.png', '/hero-bg-2.png', '/hero-bg-3.png']
const HOLD_MS  = 3000   // 사진 노출 유지 시간
const FADE_MS  = 700    // 페이드 전환 시간

export function HeroBackground() {
  const [idx, setIdx]         = useState(0)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    // 로드 직후 페이드인
    const initial = setTimeout(() => setOpacity(0.48), 80)

    const cycle = setInterval(() => {
      // 페이드아웃 → 이미지 교체 → 페이드인
      setOpacity(0)
      setTimeout(() => {
        setIdx(i => (i + 1) % IMAGES.length)
        setOpacity(0.48)
      }, FADE_MS + 80)
    }, HOLD_MS + FADE_MS)

    return () => {
      clearTimeout(initial)
      clearInterval(cycle)
    }
  }, [])

  return (
    <>
      <div
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage:    `url('${IMAGES[idx]}')`,
          backgroundSize:     'cover',
          backgroundPosition: 'center',
          filter:             'blur(9px)',
          opacity,
          transition:         `opacity ${FADE_MS}ms ease-in-out`,
        }}
      />
      {/* 텍스트 가독성용 오버레이 */}
      <div className="absolute inset-0 bg-[#0d0a14]/60" />
    </>
  )
}
