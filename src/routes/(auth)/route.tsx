import { Card, CardContent, CardFooter, CardHeader } from '#/components/ui/card'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { Dot, ExternalLink } from 'lucide-react'

export const Route = createFileRoute('/(auth)')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className="relative w-full h-screen ">
      <div className="fixed w-screen h-screen -z-10 bg-secondary">
        <div className="absolute bottom-0 left-0 size-92 max-md:hidden">
          <img
            src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/trello-left.4f52d13c.svg"
            alt="Auth Image 1"
          />
        </div>

        <div className="absolute bottom-0 right-0 size-92 max-md:hidden">
          <img
            src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/trello-right.e6e102c7.svg"
            alt="Auth Image 1"
          />
        </div>
      </div>

      <div className="relative">
        <Card className="absolute w-full md:w-100 left-1/2 -translate-x-1/2 md:top-12 border-transparent shadow-lg rounded-md p-8 max-md:pt-4 max-md:px-16">
          <CardHeader className="p-0">
            <Link to="/" className="flex items-center justify-center gap-x-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Q_s3E7qym0Kxn36S0V2iAm9Pht5QuYz8bQ&s"
                alt="Auth Logo"
                className="size-10 rounded-xl"
              />

              <span className="text-4xl font-medium">Trello</span>
            </Link>
          </CardHeader>

          <CardContent className="p-0">
            <Outlet />
          </CardContent>

          <CardFooter className="border-t flex flex-col gap-y-3">
            <div className="h-6 w-full flex items-center justify-center">
              <img src="/auth-footer-logo.svg" alt="" className="h-full" />
            </div>

            <div className="flex items-center gap-x-0.5">
              <p className="text-[10px] text-center">
                One account for Trello, Jira, Confluence and{' '}
                <span className="text-primary underline">more</span>.
              </p>
              <ExternalLink className="size-3 stroke-primary" />
            </div>

            <div className="flex items-center justify-center gap-x-1">
              <div className="flex items-center gap-x-0.5">
                <h6 className="text-primary underline text-[10px]">
                  Privacy Policy
                </h6>
                <ExternalLink className="size-3 stroke-primary" />
              </div>

              <Dot className="size-3 stroke-primary" />

              <div className="flex items-center gap-x-0.5">
                <h6 className="text-primary underline text-[10px]">
                  User Notice
                </h6>
                <ExternalLink className="size-3 stroke-primary" />
              </div>
            </div>

            <p className="text-[10px] text-center">
              This site is protected by reCAPTCHA and the Google{' '}
              <span className="text-primary underline">Privacy Policy﻿</span>
              and{' '}
              <span className="text-primary underline">
                Terms of Service﻿
              </span>{' '}
              apply.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
