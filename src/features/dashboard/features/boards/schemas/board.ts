import { z } from 'zod'

export const boardFormSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(32, 'Title must be less than 32 characters'),
  image: z.string().min(3, 'Wallpaper is required'),
})

export const createBoardSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(32, 'Title must be less than 32 characters'),
  workspaceId: z.string(),
  imageId: z.string(),
  imageThumbUrl: z.string(),
  imageFullUrl: z.string(),
  imageLinkHtml: z.string(),
  imageUserName: z.string(),
})

export const getBoardByIdSchema = z.object({
  boardId: z.string(),
})

export const titleSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(32, 'Title must be less than 32 characters'),
})

export const updateBoardTitleSchema = z.object({
  boardId: z.string(),
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(32, 'Title must be less than 32 characters'),
})
