import s from './ButtonBase.module.scss'

interface IButtonBaseProps {
  text: string
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const ButtonBase: React.FunctionComponent<IButtonBaseProps> = ({
  text,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      className={`${s['button-base']}${className ? ` ${className}` : ''}`}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  )
}

export default ButtonBase
