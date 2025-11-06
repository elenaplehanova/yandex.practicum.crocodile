import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_PROXY_URL } from '../constants'

export interface ErrorResponse {
  reason: string
}

export interface EmojiReaction {
  id: number
  emoji: string
  userId: number
  commentId: number
  createdAt: string
}

export interface AddEmojiReactionPayload {
  emoji: string
  commentId: number
}

export interface RemoveEmojiReactionPayload {
  reactionId: number
}

export interface CommentReactionsResponse {
  commentId: number
  reactions: EmojiReaction[]
}

const EMOJI_URL = '/emoji'

const emojiApi = createApi({
  reducerPath: 'emojiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_PROXY_URL,
    credentials: 'include',
    fetchFn: typeof window !== 'undefined' ? fetch : undefined,
    responseHandler: async response => {
      const contentType = response.headers.get('content-type')
      if (contentType?.includes('application/json')) {
        return await response.json()
      }
      return await response.text()
    },
  }),
  tagTypes: ['EmojiReaction'],
  endpoints: builder => ({
    getCommentReactions: builder.query<CommentReactionsResponse, number>({
      query: commentId => ({
        url: `${EMOJI_URL}/comment/${commentId}`,
        method: 'GET',
      }),
      transformResponse: (response: any, meta, commentId) => ({
        commentId,
        reactions: [
          {
            id: 1,
            emoji: '👍',
            userId: 1,
            commentId,
            createdAt: new Date().toISOString(),
          },
          {
            id: 2,
            emoji: '❤️',
            userId: 2,
            commentId,
            createdAt: new Date().toISOString(),
          },
          {
            id: 3,
            emoji: '😂',
            userId: 3,
            commentId,
            createdAt: new Date().toISOString(),
          },
        ],
      }),
      providesTags: (result, error, commentId) => [
        { type: 'EmojiReaction', id: commentId },
      ],
    }),

    addEmojiReaction: builder.mutation<EmojiReaction, AddEmojiReactionPayload>({
      query: body => ({
        url: `${EMOJI_URL}/reaction`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { commentId }) => [
        { type: 'EmojiReaction', id: commentId },
      ],
    }),

    removeEmojiReaction: builder.mutation<void, RemoveEmojiReactionPayload>({
      query: ({ reactionId }) => ({
        url: `${EMOJI_URL}/reaction/${reactionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { reactionId }) => [
        { type: 'EmojiReaction', id: reactionId },
      ],
    }),

    getAvailableEmojis: builder.query<string[], void>({
      query: () => ({
        url: `${EMOJI_URL}/available`,
        method: 'GET',
      }),
      transformResponse: () => [
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
      ],
    }),
  }),
})

export const {
  useGetCommentReactionsQuery,
  useAddEmojiReactionMutation,
  useRemoveEmojiReactionMutation,
  useGetAvailableEmojisQuery,
} = emojiApi

export default emojiApi
