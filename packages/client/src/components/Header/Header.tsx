import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from '../../store'
import { Button } from '@gravity-ui/uikit'
import { logoutThunk } from '@slices/userSlice'
import { selectUser } from '@slices/userSlice'
import GetLocation from '@components/GetLocation/GetLocation'
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
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk())
      navigate('/sign-in')
    } catch (error) {
      console.error('Ошибка при выходе:', error)
    }
  }

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
        {user && (
          <div className={s['header__user-section']}>
            <span className={s['header__user-name']}>
              {user.first_name} {user.second_name}
            </span>

            <GetLocation />

            <Button
              size="s"
              view="outlined-danger"
              onClick={handleLogout}
              className={s['header__logout-btn']}>
              Выйти
            </Button>
          </div>
        )}
      </nav>
    </div>
  )
}
