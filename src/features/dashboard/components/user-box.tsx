import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import { Button } from '#/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '#/components/ui/popover'
import { Separator } from '#/components/ui/separator'
import type { User } from '#/generated/prisma/client'
import { authClient } from '#/lib/auth-client'
import { useNavigate } from '@tanstack/react-router'
import { ChevronRight, SquareArrowOutUpRight, Users } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface UserBoxProps {
  user: User
}

export default function UserBox({ user }: UserBoxProps) {
  const [isSigningOut, setIsSigningOut] = useState(false)
  const navigate = useNavigate()

  const onSignOut = async () => {
    setIsSigningOut(true)

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            navigate({ to: '/sign-in' })
          },
          onError: ({ error }) => {
            toast.error(error.message)
          },
        },
      })
    } catch {
      toast.error('Failed to sign out')
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={'icon-sm'} asChild>
          <Avatar className="size-7">
            <AvatarFallback className="uppercase text-background bg-primary text-sm">
              {user.name.at(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        sideOffset={10}
        className="min-w-80 px-0 shadow-lg"
      >
        <PopoverHeader className="pt-2 px-4">
          <PopoverTitle className="text-xs text-muted-foreground font-semibold">
            ACCOUNT
          </PopoverTitle>
          <PopoverDescription />
        </PopoverHeader>

        <div className="flex items-center gap-x-2 mt-3 px-4">
          <Avatar className="size-10">
            <AvatarFallback className="uppercase text-background bg-primary text-xl">
              {user.name.at(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <h3 className="text-sm">{user.name}</h3>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>

        <div className="flex flex-col mt-3">
          <Button
            variant={'ghost'}
            className="w-full justify-start rounded-0 font-normal px-4 text-neutral-700"
          >
            Switch accounts
          </Button>

          <Button
            variant={'ghost'}
            className="w-full justify-start rounded-0 font-normal px-4"
          >
            <div className="size-full flex items-center justify-between">
              <span className="text-neutral-700">Manage account</span>
              <SquareArrowOutUpRight className="size-3.5 stroke-neutral-700 mr-2" />
            </div>
          </Button>
        </div>

        <div className="px-4 my-2">
          <Separator />
        </div>

        <div className="px-4 py-2">
          <h4 className="text-xs text-muted-foreground font-semibold ">
            TRELLO
          </h4>
        </div>

        <div className="flex flex-col">
          {['Profile and visibility', 'Activity', 'Cards', 'Settings'].map(
            (item, index) => (
              <Button
                key={index}
                variant={'ghost'}
                className="w-full justify-start rounded-0 font-normal px-4 text-neutral-700"
              >
                {item}
              </Button>
            ),
          )}

          <Button
            variant={'ghost'}
            className="w-full justify-start rounded-0 font-normal px-4"
          >
            <div className="size-full flex items-center justify-between">
              <span className="text-neutral-700">Theme</span>
              <ChevronRight className="size-5 stroke-neutral-700 mr-2" />
            </div>
          </Button>
        </div>

        <div className="px-4 my-2">
          <Separator />
        </div>

        <Button
          variant={'ghost'}
          className="w-full justify-start rounded-0 font-normal px-4"
        >
          <div className="size-full flex items-center gap-x-2">
            <Users className="size-5 stroke-neutral-700" />
            <span className="text-neutral-700">Create Workspace</span>
          </div>
        </Button>

        <div className="px-4 my-2">
          <Separator />
        </div>

        <div className="flex flex-col">
          {['Help', 'Shortcuts'].map((item, index) => (
            <Button
              key={index}
              variant={'ghost'}
              className="w-full justify-start rounded-0 font-normal px-4 text-neutral-700"
            >
              {item}
            </Button>
          ))}
        </div>

        <div className="px-4 my-2">
          <Separator />
        </div>

        <Button
          variant={'ghost'}
          className="w-full justify-start rounded-0 font-normal px-4 text-neutral-700"
          disabled={isSigningOut}
          onClick={onSignOut}
        >
          Log out
        </Button>
      </PopoverContent>
    </Popover>
  )
}
