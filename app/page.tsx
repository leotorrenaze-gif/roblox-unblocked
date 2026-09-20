'use client'

import { useMemo, useState } from 'react'
const embedUrl =
  'https://cherrion.top/embed?u=https%3A%2F%2Fnowgg.fun%2Fapps%2Fa%2F19900%2Fb.html'

const calculatorButtons = [
  ['C', '⌫', '÷', '×'],
  ['7', '8', '9', '−'],
  ['4', '5', '6', '+'],
  ['1', '2', '3', '='],
  ['0', '.', '(', ')'],
]

function calculate(expression: string) {
  const normalized = expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-')
  if (!/^[0-9+*/().\s-]+$/.test(normalized)) return 'Error'
  try {
    const result = Function(`"use strict"; return (${normalized})`)()
    return Number.isFinite(result) ? String(result) : 'Error'
  } catch {
    return 'Error'
  }
}

export default function Page() {
  const [unlocked, setUnlocked] = useState(false)
  const [expression, setExpression] = useState('')

  const display = useMemo(() => expression || '0', [expression])

  function pressButton(value: string) {
    if (value === 'C') return setExpression('')
    if (value === '⌫') return setExpression((current) => current.slice(0, -1))
    if (value === '=') return setExpression((current) => calculate(current))

    setExpression((current) => {
      const next = current === 'Error' ? value : current + value
      if (next === '3030') setUnlocked(true)
      return next
    })
  }

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-black">
      <iframe
        src={embedUrl}
        title="Embedded game"
        className="block h-full w-full border-0"
        allow="fullscreen; autoplay; gamepad"
        allowFullScreen
      />
      {!unlocked && (
        <section aria-label="Launch calculator" className="absolute inset-0 z-20 flex h-full w-full items-center justify-center bg-zinc-950 px-4 text-white">
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-white/15 bg-zinc-900/95 p-5 shadow-2xl">
              <div className="mb-4 overflow-hidden rounded-2xl bg-black px-4 py-6 text-right text-4xl font-medium tabular-nums text-cyan-100" aria-live="polite">{display}</div>
              <div className="grid grid-cols-4 gap-3">{calculatorButtons.flat().map((button) => <button key={button} onClick={() => pressButton(button)} className={`h-14 rounded-2xl text-lg font-semibold transition hover:bg-white/20 ${button === '=' ? 'bg-cyan-300 text-zinc-950 hover:bg-cyan-200' : 'bg-white/10 text-white'}`}>{button}</button>)}</div>
            </div>
          </div>
        </section>
      )}
      <p className="sr-only">If the embedded content does not load, open it directly at <a href={embedUrl}>the embedded game</a>.</p>
    </main>
  )
}

