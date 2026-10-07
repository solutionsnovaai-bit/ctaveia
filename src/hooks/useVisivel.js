import { useEffect, useState } from 'react'

/** Diz se o elemento está na tela. Serve para pausar o que não está sendo visto. */
export function useVisivel(ref, margem = '0px') {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { rootMargin: margem })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, margem])

  return visivel
}
