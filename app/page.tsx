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
      {unlocked ? (
        <iframe
          src={embedUrl}
          title="Embedded game"
          className="block h-full w-full border-0"
          allow="fullscreen; autoplay; gamepad"
          allowFullScreen
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-zinc-950 px-4 text-white">
          <form onSubmit={submitCode} className="w-full max-w-sm rounded-3xl border border-white/15 bg-zinc-900/95 p-6 text-center shadow-2xl">
            <LockKeyhole className="mx-auto mb-3 size-8 text-cyan-300" />
            <h1 className="text-xl font-bold">Enter launch code</h1>
            <p className="mt-2 text-sm text-zinc-400">Type 3030 to launch the site.</p>
            <input
              aria-label="Launch code"
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 4))}
              inputMode="numeric"
              maxLength={4}
              autoFocus
              placeholder="3030"
              className="mt-5 h-12 w-full rounded-xl border border-white/15 bg-white/10 px-3 text-center text-lg tracking-[0.5em] outline-none ring-cyan-300 focus:ring-2"
            />
            <button type="submit" className="mt-3 h-11 w-full rounded-xl bg-cyan-300 text-sm font-bold text-zinc-950 transition hover:bg-cyan-200">Launch site</button>
            {code.length === 4 && code !== '3030' && <p className="mt-3 text-sm text-red-300" role="alert">Incorrect code.</p>}
          </form>
        </div>
      )}
      {unlocked && (
        <div className="absolute right-4 top-4 z-10 flex flex-col items-end gap-3 sm:right-6 sm:top-6">
          <button onClick={() => setCalculatorOpen(true)} className="flex items-center gap-2 rounded-full border border-white/15 bg-zinc-950/90 px-4 py-2.5 text-sm font-semibold text-white shadow-xl backdrop-blur-md transition hover:bg-zinc-800">
            <Calculator className="size-4 text-cyan-300" /> Calculator
          </button>
          {calculatorOpen && (
            <section aria-label="Calculator" className="w-72 rounded-2xl border border-white/15 bg-zinc-950/95 p-4 text-white shadow-2xl backdrop-blur-md">
              <div className="mb-3 flex items-center justify-between"><h2 className="font-semibold">Calculator</h2><button onClick={() => setCalculatorOpen(false)} aria-label="Close calculator" className="rounded-lg p-1 text-zinc-400 hover:bg-white/10 hover:text-white"><X className="size-4" /></button></div>
              <div className="mb-3 overflow-hidden rounded-xl bg-white/10 px-3 py-4 text-right text-2xl font-medium tabular-nums" aria-live="polite">{display}</div>
              <div className="grid grid-cols-4 gap-2">{calculatorButtons.flat().map((button) => <button key={button} onClick={() => pressButton(button)} className={`h-11 rounded-xl font-semibold transition hover:bg-white/20 ${button === '=' ? 'bg-cyan-300 text-zinc-950 hover:bg-cyan-200' : 'bg-white/10 text-white'}`}>{button}</button>)}</div>
            </section>
          )}
        </div>
      )}
      <p className="sr-only">If the embedded content does not load, open it directly at <a href={embedUrl}>the embedded game</a>.</p>
    </main>
  )
}

