import { Button, Text } from '@gravity-ui/uikit'
import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { EmojiPicker } from '../EmojiPicker'
import styles from './EmojiReactions.module.scss'

interface EmojiReaction {
  id: string
  emoji: string
  userId: number
  commentId: number
}

interface EmojiReactionsProps {
  commentId: number
  className?: string
}

interface ReactionGroup {
  emoji: string
  count: number
  userReactionId?: string
}

const reactionsStorage = new Map<number, EmojiReaction[]>()
let nextReactionId = 1

const initializeDemoReactions = () => {
  if (reactionsStorage.size === 0) {
    reactionsStorage.set(1, [
      { id: 'demo_1', emoji: '👍', userId: 1, commentId: 1 },
      { id: 'demo_2', emoji: '❤️', userId: 2, commentId: 1 },
      { id: 'demo_3', emoji: '😂', userId: 3, commentId: 1 },
    ])
    reactionsStorage.set(2, [
      { id: 'demo_4', emoji: '🔥', userId: 1, commentId: 2 },
      { id: 'demo_5', emoji: '💯', userId: 2, commentId: 2 },
    ])
    reactionsStorage.set(3, [
      { id: 'demo_6', emoji: '🎉', userId: 1, commentId: 3 },
      { id: 'demo_7', emoji: '👏', userId: 2, commentId: 3 },
      { id: 'demo_8', emoji: '🚀', userId: 3, commentId: 3 },
    ])
    nextReactionId = 100
  }
}

initializeDemoReactions()

export const EmojiReactions: React.FC<EmojiReactionsProps> = ({
  commentId,
  className,
}) => {
  const { user: currentUser } = useAuth()
  const [reactions, setReactions] = useState<EmojiReaction[]>([])

  useEffect(() => {
    const storedReactions = reactionsStorage.get(commentId) || []
    setReactions(storedReactions)
  }, [commentId])

  const handleEmojiSelect = (emoji: string) => {
    if (!currentUser) {
      return
    }

    const existingReaction = reactions.find(
      r => r.emoji === emoji && r.userId === currentUser.id
    )

    if (existingReaction) {
      const newReactions = reactions.filter(r => r.id !== existingReaction.id)
      setReactions(newReactions)
      reactionsStorage.set(commentId, newReactions)
    } else {
      const newReaction: EmojiReaction = {
        id: `reaction_${nextReactionId++}`,
        emoji,
        userId: currentUser.id,
        commentId,
      }
      const newReactions = [...reactions, newReaction]
      setReactions(newReactions)
      reactionsStorage.set(commentId, newReactions)
    }
  }

  const handleReactionClick = (reactionId: string) => {
    if (!currentUser) return

    const newReactions = reactions.filter(r => r.id !== reactionId)
    setReactions(newReactions)
    reactionsStorage.set(commentId, newReactions)
  }

  const reactionGroups: ReactionGroup[] = []
  const emojiMap = new Map<string, { count: number; userReactionId?: string }>()

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
