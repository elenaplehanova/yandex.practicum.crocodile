import { Button, Flex } from '@gravity-ui/uikit'
import { useNavigate } from 'react-router-dom'
import { TopicCard } from '../../components/TopicCard'
import { usePage } from '../../hooks/usePage'
import styles from './Forum.module.scss'

export const ForumPage = () => {
  usePage({ initPage: initForumPage })
  const navigate = useNavigate()

  return (
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
  )
}

export const initForumPage = () => Promise.resolve()
