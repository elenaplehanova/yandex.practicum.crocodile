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
import styles from './Topic.module.scss'

export const TopicPage = () => {
  usePage({ initPage: initTopicPage })
  const [isFormExpanded, setIsFormExpanded] = useState(false)

  return (
    <div>
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
          {new Array(20).fill('').map((_, i) => (
            <Flex key={i} direction="column" gap="4">
              <Flex gap="2" alignItems="center">
                <Avatar text="AA" />
                <Text variant="subheader-1">Ник пользователя</Text>
              </Flex>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolorem incidunt laborum quaerat quis. Nesciunt possimus saepe
                temporibus. Alias atque beatae et, excepturi id laudantium
                molestias quasi quos reiciendis voluptas. A?
              </Text>
            </Flex>
          ))}
        </Flex>
      </Box>
    </div>
  )
}

export const initTopicPage = () => Promise.resolve()
