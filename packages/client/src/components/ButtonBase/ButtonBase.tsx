import s from './ButtonBase.module.scss'

interface IButtonBaseProps {
  text: string
}

const ButtonBase: React.FunctionComponent<IButtonBaseProps> = props => {
  return <button className={s['button-base']}>{props.text}</button>
}

export default ButtonBase
