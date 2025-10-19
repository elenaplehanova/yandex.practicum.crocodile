import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Text,
  TextArea,
} from '@gravity-ui/uikit'
import { useState } from 'react'
import { usePage } from '../../hooks/usePage'
import {
  CommentWithReactions,
  Comment,
} from '../../components/CommentWithReactions'
import styles from './Topic.module.scss'
import { Header } from '@components/Header'
import { Helmet } from 'react-helmet'

export const TopicPage = () => {
  usePage({ initPage: initTopicPage })
  const [isFormExpanded, setIsFormExpanded] = useState(false)

  const mockComments: Comment[] = new Array(5).fill('').map((_, i) => ({
    id: i + 1,
    content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem incidunt laborum quaerat quis. Nesciunt possimus saepe temporibus. Alias atque beatae et, excepturi id laudantium molestias quasi quos reiciendis voluptas. A? ${
      i + 1
    }`,
    author: {
      id: i + 1,
      displayName: `Пользователь ${i + 1}`,
    },
    createdAt: new Date(Date.now() - i * 3600000).toISOString(),
  }))

  return (
    <div className={styles['wrapper']}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forum: theme name</title>
        <meta name="description" content="Страница темы форума" />
      </Helmet>
      <Header />
      <Box className={styles['root']}>
        <Flex direction="column" gapRow="4">
          <Text variant="header-2">Название темы</Text>
          <Text variant="body-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem
            incidunt laborum quaerat quis. Nesciunt possimus saepe temporibus.
            Alias atque beatae et, excepturi id laudantium molestias quasi quos
            reiciendis voluptas. A?
          </Text>
          <Divider />
          <TextArea
            placeholder="Вступить в беседу"
            rows={isFormExpanded ? 3 : 1}
            size="xl"
            onFocus={() => setIsFormExpanded(true)}
          />
          {isFormExpanded && (
            <Flex gap="2" justifyContent="flex-end">
              <Button onClick={() => setIsFormExpanded(false)}>Отменить</Button>
              <Button view="action">Отправить</Button>
            </Flex>
          )}
          <Divider />
          {mockComments.map(comment => (
            <CommentWithReactions key={comment.id} comment={comment} />
          ))}
        </Flex>
      </Box>
    </div>
  )
}

export const initTopicPage = () => Promise.resolve()
