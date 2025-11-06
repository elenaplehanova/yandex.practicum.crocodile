import { Avatar, Flex, Text } from '@gravity-ui/uikit'
import { EmojiReactions } from '../EmojiReactions'
import styles from './CommentWithReactions.module.scss'

export interface Comment {
  id: number
  content: string
  author: {
    id: number
    displayName: string
    avatar?: string
  }
  createdAt: string
}

interface CommentWithReactionsProps {
  comment: Comment
  className?: string
}

export const CommentWithReactions: React.FC<CommentWithReactionsProps> = ({
  comment,
  className,
}) => {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      <Flex direction="column" gap="4">
        <Flex gap="2" alignItems="center">
          <Avatar
            text={comment.author.displayName.charAt(0).toUpperCase()}
            size="s"
          />
          <Text variant="subheader-1">{comment.author.displayName}</Text>
          <Text variant="caption-1" className={styles.timestamp}>
            {new Date(comment.createdAt).toLocaleString('ru-RU')}
          </Text>
        </Flex>

        <Text className={styles.content}>{comment.content}</Text>

        <EmojiReactions commentId={comment.id} />
      </Flex>
    </div>
  )
}
