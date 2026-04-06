import { z } from 'zod'

export const updateListOrderSchema = z.object({
  lists: z.array(
    z.object({
      boardId: z.string(),
      id: z.string(),
      order: z.number(),
      title: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  ),
})

export const createListSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(32, 'Title must be less than 32 characters'),
  boardId: z.string(),
})

export const listIdSchema = z.object({
  listId: z.string(),
})
