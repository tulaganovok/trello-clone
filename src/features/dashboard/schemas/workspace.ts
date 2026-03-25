import { z } from 'zod'

export const createWorkspaceSchema = z.object({
  name: z.string().min(3),
  type: z.string().min(5),
  description: z.string(),
})
