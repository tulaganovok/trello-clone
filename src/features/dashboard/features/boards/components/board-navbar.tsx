import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import type { Board, User } from '#/generated/prisma/client'
import {
  Menu,
  MoreHorizontal,
  Plug,
  Star,
  UserPlus,
  Users,
  Zap,
} from 'lucide-react'
import BoardTitleForm from './forms/board-title.form'
import { Button } from '#/components/ui/button'

interface BoardNavbarProps {
  board: Board
  user: User
}

export default function BoardNavbar({ board, user }: BoardNavbarProps) {
  return (
    <div className="w-full h-14 z-40 bg-black/30 fixed top-12 flex items-center px-4 gap-x-4 text-white justify-between">
      <BoardTitleForm board={board} />

      <div className="flex items-center gap-x-4">
        <Avatar className="max-md:hidden">
          <Avatar className="size-7">
            <AvatarFallback className="uppercase text-background bg-primary text-sm">
              {user.name.at(0)}
            </AvatarFallback>
          </Avatar>
        </Avatar>

        <Plug className="stroke-background size-5 max-md:hidden" />
        <Zap className="stroke-background size-5 max-md:hidden" />
        <Menu className="stroke-background size-5" />
        <Star className="stroke-background size-5 max-md:hidden" />
        <Users className="stroke-background size-5 max-md:hidden" />

        <Button size={'sm'} variant={'secondary'} className="max-md:hidden">
          <UserPlus /> Share
        </Button>

        <MoreHorizontal className="stroke-background size-5" />
      </div>
    </div>
  )
}
