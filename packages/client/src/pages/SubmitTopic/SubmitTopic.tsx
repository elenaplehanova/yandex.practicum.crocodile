import { Button, Flex, TextArea, TextInput } from '@gravity-ui/uikit'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { withAuth } from '../../hocs/withAuth'
import styles from './SubmitTopic.module.scss'

export const SubmitTopicPage: FC = withAuth(() => {
  const navigate = useNavigate()

  return (
    <Flex
      className={styles['root']}
      direction="column"
      justifyContent="center"
      alignItems="center">
      <form className={styles['form']}>
        <TextInput label="Заголовок" size="xl" />
        <TextArea rows={5} size="xl" placeholder="Введите сообщение" />
        <Flex gap="2" justifyContent="flex-end">
          <Button onClick={() => navigate('/forum')}>Отмена</Button>
          <Button
            type="submit"
            view="action"
            onClick={() => navigate('/forum/1')}>
            Отправить
          </Button>
        </Flex>
      </form>
    </Flex>
  )
})

export const initSubmitTopicPage = () => Promise.resolve()
