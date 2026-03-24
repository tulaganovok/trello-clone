import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import {
  Bell,
  LayoutGrid,
  Megaphone,
  MessageCircleQuestionMark,
  Search,
} from 'lucide-react'
import UserBox from './user-box'
import type { User } from '#/generated/prisma/client'
import { Link } from '@tanstack/react-router'

interface NavbarProps {
  user: User
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <div className="fixed bg-background h-12 border-b w-full">
      <div className="size-full flex items-center justify-between px-4">
        <div className="flex items-center">
          <Button
            size={'icon-sm'}
            variant={'ghost'}
            className="rounded-sm"
            asChild
          >
            <Link to="/boards">
              <LayoutGrid className="size-4 stroke-gray-500" />
            </Link>
          </Button>

          <Button size={'sm'} variant={'ghost'} asChild className="px-2">
            <Link to="/boards" className="flex items-center gap-x-2">
              <img
                src="/logo.jpg"
                alt="Logo"
                width={25}
                height={25}
                className="rounded-md"
              />
              <span className="font-semibold max-md:hidden text-sky-950">
                Trello
              </span>
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-x-2">
          <div className="w-8 md:w-3xl relative h-8">
            <Search className="absolute left-2 top-2 size-4 stroke-gray-500" />
            <Input
              className="inset-0 h-full px-7.5 rounded-sm focus-visible:border-primary max-md:hidden border-gray-400"
              placeholder="Search"
            />
          </div>

          <Button size={'sm'} className="rounded-sm">
            Create
          </Button>
        </div>

        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <Button size={'icon-sm'} variant={'ghost'} className="rounded-sm">
              <Megaphone className="size-4.5" />
            </Button>

            <Button size={'icon-sm'} variant={'ghost'} className="rounded-sm">
              <Bell className="size-4.5" />
            </Button>

            <Button size={'icon-sm'} variant={'ghost'} className="rounded-sm">
              <MessageCircleQuestionMark className="size-4.5" />
            </Button>
          </div>

          <UserBox user={user} />
        </div>
      </div>
    </div>
  )
}
