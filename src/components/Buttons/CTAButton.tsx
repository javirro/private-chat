import './Buttons.css'

interface CTAButtonProps {
  text: string
  onClick: () => void
  customClass?: string
  disabled?: boolean
}

const CTAButton: React.FC<CTAButtonProps> = ({ text, onClick, customClass, disabled }) => {
  const classNameToUse = customClass ? `cta-btn ${customClass}` : 'cta-btn'
  return <button className={classNameToUse} onClick={() => onClick()} disabled={disabled}>{text}</button>
}

export default CTAButton
