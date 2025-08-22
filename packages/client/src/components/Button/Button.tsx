import * as React from 'react'
import s from './Button.module.scss'

interface IButtonBaseProps {
  text: string
}

const ButtonBase: React.FunctionComponent<IButtonBaseProps> = props => {
  return <button className={s['button']}>{props.text}</button>
}

export default ButtonBase
