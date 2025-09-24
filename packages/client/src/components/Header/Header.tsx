import { Link } from 'react-router-dom'
import s from './Header.module.scss'

type MenuItem = {
  text: string
  link: string
}

const MENU_ITEMS: MenuItem[] = [
  { text: 'Home', link: '/' },
  { text: 'Leaderboard', link: '/leaderboard' },
  { text: 'Forum', link: '/forum' },
  { text: 'Profile', link: '/profile' },
  { text: 'Start', link: '/start' },
  { text: 'Game', link: '/game' },
]

export const Header = () => {
  return (
    <div className={s['header']}>
      <div className={s['header__logo']}>CROCODILE</div>
      <nav className={s['header__menu']}>
        <ul className={s['header__links-list']}>
          {MENU_ITEMS.map((item: MenuItem, index: number) => {
            return (
              <li key={index} className={s['header__links-list-item']}>
                <Link className={s['header__links-list-link']} to={item.link}>
                  {item.text}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
