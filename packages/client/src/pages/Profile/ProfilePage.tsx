import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Text,
  Button,
  Flex,
  TextInput,
  Avatar,
  useFileInput,
} from '@gravity-ui/uikit'

import { usePage } from '@hooks/usePage'
import { Header } from '@components/Header'
import { ChangePasswordModal } from '@components/ChangePasswordModal/ChangePasswordModal'
import {
  fetchUserThunk,
  selectUser,
  logoutThunk,
  updateUserPartially,
} from '@slices/userSlice'
import { PageInitArgs } from 'routes'
import { API_URL } from '../../constants'
import { useDispatch, useSelector } from '../../store'
import styles from './ProfilePage.module.scss'

export const ProfilePage = () => {
  const [message, setMessage] = useState('')
  const user = useSelector(selectUser)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  usePage({ initPage: initProfilePage })

  const handleProfileUpdate = () => {
    fetch(`${API_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(user),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Ошибка обновления профиля: ${res.status}`)
        }
        setMessage('Профиль обновлен')
      })

      .catch(error => {
        setMessage('Ошибка при обновлении профиля: ' + error.message)
      })
  }

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk())
      navigate('/sign-in')
    } catch (error) {
      console.error('Ошибка при выходе:', error)
      setMessage('Ошибка при выходе из системы')
    }
  }

  const AvatarUpdate = () => {
    const onUpdate = React.useCallback(async (files: File[]) => {
      const formData = new FormData()
      formData.append('avatar', files[0] as File)
      const response = await fetch(`${API_URL}/user/profile/avatar`, {
        method: 'PUT',
        headers: {},
        credentials: 'include',
        body: formData,
      })
      const data = await response.json()
      dispatch(updateUserPartially({ avatar: data.avatar }))

      setMessage('Аватар изменен')
    }, [])
    const { controlProps, triggerProps } = useFileInput({
      onUpdate,
    })
    return (
      <React.Fragment>
        <input name="avatar" {...controlProps} />
        <Button {...triggerProps}>Загрузить</Button>
      </React.Fragment>
    )
  }

  return (
    <div className={styles['wrapper']}>
      <Helmet>
        <title>Профиль</title>
        <meta name="description" content="Страница профиля" />
      </Helmet>
      <Header />
      <div className={styles['profile-page']}>
        <Container maxWidth="m">
          <Text variant="header-2" className={styles['profile-page__title']}>
            Профиль
          </Text>
          <Flex direction="column" gap="4">
            <Flex gap="2" className={styles['profile-page__avatar']}>
              <Avatar
                alt={user?.first_name}
                size="xl"
                imgUrl={`${API_URL}/resources/${user?.avatar}`}
              />
              <AvatarUpdate />
            </Flex>
          </Flex>
          <Text variant="body-1" className={styles['profile-page__noty']}>
            {message}
          </Text>
          <Flex direction="column" gap="4">
            <Flex gap="2">
              <TextInput
                placeholder="Имя"
                value={user?.first_name}
                onChange={e =>
                  dispatch(updateUserPartially({ first_name: e.target.value }))
                }
              />
              <TextInput
                placeholder="Фамилия"
                value={user?.second_name}
                onChange={e =>
                  dispatch(updateUserPartially({ second_name: e.target.value }))
                }
              />
            </Flex>
            <Flex gap="2">
              <TextInput
                placeholder="Никнейм"
                value={user?.display_name}
                onChange={e =>
                  dispatch(
                    updateUserPartially({ display_name: e.target.value })
                  )
                }
              />
              <TextInput
                placeholder="Логин"
                value={user?.login}
                onChange={e =>
                  dispatch(updateUserPartially({ login: e.target.value }))
                }
              />
            </Flex>
            <Flex gap="2">
              <TextInput
                placeholder="Email"
                value={user?.email}
                onChange={e =>
                  dispatch(updateUserPartially({ email: e.target.value }))
                }
              />
              <TextInput
                placeholder="Телефон"
                value={user?.phone}
                onChange={e =>
                  dispatch(updateUserPartially({ phone: e.target.value }))
                }
              />
            </Flex>
            <Button view="action" onClick={handleProfileUpdate}>
              Обновить профиль
            </Button>
            <Button view="outlined-danger" onClick={handleLogout}>
              Выйти
            </Button>
          </Flex>
          <Flex
            direction="column"
            gap="4"
            className={styles['profile-page__password_link']}>
            <ChangePasswordModal />
          </Flex>
        </Container>
      </div>
    </div>
  )
}

export const initProfilePage = async ({ dispatch, state }: PageInitArgs) => {
  if (!selectUser(state)) {
    return dispatch(fetchUserThunk())
  }
}
