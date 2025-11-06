import { Button, Flex, TextArea, TextInput } from '@gravity-ui/uikit'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SubmitTopic.module.scss'
import { Header } from '@components/Header'
import { Helmet } from 'react-helmet'

export const SubmitTopicPage: FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles['wrapper']}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Submit</title>
        <meta
          name="description"
          content="Страница создания новой темы форума"
        />
      </Helmet>
      <Header />
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
    </div>
  )
}

export const initSubmitTopicPage = () => Promise.resolve()
