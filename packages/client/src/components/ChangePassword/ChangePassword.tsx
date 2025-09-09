import { Button, Flex, TextInput, Text } from '@gravity-ui/uikit'
import React, { FC, useState } from 'react'
import { API_URL } from '../../constants'
import styles from './ChangePassword.module.scss'

export const ChangePassword: FC = () => {
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
