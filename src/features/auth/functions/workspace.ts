import { createServerFn } from '@tanstack/react-start'
import { prisma } from '#/db'
import { createWorkspaceSchema } from '../schemas/workspace'

export const createWorkSpaceFn = createServerFn({ method: 'POST' })
  .inputValidator(createWorkspaceSchema)
  .handler(async ({ data }) => {
    await prisma.workspace.create({ data })
  })
