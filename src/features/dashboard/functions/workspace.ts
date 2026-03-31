import { authFnMiddleware } from '#/middleware/auth'
import { prisma } from '#/db'
import { createServerFn } from '@tanstack/react-start'
import { createWorkspaceSchema } from '../schemas/workspace'

export const getUserWorkspacesFn = createServerFn({ method: 'GET' })
  .middleware([authFnMiddleware])
  .handler(async ({ context }) => {
    const userWorkspaces = await prisma.workspace.findMany({
      where: { userId: context.session.user.id },
    })

    return userWorkspaces
  })

export const createWorkspaceFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .inputValidator(createWorkspaceSchema)
  .handler(async ({ context, data }) => {
    await prisma.workspace.create({
      data: {
        ...data,
        description: data.description || null,
        userId: context.session.user.id,
      },
    })
  })

export const getUserDetailedWorkspacesFn = createServerFn({ method: 'GET' })
  .middleware([authFnMiddleware])
  .handler(async ({ context }) => {
    return await prisma.workspace.findMany({
      where: { userId: context.session.user.id },
      include: { boards: true },
    })
  })
