import { Children } from 'react'
import { Link } from 'react-router-dom'
import RollText from './RollText'

const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outlineWhite: 'btn-outline-white',
}

/**
 * AgniTalk button. Text children roll up on hover and back down on leave, a logo-blue
 * fill wipes in from the bottom and the logo-arc bar slides across.
 *
 *   <Button to="/download" icon={<IconArrowRight />}>Download</Button>
 *   <Button onClick={fn} variant="secondary">Cancel</Button>
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  icon,
  className = '',
  children,
  type = 'button',
  ...rest
}) {
  const cls = `${VARIANTS[variant] ?? VARIANTS.primary} roll-host ${className}`.trim()
  const content = (
    <>
      {Children.map(children, (child) =>
        typeof child === 'string' || typeof child === 'number' ? <RollText>{child}</RollText> : child,
      )}
      {icon}
    </>
  )

  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{content}</a>
  return <button type={type} className={cls} {...rest}>{content}</button>
}
