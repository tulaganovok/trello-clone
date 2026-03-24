import { z } from 'zod'

export const createWorkspaceSchema = z.object({
  userId: z.string().min(3),
  title: z.string().min(3),
})
