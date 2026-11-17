/**
 * Label that rolls up on hover and rolls back down on leave.
 * Put it inside any element that has the `roll-host` class (Button already does).
 */
export default function RollText({ children }) {
  return (
    <span className="roll-text">
      <span className="roll-text__line">{children}</span>
      <span className="roll-text__line roll-text__line--copy" aria-hidden="true">
        {children}
      </span>
    </span>
  )
}
