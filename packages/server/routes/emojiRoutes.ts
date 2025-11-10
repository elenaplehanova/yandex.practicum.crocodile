import { Router, Request, Response } from 'express'
import { reactionService } from '../services/reactionService'
import { query } from '../utils/db'

const router = Router()

const getUserId = (req: Request): number => {
  const userId = (req as any).user?.id || (req as any).userId
  if (!userId) {
    throw new Error('User ID not found')
  }
  return userId
}

router.get('/comment/:commentId', async (req: Request, res: Response) => {
  try {
    const commentId = parseInt(req.params.commentId, 10)
    if (isNaN(commentId)) {
      return res.status(400).json({ reason: 'Invalid comment ID' })
    }

    const reactions = await reactionService.getReactionsByCommentId(commentId)
    return res.json({
      commentId,
      reactions,
    })
  } catch (error: any) {
    console.error('Error getting reactions:', error)
    console.error('Error stack:', error.stack)
    return res.status(500).json({
      reason: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
})

router.post('/reaction', async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req)
    const { emoji, commentId } = req.body

    if (!emoji || !commentId) {
      return res.status(400).json({ reason: 'Missing emoji or commentId' })
    }

    const reaction = await reactionService.addReaction(emoji, userId, commentId)
    return res.json(reaction)
  } catch (error: any) {
    console.error('Error adding reaction:', error)
    console.error('Error stack:', error.stack)
    if (error.message === 'User ID not found') {
      return res.status(401).json({ reason: 'Unauthorized' })
    }
    return res.status(500).json({
      reason: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
})

router.delete('/reaction/:reactionId', async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req)
    const reactionId = parseInt(req.params.reactionId, 10)

    if (isNaN(reactionId)) {
      return res.status(400).json({ reason: 'Invalid reaction ID' })
    }

    const reaction = await query(
      'SELECT comment_id FROM reactions WHERE id = $1',
      [reactionId]
    )

    if (reaction.rows.length === 0) {
      return res.status(404).json({ reason: 'Reaction not found' })
    }

    const deleted = await reactionService.removeReaction(reactionId, userId)
    if (!deleted) {
      return res
        .status(404)
        .json({ reason: 'Reaction not found or unauthorized' })
    }

    return res.json({ commentId: reaction.rows[0].comment_id })
  } catch (error: any) {
    console.error('Error removing reaction:', error)
    if (error.message === 'User ID not found') {
      return res.status(401).json({ reason: 'Unauthorized' })
    }
    return res.status(500).json({ reason: 'Internal server error' })
  }
})

router.get('/available', (_req: Request, res: Response) => {
  res.json([
    '😀',
    '😂',
    '😍',
    '🤔',
    '👍',
    '👎',
    '❤️',
    '🔥',
    '💯',
    '🎉',
    '😢',
    '😡',
    '🤯',
    '👏',
    '🙌',
    '💪',
    '🎯',
    '🚀',
    '⭐',
    '💡',
  ])
})

export default router
