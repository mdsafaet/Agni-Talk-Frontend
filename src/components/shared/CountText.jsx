import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CountText({
  text,
  highlight = '',
  hold = 2.5,
}) {
  const rootRef = useRef(null)

  const words = text.split(' ')
  const highlightStart = highlight ? text.indexOf(highlight) : -1
  const highlightEnd = highlightStart + highlight.length

  useLayoutEffect(() => {
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const tracks = gsap.utils.toArray('[data-roll-track]')

        gsap
          .timeline({
            repeat: -1,
            repeatDelay: hold,
            delay: hold,
          })
          .to(tracks, {
            yPercent: -50,
            duration: 0.75,
            stagger: 0.06,
            ease: 'power2.inOut',
          })
          .to(
            tracks,
            {
              yPercent: 0,
              duration: 0.75,
              stagger: {
                each: 0.06,
                from: 'end',
              },
              ease: 'power2.inOut',
            },
            `>+=${hold}`,
          )
      }, rootRef)

      return () => context.revert()
    })

    return () => media.revert()
  }, [text, highlight, hold])

  let characterOffset = 0

  return (
    <span ref={rootRef}>
      <span className="sr-only">{text}</span>

      <span aria-hidden="true">
        {words.map((word, index) => {
          const start = characterOffset
          characterOffset += word.length + 1

          const highlighted =
            highlightStart >= 0 &&
            start >= highlightStart &&
            start < highlightEnd

          const wordClass = highlighted
            ? 'block bg-linear-to-r from-[#0052CC] to-[#0099FF] bg-clip-text text-transparent'
            : 'block'

          return (
            <span key={`${index}-${word}`}>
              <span className="relative inline-block h-[1.5em] overflow-hidden align-bottom leading-[1.5]">
                <span data-roll-track className="block">
                  <span className={wordClass}>{word}</span>
                  <span className={wordClass}>{word}</span>
                </span>
              </span>

              {index < words.length - 1 ? ' ' : null}
            </span>
          )
        })}
      </span>
    </span>
  )
}