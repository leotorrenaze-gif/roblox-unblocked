const embedUrl =
  'https://cherrion.top/embed?u=https%3A%2F%2Fnowgg.fun%2Fapps%2Fa%2F19900%2Fb.html'

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
      <p className="sr-only">
        If the embedded content does not load, open it directly at{' '}
        <a href={embedUrl}>the embedded game</a>.
      </p>
    </main>
  )
}

