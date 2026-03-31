import type { Board } from '#/generated/prisma/client'
import BoardTitleForm from './forms/board-title.form'

interface BoardNavbarProps {
  board: Board
}

export default function BoardNavbar({ board }: BoardNavbarProps) {
  return (
    <div className="w-full h-14 z-40 bg-black/30 fixed top-12 flex items-center px-6 gap-x-4 text-white justify-between">
      <BoardTitleForm board={board} />
      {/* <BoardOptions boardId={board.id} /> */}
    </div>
  )
}
