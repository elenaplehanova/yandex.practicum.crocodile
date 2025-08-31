import { Header } from '@components/Header'
import s from './MainPage.module.scss'
import { Button } from '@gravity-ui/uikit'
import { PlayFill } from '@gravity-ui/icons'
import { useNavigate } from 'react-router-dom'

export const MainPage = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/start')
  }
  return (
    <div className={s['main-page']}>
      <Header />

      <section className={s['main-page__content']}>
        <h1 className={s['main-page__title']}>
          Игра «Крокодил» — покажи, чтобы угадали!
        </h1>
        <p className={s['main-page__description']}>
          Весёлая командная игра для друзей, семьи и коллег. Объясняй слова
          жестами и мимикой — смех и эмоции гарантированы.
        </p>

        <Button
          size="xl"
          className={s['main-page__button-play']}
          onClick={handleClick}>
          <PlayFill />
          Начать бесплатно
        </Button>
      </section>

      {/* Как играть */}
      <section className={s['main-page__content']}>
        <h2 className={s['main-page__subheader']}>Как играть?</h2>
        <ol>
          <li className={s['main-page__text']}>Один игрок получает слово.</li>
          <li className={s['main-page__text']}>
            Показывает его только жестами и мимикой.
          </li>
          <li className={s['main-page__text']}>
            Остальные угадывают и получают очки.
          </li>
          <li className={s['main-page__text']}>
            Меняйтесь ролями и играйте снова!
          </li>
        </ol>
      </section>

      {/* Где играть */}
      <section className={s['main-page__content']}>
        <h2 className={s['main-page__subheader']}>Где можно играть?</h2>
        <ul>
          <li className={s['main-page__text']}>На вечеринке</li>
          <li className={s['main-page__text']}>На тимбилдинге</li>
          <li className={s['main-page__text']}>В дороге</li>
          <li className={s['main-page__text']}>В онлайн-комнате с друзьями</li>
        </ul>
      </section>

      <section className={s['main-page__content']}>
        <h2 className={s['main-page__subheader']}>Частые вопросы</h2>
        <h3 className={s['main-page__text']}>Сколько игроков могут играть?</h3>
        <p className={s['main-page__text']}>
          От 3 до 12. В онлайне можно разделиться на команды.
        </p>
        <br />
        <h3 className={s['main-page__text']}>Нужна ли регистрация?</h3>
        <p className={s['main-page__text']}>
          Нет. Достаточно ввести ник и пригласить друзей по ссылке.
        </p>
      </section>

      <section className={s['main-page__content']}>
        <h2 className={s['main-page__subheader']}>Готов к веселью?</h2>
        <p className={s['main-page__text']}>
          Запускай «Крокодила» прямо сейчас и узнай, кто лучший актёр в
          компании!
        </p>
        <Button
          size="xl"
          className={s['main-page__button-play']}
          onClick={handleClick}>
          <PlayFill />
          Начать игру
        </Button>
      </section>
    </div>
  )
}
