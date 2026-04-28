'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Globe, Sparkles, Star, Headphones,
  Package, BarChart2, Award, Network, DollarSign, CheckCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroBackground } from '@/components/hero-background'
import { translations, type Lang } from '@/lib/translations'

const PARTNER_BRANDS = [
  'KOCOSTAR', 'celimax', 'SKIN&LAB', 'Pyunkang Yul',
  'Isntree', 'DEOPROCE', 'baerry', 'ClearDea',
  '이지담', '23YEARSOLD', 'Anua',
]

const BENEFIT_ICONS = [Package, DollarSign, Headphones, Star, Globe, BarChart2, Award, Network]


const TIKTOK_IDS = [
  { id: '7471724419216346398', handle: '@milkydew' },
  { id: '7530013023667309879', handle: '@karlaceliss' },
  { id: '7334318567422299400', handle: '@memeron_me' },
]

const LANG_LABELS: Record<Lang, string> = { ko: '한국어', en: 'English', ja: '日本語' }

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>('ko')
  const T = translations[lang]

  const [campaignIdx, setCampaignIdx]         = useState(0)
  const [campaignVisible, setCampaignVisible] = useState(true)

  useEffect(() => {
    setCampaignIdx(0)
    setCampaignVisible(true)
  }, [lang])

  useEffect(() => {
    const id = setInterval(() => {
      setCampaignVisible(false)
      setTimeout(() => {
        setCampaignIdx(i => (i + 1) % T.liveCampaigns.length)
        setCampaignVisible(true)
      }, 380)
    }, 2800)
    return () => clearInterval(id)
  }, [T.liveCampaigns.length])

  return (
    <div className="min-h-screen bg-[#0d0a14]">

      {/* ── Ambient glows ── */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-0      h-[800px] w-[800px] rounded-full bg-violet-900/10  blur-[160px]" />
        <div className="absolute top-[40%] -left-40   h-[600px] w-[600px] rounded-full bg-violet-950/12  blur-[140px]" />
        <div className="absolute bottom-0   right-1/3 h-[500px] w-[500px] rounded-full bg-violet-950/10   blur-[120px]" />
      </div>

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#0d0a14]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-400/15 ring-1 ring-violet-400/20">
              <Sparkles className="h-3.5 w-3.5 text-violet-300" />
            </div>
            <span className="text-[15px] font-semibold tracking-[0.08em] text-white/90">SLAM GLOBAL</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            {(['about','success','benefits','how'] as const).map(key => (
              <a key={key} href={`#${key}`} className="text-[13px] text-gray-500 transition-colors hover:text-gray-200">
                {T.nav[key]}
              </a>
            ))}
          </div>
          <a href="https://forms.gle/PAr9WRdky1E1jEma6" target="_blank" rel="noopener noreferrer">
            <Button className="h-9 rounded-full bg-violet-400/10 px-4 sm:px-5 text-[12px] sm:text-[13px] font-medium text-violet-300 ring-1 ring-violet-400/25 hover:bg-violet-400/18 hover:text-violet-200 shadow-none">
              {T.nav.register} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </a>
        </div>
      </nav>

      {/* ── Language switcher bar ── */}
      <div className="fixed top-16 left-0 right-0 z-40 flex items-center justify-center gap-1 border-b border-white/[0.04] bg-[#0d0a14]/85 backdrop-blur-xl py-2">
        {(Object.keys(LANG_LABELS) as Lang[]).map((l, i) => (
          <span key={l} className="flex items-center gap-1">
            {i > 0 && <span className="text-gray-700 text-[11px]">·</span>}
            <button
              onClick={() => setLang(l)}
              className={`rounded px-2.5 py-0.5 text-[12px] font-medium transition-colors ${
                lang === l
                  ? 'text-violet-300'
                  : 'text-gray-600 hover:text-gray-400'
              }`}
            >
              {LANG_LABELS[l]}
            </button>
          </span>
        ))}
      </div>

      {/* ── Hero ── */}
      <section className="relative z-10 pt-40 pb-32 md:pt-44 md:pb-40">
        <div className="absolute inset-0 overflow-hidden">
          <HeroBackground />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/6 px-4 py-1.5">
            <Globe className="h-3 w-3 text-violet-400/70" />
            <span className="text-[11px] font-semibold tracking-[0.18em] text-violet-300/70 uppercase">{T.hero.badge}</span>
          </div>

          <h1 className="mx-auto max-w-4xl text-[32px] font-bold leading-[1.2] tracking-tight text-white sm:text-[44px] md:text-[52px] md:leading-[1.15]">
            <span className="block md:whitespace-nowrap">{T.hero.title1}</span>
            <span className="block md:whitespace-nowrap bg-gradient-to-r from-violet-300 via-violet-200 to-white/80 bg-clip-text text-transparent">
              {T.hero.title2}
            </span>
          </h1>

          <p className="mt-6 text-[14px] leading-relaxed text-gray-500 sm:text-[15px]">
            {T.hero.desc}
          </p>

          {/* Live campaign ticker */}
          <div className="mt-8 flex justify-center">
            <div
              className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-950/30 px-4 py-2"
              style={{
                opacity:    campaignVisible ? 1 : 0,
                transform:  campaignVisible ? 'translateY(0px)' : 'translateY(5px)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
              }}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[12px] font-medium text-emerald-300/85">
                {T.liveCampaigns[campaignIdx]}
              </span>
            </div>
          </div>

          {/* CTA button with shimmer + glow */}
          <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="relative inline-flex">
              <div className="absolute -inset-2 rounded-full bg-violet-500/20 blur-lg animate-pulse" />
              <a href="https://forms.gle/PAr9WRdky1E1jEma6" target="_blank" rel="noopener noreferrer" className="relative">
                <Button size="lg" className="campaign-btn h-12 rounded-full bg-violet-300/90 px-7 sm:px-9 text-[14px] font-semibold text-[#0d0814] shadow-lg shadow-violet-900/30 hover:bg-violet-200">
                  {T.hero.campaignCta} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative z-10 border-y border-white/[0.05] py-10 md:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <div className="grid grid-cols-2 divide-x divide-white/[0.05] md:grid-cols-4">
            {T.stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2 px-3 py-2 text-center sm:px-6">
                <div className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
                  {s.value}
                </div>
                <div className="text-[10px] font-medium tracking-[0.1em] text-gray-600 uppercase sm:text-[11px] sm:tracking-[0.14em]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="relative z-10 py-16 md:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <p className="mb-3 text-center text-[10px] font-semibold tracking-[0.22em] text-violet-400/60 uppercase">{T.about.label}</p>
          <h2 className="mb-5 text-center text-2xl font-bold text-white leading-tight sm:text-3xl md:text-[40px]">
            {T.about.title1}<br />
            <span className="text-violet-300/90">{T.about.title2}</span>
          </h2>
          <p className="mb-12 text-center text-[13px] leading-relaxed text-gray-500 sm:text-[14px] md:mb-16">{T.about.desc}</p>

          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-8">
            <div className="w-full max-w-xs rounded-2xl border border-white/[0.07] bg-white/[0.03] px-6 py-6 text-center sm:px-10 sm:py-8">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-gray-500 uppercase">{T.about.brandsLabel}</p>
              <p className="mt-4 text-base font-medium text-gray-200">{T.about.brandsDesc}</p>
              <p className="mt-2 text-sm text-gray-500">{T.about.brandsCount}</p>
            </div>
            <div className="flex flex-row items-center gap-3 md:flex-col">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-violet-400/50 to-transparent md:h-px md:w-24" />
              <div className="rounded-full border border-violet-400/25 bg-violet-400/10 px-4 py-1.5 text-[11px] font-semibold tracking-wider text-violet-300/90 md:px-5 md:py-2 md:text-[12px]">
                SLAM GLOBAL
              </div>
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-violet-400/50 to-transparent md:h-px md:w-24" />
            </div>
            <div className="w-full max-w-xs rounded-2xl border border-white/[0.07] bg-white/[0.03] px-6 py-6 text-center sm:px-10 sm:py-8">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-gray-500 uppercase">{T.about.creatorsLabel}</p>
              <p className="mt-4 text-base font-medium text-gray-200">{T.about.creatorsPlat}</p>
              <p className="mt-2 text-sm text-gray-500">{T.about.creatorsRegion}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Success Stories ── */}
      <section id="success" className="relative z-10 border-y border-white/[0.05] py-16 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <p className="mb-3 text-center text-[10px] font-semibold tracking-[0.22em] text-violet-400/60 uppercase">{T.success.label}</p>
          <h2 className="mb-5 text-center text-2xl font-bold text-white sm:text-3xl md:text-[40px]">
            {T.success.title1} <span className="text-violet-300/90">{T.success.title2}</span>
          </h2>
          <p className="mx-auto mb-12 max-w-md text-center text-[13px] leading-relaxed text-gray-500 sm:text-[14px] md:mb-16">{T.success.desc}</p>

          <div className="grid gap-7 md:grid-cols-3">
            {TIKTOK_IDS.map(({ id, handle }, i) => (
              <div key={id} className="flex flex-col">
                <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-black/40">
                  <iframe
                    src={`https://www.tiktok.com/embed/v2/${id}`}
                    className="w-full"
                    style={{ height: '560px', border: 'none' }}
                    allow="encrypted-media"
                    allowFullScreen
                    title={`TikTok ${handle}`}
                  />
                </div>
                <div className="mt-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-violet-400/60" />
                    <span className="text-sm font-medium text-violet-300/80">{handle}</span>
                    <span className="ml-auto text-[11px] text-gray-600">TikTok</span>
                  </div>
                  <p className="mb-4 text-[13px] leading-relaxed text-gray-400">{T.stories[i].highlight}</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {T.stories[i].stats.map((s, j) => (
                      <div key={j} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3.5 text-center">
                        <div className="text-xl font-bold text-white/90">{s.value}</div>
                        <div className="mt-0.5 text-[11px] text-gray-600">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner Brands ── */}
      <section className="relative z-10 border-b border-white/[0.05] py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <p className="mb-3 text-center text-[10px] font-semibold tracking-[0.22em] text-gray-600 uppercase">{T.partners.label}</p>
          <h3 className="mb-10 text-center text-xl font-bold text-white sm:text-2xl md:mb-12">
            {T.partners.title1} <span className="text-violet-300/90">{T.partners.title2}</span>
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-10">
            {PARTNER_BRANDS.map((brand, i) => (
              <span key={i} className="text-[13px] font-medium text-gray-700 transition-colors hover:text-gray-300 sm:text-[15px]">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Creator Benefits ── */}
      <section id="benefits" className="relative z-10 py-16 md:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <p className="mb-3 text-center text-[10px] font-semibold tracking-[0.22em] text-violet-400/60 uppercase">{T.benefits.label}</p>
          <h2 className="mb-5 text-center text-2xl font-bold text-white sm:text-3xl md:text-[40px]">
            {T.benefits.title1} <span className="text-violet-300/90">{T.benefits.title2}</span>
          </h2>
          <p className="mb-12 text-center text-[13px] leading-relaxed text-gray-500 sm:text-[14px] md:mb-16">{T.benefits.desc}</p>

          <div className="grid gap-3 md:grid-cols-2">
            {T.benefits.items.map((b, i) => {
              const Icon = BENEFIT_ICONS[i]
              return (
                <div key={i} className="group flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:border-violet-400/20 hover:bg-violet-400/[0.04] sm:gap-5 sm:p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-400/8 transition-all group-hover:border-violet-400/25 group-hover:bg-violet-400/12">
                    <Icon className="h-4 w-4 text-violet-300/70" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-[14px] font-semibold text-white/90">{b.title}</h3>
                    <p className="text-[13px] leading-relaxed text-gray-500">{b.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How to Join ── */}
      <section id="how" className="relative z-10 border-t border-white/[0.05] py-16 md:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <p className="mb-3 text-center text-[10px] font-semibold tracking-[0.22em] text-violet-400/60 uppercase">{T.how.label}</p>
          <h2 className="mb-5 text-center text-2xl font-bold text-white md:text-3xl">
            <span className="text-violet-300/90">{T.how.title1}</span>{T.how.title2}
          </h2>
          <p className="mx-auto mb-12 max-w-md text-center text-[13px] leading-relaxed text-gray-500 sm:text-[14px] md:mb-16">{T.how.desc}</p>

          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
            {T.how.steps.map((p, i) => (
              <div key={i} className="relative w-full sm:w-72 md:w-64">
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.05] p-6 text-center transition-all hover:border-violet-400/30">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-violet-400/30 bg-violet-400/15 text-[13px] font-bold text-violet-200">
                    {p.step}
                  </div>
                  <h3 className="mb-2 text-[14px] font-semibold text-white">{p.title}</h3>
                  <p className="text-[12px] leading-relaxed text-gray-400">{p.desc}</p>
                </div>
                {i < T.how.steps.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-full md:flex md:w-4 md:items-center md:justify-center">
                    <ArrowRight className="h-3.5 w-3.5 text-gray-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-violet-400/12 bg-white/[0.03] p-8 text-center sm:p-12 md:p-14">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-transparent to-transparent" />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[500px] rounded-full bg-violet-900/15 blur-[60px]" />
            <div className="relative">
              <div className="mb-6 flex flex-wrap justify-center gap-2">
                {T.cta.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 rounded-full border border-violet-400/15 bg-violet-400/6 px-3 py-1.5 text-[11px] text-violet-300/70 sm:px-4 sm:text-[12px]">
                    <CheckCircle className="h-3 w-3" /> {tag}
                  </span>
                ))}
              </div>
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">{T.cta.title}</h2>
              <p className="mx-auto mb-8 max-w-sm text-[13px] leading-relaxed text-gray-500 sm:text-[14px] md:mb-10">{T.cta.desc}</p>
              <a href="https://forms.gle/PAr9WRdky1E1jEma6" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="h-12 rounded-full bg-violet-300/90 px-8 sm:px-10 text-[14px] font-semibold text-[#0d0814] shadow-lg shadow-violet-900/20 hover:bg-violet-200">
                  {T.cta.btn} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/[0.05] py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-400/10 ring-1 ring-violet-400/15">
                <Sparkles className="h-3.5 w-3.5 text-violet-300/70" />
              </div>
              <span className="text-[14px] font-semibold tracking-[0.08em] text-gray-400">SLAM GLOBAL</span>
            </div>
            <div className="flex items-center gap-5 sm:gap-6">
              <Link href="/dashboard"   className="text-[13px] text-gray-700 transition-colors hover:text-gray-400">{T.footer.dashboard}</Link>
              <Link href="/guidelines"  className="text-[13px] text-gray-700 transition-colors hover:text-gray-400">{T.footer.guidelines}</Link>
              <Link href="/faq"         className="text-[13px] text-gray-700 transition-colors hover:text-gray-400">{T.footer.faq}</Link>
            </div>
            <p className="text-[12px] text-gray-700">{T.footer.copy}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
