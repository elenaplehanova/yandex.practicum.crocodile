import { Comment } from '@gravity-ui/icons'
import { Button, Card, Flex, Icon, Text } from '@gravity-ui/uikit'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './TopicCard.module.scss'

export const TopicCard: FC = () => {
  const navigate = useNavigate()

  return (
    <Card
      className={styles['root']}
      type="action"
      size="l"
      view="raised"
      onClick={() => navigate('1')}>
      <Flex direction="column" gapRow="4" alignItems="flex-start">
        <Text variant="header-2">Название темы</Text>
        <Text variant="body-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem
          incidunt laborum quaerat quis. Nesciunt possimus saepe temporibus.
          Alias atque beatae et, excepturi id laudantium molestias quasi quos
          reiciendis voluptas. A?
        </Text>
        <Button
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation()
            navigate('1')
          }}>
          <Icon data={Comment}></Icon>5
        </Button>
      </Flex>
    </Card>
  )
}
