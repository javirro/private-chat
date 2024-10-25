
import './BaseModal.css'

interface BaseModalProps {
  children: React.ReactNode
  onClose: () => void
}

const BaseModal = ({ children, onClose }: BaseModalProps) => {
  return (
    <div id="base-modal">
      <div className="content">
        <header>
          <div onClick={() => onClose()}>
          </div>
        </header>
        {children}
      </div>
    </div>
  )
}

export default BaseModal
