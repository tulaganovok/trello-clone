import { Card } from '#/components/ui/card'
import type { Board } from '#/generated/prisma/client'
import { Link } from '@tanstack/react-router'

interface BoardCardProps {
  board: Board
}

export default function BoardCard({ board }: BoardCardProps) {
  return (
    <Link to='/board/$boardId' params={{ boardId: board.id }} >
      <Card
        role="button"
        className="flex flex-col p-0 gap-0 cursor-pointer relative h-28"
      >
        <img
          src={board.imageThumbUrl}
          alt={board.title}
          className="w-full rounded-lg absolute h-full"
        />
        <h3 className="px-2 py-2 text-sm absolute bottom-0 bg-background w-full rounded-b-lg">{board.title}</h3>
      </Card>
    </Link>
  )
}
