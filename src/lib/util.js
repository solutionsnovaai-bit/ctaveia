export const limitar = (v, min, max) => Math.min(max, Math.max(min, v))

/** Junta classes ignorando o que for vazio. */
export const cx = (...partes) => partes.filter(Boolean).join(' ')

/** Carrega uma imagem antes de ela aparecer na tela. Nunca rejeita. */
export function preCarregar(src) {
  return new Promise((ok) => {
    const img = new Image()
    img.onload = img.onerror = () => ok(src)
    img.src = src
    if (img.decode) img.decode().then(() => ok(src)).catch(() => {})
  })
}

/** Espera um tempo em ms. */
export const esperar = (ms) => new Promise((ok) => setTimeout(ok, ms))
