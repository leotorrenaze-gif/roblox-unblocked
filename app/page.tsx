'use client'

import { useMemo, useState } from 'react'
import { Calculator, Delete, LockKeyhole, X } from 'lucide-react'

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
  const [code, setCode] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [calculatorOpen, setCalculatorOpen] = useState(false)
  const [expression, setExpression] = useState('')

  const display = useMemo(() => expression || '0', [expression])

  function submitCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (code === '3030') setUnlocked(true)
  }

  function pressButton(value: string) {
    if (value === 'C') return setExpression('')
    if (value === '⌫') return setExpression((current) => current.slice(0, -1))
    if (value === '=') return setExpression((current) => calculate(current))
    setExpression((current) => (current === 'Error' ? value : current + value))
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
      <div className="absolute right-4 top-4 z-10 flex flex-col items-end gap-3 sm:right-6 sm:top-6">
        {!unlocked ? (
          <form onSubmit={submitCode} className="w-64 rounded-2xl border border-white/15 bg-zinc-950/90 p-4 text-white shadow-2xl backdrop-blur-md">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><LockKeyhole className="size-4 text-cyan-300" /> Enter access code</div>
            <input
              aria-label="Access code"
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 4))}
              inputMode="numeric"
              maxLength={4}
              placeholder="••••"
              className="mb-3 h-11 w-full rounded-xl border border-white/15 bg-white/10 px-3 text-center text-lg tracking-[0.5em] outline-none ring-cyan-300 focus:ring-2"
            />
            <button type="submit" className="h-10 w-full rounded-xl bg-cyan-300 text-sm font-bold text-zinc-950 transition hover:bg-cyan-200">Unlock tools</button>
          </form>
        ) : (
          <button onClick={() => setCalculatorOpen(true)} className="flex items-center gap-2 rounded-full border border-white/15 bg-zinc-950/90 px-4 py-2.5 text-sm font-semibold text-white shadow-xl backdrop-blur-md transition hover:bg-zinc-800">
            <Calculator className="size-4 text-cyan-300" /> Calculator
          </button>
        )}
        {calculatorOpen && (
          <section aria-label="Calculator" className="w-72 rounded-2xl border border-white/15 bg-zinc-950/95 p-4 text-white shadow-2xl backdrop-blur-md">
            <div className="mb-3 flex items-center justify-between"><h2 className="font-semibold">Calculator</h2><button onClick={() => setCalculatorOpen(false)} aria-label="Close calculator" className="rounded-lg p-1 text-zinc-400 hover:bg-white/10 hover:text-white"><X className="size-4" /></button></div>
            <div className="mb-3 overflow-hidden rounded-xl bg-white/10 px-3 py-4 text-right text-2xl font-medium tabular-nums" aria-live="polite">{display}</div>
            <div className="grid grid-cols-4 gap-2">{calculatorButtons.flat().map((button) => <button key={button} onClick={() => pressButton(button)} className={`h-11 rounded-xl font-semibold transition hover:bg-white/20 ${button === '=' ? 'bg-cyan-300 text-zinc-950 hover:bg-cyan-200' : 'bg-white/10 text-white'}`}>{button}</button>)}</div>
          </section>
        )}
      </div>
      <p className="sr-only">If the embedded content does not load, open it directly at <a href={embedUrl}>the embedded game</a>.</p>
    </main>
  )
}

