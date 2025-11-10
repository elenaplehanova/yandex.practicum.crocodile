import { Button, Text } from '@gravity-ui/uikit'
import { useAuth } from '../../hooks/useAuth'
import { EmojiPicker } from '../EmojiPicker'
import {
  useGetCommentReactionsQuery,
  useAddEmojiReactionMutation,
  useRemoveEmojiReactionMutation,
} from '../../apis/emojiApi'
import styles from './EmojiReactions.module.scss'

interface EmojiReactionsProps {
  commentId: number
  className?: string
}

interface ReactionGroup {
  emoji: string
  count: number
  userReactionId?: number
}

export const EmojiReactions: React.FC<EmojiReactionsProps> = ({
  commentId,
  className,
}) => {
  const { user: currentUser } = useAuth()
  const { data: reactionsData, isLoading } =
    useGetCommentReactionsQuery(commentId)
  const [addReaction] = useAddEmojiReactionMutation()
  const [removeReaction] = useRemoveEmojiReactionMutation()

  const reactions = reactionsData?.reactions || []

  const handleEmojiSelect = async (emoji: string) => {
    if (!currentUser) {
      return
    }

    const existingReaction = reactions.find(
      r => r.emoji === emoji && r.userId === currentUser.id
    )

    if (existingReaction) {
      await removeReaction({ reactionId: existingReaction.id })
    } else {
      await addReaction({ emoji, commentId })
    }
  }

  const handleReactionClick = async (reactionId: number) => {
    if (!currentUser) return
    await removeReaction({ reactionId })
  }

  const reactionGroups: ReactionGroup[] = []
  const emojiMap = new Map<string, { count: number; userReactionId?: number }>()

  reactions.forEach(reaction => {
    const existing = emojiMap.get(reaction.emoji)
    if (existing) {
      existing.count++
      if (reaction.userId === currentUser?.id) {
        existing.userReactionId = reaction.id
      }
    } else {
      emojiMap.set(reaction.emoji, {
        count: 1,
        userReactionId:
          reaction.userId === currentUser?.id ? reaction.id : undefined,
      })
    }
  })

  emojiMap.forEach((data, emoji) => {
    reactionGroups.push({
      emoji,
      count: data.count,
      userReactionId: data.userReactionId,
    })
  })

  if (isLoading) {
    return <div className={className}>Загрузка реакций...</div>
  }

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.reactions}>
        {reactionGroups.map((group, index) => (
          <Button
            key={`${group.emoji}-${index}`}
            size="s"
            view={group.userReactionId ? 'action' : 'outlined'}
            onClick={() =>
              group.userReactionId && handleReactionClick(group.userReactionId)
            }
            className={styles.reactionButton}>
            <span className={styles.emoji}>{group.emoji}</span>
            <Text variant="caption-1" className={styles.count}>
              {group.count}
            </Text>
          </Button>
        ))}
      </div>

      {currentUser && (
        <div className={styles.addReaction}>
          <EmojiPicker onEmojiSelect={handleEmojiSelect} />
        </div>
      )}

      {!currentUser && (
        <div style={{ fontSize: '12px', color: '#999' }}>
          Нужна авторизация для добавления реакций
        </div>
      )}
    </div>
  )
}
