import { Modal, Button, Flex, TextInput, Text } from '@gravity-ui/uikit'
import { FC, useState } from 'react'
import { ChangePassword } from '../ChangePassword/ChangePassword'
import styles from './ChangePasswordModal.module.scss'

export const ChangePasswordModal: FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Поменять пароль</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ChangePassword />
      </Modal>
    </>
  )
}
