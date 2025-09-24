import { Button, Flex } from '@gravity-ui/uikit'
import { useNavigate } from 'react-router-dom'
import { TopicCard } from '../../components/TopicCard'
import { usePage } from '../../hooks/usePage'
import styles from './Forum.module.scss'
import { Helmet } from 'react-helmet'
import { Header } from '@components/Header'

export const ForumPage = () => {
  usePage({ initPage: initForumPage })
  const navigate = useNavigate()

  return (
    <div className={styles['wrapper']}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forum</title>
        <meta name="description" content="Страница форума" />
      </Helmet>
      <Header />
      <Flex className={styles['root']} direction="column" gap="4">
        <Flex justifyContent="flex-end">
          <Button size="xl" view="action" onClick={() => navigate('submit')}>
            Создать тему
          </Button>
        </Flex>
        <Flex
          className={styles['topic-list']}
          direction="column"
          gapRow="4"
          as="ul">
          {new Array(5).fill('').map((topic, i) => (
            <li key={i}>
              <TopicCard />
            </li>
          ))}
        </Flex>
      </Flex>
    </div>
  )
}

export const initForumPage = () => Promise.resolve()
