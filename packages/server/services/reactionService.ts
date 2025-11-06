import { query } from '../utils/db'

export interface EmojiReaction {
  id: number
  emoji: string
  userId: number
  commentId: number
  createdAt: string
}

export const reactionService = {
  async getReactionsByCommentId(commentId: number): Promise<EmojiReaction[]> {
    try {
      const result = await query(
        'SELECT id, emoji, user_id as "userId", comment_id as "commentId", created_at as "createdAt" FROM reactions WHERE comment_id = $1 ORDER BY created_at ASC',
        [commentId]
      )
      return result.rows.map(row => ({
        ...row,
        createdAt: row.createdAt.toISOString(),
      }))
    } catch (error: any) {
      console.error('Database error in getReactionsByCommentId:', error)
      throw error
    }
  },

  async addReaction(
    emoji: string,
    userId: number,
    commentId: number
  ): Promise<EmojiReaction> {
    const existing = await query(
      'SELECT id FROM reactions WHERE user_id = $1 AND comment_id = $2 AND emoji = $3',
      [userId, commentId, emoji]
    )

    if (existing.rows.length > 0) {
      const result = await query(
        'SELECT id, emoji, user_id as "userId", comment_id as "commentId", created_at as "createdAt" FROM reactions WHERE id = $1',
        [existing.rows[0].id]
      )
      return {
        ...result.rows[0],
        createdAt: result.rows[0].createdAt.toISOString(),
      }
    }

    const result = await query(
      'INSERT INTO reactions (emoji, user_id, comment_id) VALUES ($1, $2, $3) RETURNING id, emoji, user_id, comment_id, created_at',
      [emoji, userId, commentId]
    )
    const row = result.rows[0]
    return {
      id: row.id,
      emoji: row.emoji,
      userId: row.user_id,
      commentId: row.comment_id,
      createdAt: row.created_at.toISOString(),
    }
  },

  async removeReaction(reactionId: number, userId: number): Promise<boolean> {
    const result = await query(
      'DELETE FROM reactions WHERE id = $1 AND user_id = $2 RETURNING id',
      [reactionId, userId]
    )
    return result.rows.length > 0
  },

  async getReactionsByCommentIds(
    commentIds: number[]
  ): Promise<Map<number, EmojiReaction[]>> {
    if (commentIds.length === 0) {
      return new Map()
    }

    const placeholders = commentIds.map((_, i) => `$${i + 1}`).join(', ')
    const result = await query(
      `SELECT id, emoji, user_id as "userId", comment_id as "commentId", created_at as "createdAt" FROM reactions WHERE comment_id IN (${placeholders}) ORDER BY created_at ASC`,
      commentIds
    )

    const reactionsMap = new Map<number, EmojiReaction[]>()

    result.rows.forEach(row => {
      const commentId = row.commentId
      if (!reactionsMap.has(commentId)) {
        reactionsMap.set(commentId, [])
      }
      reactionsMap.get(commentId)!.push({
        ...row,
        createdAt: row.createdAt.toISOString(),
      })
    })

    return reactionsMap
  },
}
