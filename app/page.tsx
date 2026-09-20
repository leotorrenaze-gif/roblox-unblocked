'use client'

import { useEffect, useRef, useState } from 'react'

const embedUrl =
  'https://cherrion.top/embed?u=https%3A%2F%2Fnowgg.fun%2Fapps%2Fa%2F19900%2Fb.html'

function Calctour() {
  const [isOpen, setIsOpen] = useState(false)
  const typedCode = useRef('')

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) {
        return
      }

      typedCode.current = `${typedCode.current}${event.key}`.slice(-4)
      if (typedCode.current === '3030') {
        setIsOpen(true)
        typedCode.current = ''
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!isOpen) return null

  return (
    <section className="fixed inset-0 z-50 flex h-dvh w-full flex-col bg-[#090b12]" aria-label="Calctour">
      <header className="flex items-center justify-between border-b border-white/10 bg-[#111522] px-4 py-3 text-white">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">Calctour</p>
          <h1 className="text-lg font-semibold">Calculator site</h1>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-md border border-white/15 px-3 py-2 text-sm text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-cyan-300"
        >
          Close
        </button>
      </header>
      <iframe
        src={embedUrl}
        title="Calctour calculator site"
        className="min-h-0 w-full flex-1 border-0"
        allow="fullscreen; autoplay; gamepad"
        allowFullScreen
      />
    </section>
  )
}

export default function Page() {
  return (
    <main className="h-dvh w-full overflow-hidden bg-black">
      <iframe
        src={embedUrl}
        title="Embedded game"
        className="block h-full w-full border-0"
        allow="fullscreen; autoplay; gamepad"
        allowFullScreen
      />
      <Calctour />
      <p className="sr-only">
        If the embedded content does not load, open it directly at{' '}
        <a href={embedUrl}>the embedded game</a>.
      </p>
    </main>
  )
}

