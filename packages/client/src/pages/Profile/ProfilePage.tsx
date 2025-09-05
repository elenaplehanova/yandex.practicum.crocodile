import { useEffect, useState } from 'react'
import { usePage } from '../../hooks/usePage'
import {
  Container,
  Text,
  Button,
  Flex,
  TextInput,
  Avatar,
  useFileInput,
  Modal,
} from '@gravity-ui/uikit'
import { API_URL } from '../../constants'
import React from 'react'
import styles from './ProfilePage.module.scss'

export const ProfilePage = () => {
  const [newFirstName, setNewFirstName] = useState('')
  const [newSecondName, setNewSecondName] = useState('')
  const [newDisplayName, setNewDisplayName] = useState('')
  const [newLogin, setNewLogin] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newAvatar, setNewAvatar] = useState('')
  const [open, setOpen] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState('')
  const [message, setMessage] = useState('')

  const tempUserLogin = async () => {
    // временное решение пока не реализована авторизация / регистрация
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: 'dizman',
        password: 'Siteadmin1',
      }),
      credentials: 'include',
    })
    const data = await response.text()
    return data
  }

  const getUserInfo = async () => {
    const response = await fetch(`${API_URL}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    const data = await response.json()
    return data
  }

  usePage({ initPage: initProfilePage })

  useEffect(() => {
    tempUserLogin().then(() => {
      getUserInfo()
        .then(data => {
          setNewFirstName(data.first_name)
          setNewSecondName(data.second_name)
          setNewDisplayName(data.display_name)
          setNewLogin(data.login)
          setNewEmail(data.email)
          setNewPhone(data.phone)
          setNewAvatar(data.avatar)
          setAvatarPreview(API_URL + '/resources/' + data.avatar)
          setMessage('')
        })
        .catch(error => {
          setMessage(
            'Ошибка при загрузке информации о пользователе: ' + error.message
          )
        })
    })
  }, [])

  const handleProfileUpdate = () => {
    fetch(`${API_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        first_name: newFirstName,
        second_name: newSecondName,
        display_name: newDisplayName,
        login: newLogin,
        email: newEmail,
        phone: newPhone,
      }),
    })
      .then(() => {
        getUserInfo().then(data => {
          setNewFirstName(data.first_name)
          setNewSecondName(data.second_name)
          setNewDisplayName(data.display_name)
          setNewLogin(data.login)
          setNewEmail(data.email)
          setNewPhone(data.phone)
          setAvatarPreview(API_URL + '/resources/' + data.avatar)
          setMessage('Профиль обновлен')
        })
      })
      .catch(error => {
        setMessage('Ошибка при обновлении профиля: ' + error.message)
      })
  }

  const AvatarUpdate = () => {
    const [newAvatar, setNewAvatar] = useState('')
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
      setNewAvatar(data.avatar)
      setAvatarPreview(API_URL + '/resources/' + data.avatar)
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

  const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const handlePasswordChange = () => {
      fetch(`${API_URL}/user/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      }).then(response => {
        if (response.ok) {
          setPasswordError('Пароль успешно изменен')
        } else {
          response.text().then(text => setPasswordError(text))
        }
      })
    }

    return (
      <React.Fragment>
        <Flex gap="2" className={styles['password-input']}>
          <TextInput
            label="Старый пароль"
            type="password"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
          />
          <TextInput
            label="Новый пароль"
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </Flex>
        <Flex direction="column" gap="2" className={styles['password-btns']}>
          {passwordError && <Text variant="body-1">{passwordError}</Text>}
          <Button onClick={handlePasswordChange}>Сменить пароль</Button>
        </Flex>
      </React.Fragment>
    )
  }

  return (
    <div className={styles['profile-page']}>
      <Container maxWidth="m">
        <Text variant="header-2" className={styles['profile-title']}>
          Профиль
        </Text>
        <Flex direction="column" gap="4">
          <Flex gap="2" className={styles['profile-avatar']}>
            <Avatar alt={newFirstName} size="xl" imgUrl={avatarPreview} />
            <AvatarUpdate />
          </Flex>
        </Flex>
        <Text variant="body-1" className={styles['profile-noty']}>
          {message}
        </Text>
        <Flex direction="column" gap="4">
          <Flex gap="2">
            <TextInput
              placeholder="Имя"
              value={newFirstName}
              onChange={e => setNewFirstName(e.target.value)}
            />
            <TextInput
              placeholder="Фамилия"
              value={newSecondName}
              onChange={e => setNewSecondName(e.target.value)}
            />
          </Flex>
          <Flex gap="2">
            <TextInput
              placeholder="Никнейм"
              value={newDisplayName}
              onChange={e => setNewDisplayName(e.target.value)}
            />
            <TextInput
              placeholder="Логин"
              value={newLogin}
              onChange={e => setNewLogin(e.target.value)}
            />
          </Flex>
          <Flex gap="2">
            <TextInput
              placeholder="Email"
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
            />
            <TextInput
              placeholder="Телефон"
              value={newPhone}
              onChange={e => setNewPhone(e.target.value)}
            />
          </Flex>
          <Button view="action" onClick={handleProfileUpdate}>
            Обновить профиль
          </Button>
        </Flex>
        <Flex
          direction="column"
          gap="4"
          className={styles['profile-password_link']}>
          <Button onClick={() => setOpen(true)}>Поменять пароль</Button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ChangePassword />
          </Modal>
        </Flex>
      </Container>
    </div>
  )
}

export const initProfilePage = () => Promise.resolve()
