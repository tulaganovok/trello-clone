import type { Board, Workspace } from "#/generated/prisma/client";

export interface WorkspaceWithBoards extends Workspace {
  boards:Board[]
}