import s from './ButtonBase.module.scss'

interface IButtonBaseProps {
  text: string
  onClick?: () => void
  disabled?: boolean
}

const ButtonBase: React.FunctionComponent<IButtonBaseProps> = ({
  text,
  onClick,
  disabled,
}) => {
  return (
    <button className={s['button-base']} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  )
}

export default ButtonBase
