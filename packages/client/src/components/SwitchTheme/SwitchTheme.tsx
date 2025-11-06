import { Switch } from '@gravity-ui/uikit'
import { FC, useState, useEffect } from 'react'
import s from './SwitchTheme.module.scss'

export const SwitchTheme: FC = () => {
  const [theme, setTheme] = useState(
    () =>
      (typeof window !== 'undefined' && window.localStorage.getItem('theme')) ||
      'light'
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.className =
        theme === 'light'
          ? 'g-root g-root_theme_light'
          : 'g-root g-root_theme_dark'
    }
  }, [theme])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', theme)
    }
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  return (
    <div className={s.container}>
      <Switch
        checked={theme === 'dark'}
        onChange={toggleTheme}
        className={s.switch}
        content={theme === 'dark' ? ' Ночь ' : 'День '}
      />
    </div>
  )
}
