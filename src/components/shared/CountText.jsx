/** Readable heading text with an optional brand-colour phrase. */
export default function CountText({ text, highlight = '', from = '#0052CC' }) {
  const start = highlight ? text.indexOf(highlight) : -1
  if (start < 0) return <span>{text}</span>
  return (
    <span>
      {text.slice(0, start)}
      <span style={{ color: from }}>{highlight}</span>
      {text.slice(start + highlight.length)}
    </span>
  )
}
