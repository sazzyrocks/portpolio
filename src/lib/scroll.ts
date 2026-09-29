/**
 * Unified Smooth Scroll Utility
 */
export const scrollToElement = (id: string, callback?: () => void): void => {
  if (callback) callback()
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}
