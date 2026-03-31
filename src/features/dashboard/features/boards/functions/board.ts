import { authFnMiddleware } from '#/middleware/auth'
import { createServerFn } from '@tanstack/react-start'
import {
  createBoardSchema,
  getBoardByIdSchema,
  updateBoardTitleSchema,
} from '../schemas/board'
import { prisma } from '#/db'
import { getContext } from '#/integrations/tanstack-query/root-provider'

export const createBoardFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .inputValidator(createBoardSchema)
  .handler(async ({ data }) => {
    return await prisma.board.create({ data })
  })

export const getBoardByIdFn = createServerFn({ method: 'GET' })
  .middleware([authFnMiddleware])
  .inputValidator(getBoardByIdSchema)
  .handler(async ({ data }) => {
    const board = await prisma.board.update({
      where: { id: data.boardId },
      include: { lists: { include: { cards: true } } },
      data: { viewedAt: new Date() },
    })

    const { queryClient } = getContext()
    await queryClient.invalidateQueries({ queryKey: ['recently-viewed'] })

    return board
  })

export const getRecentlyViewedBoardsFn = createServerFn({ method: 'GET' })
  .middleware([authFnMiddleware])
  .handler(async ({ context }) => {
    const allRecentlyViewedBoards = await prisma.board.findMany({
      orderBy: { viewedAt: 'desc' },
      take: 4,
    })

    const userWorkspaces = await prisma.workspace.findMany({
      where: { userId: context.session.user.id },
    })
    const userWorkspacesIds = userWorkspaces.map((workspace) => workspace.id)

    const userRecentlyViewedBoards = allRecentlyViewedBoards.filter((board) =>
      userWorkspacesIds.includes(board.workspaceId),
    )

    return userRecentlyViewedBoards
  })

export const updateBoardTitleFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .inputValidator(updateBoardTitleSchema)
  .handler(async ({ data }) => {
    return await prisma.board.update({
      where: { id: data.boardId },
      data: { title: data.title },
    })
  })
