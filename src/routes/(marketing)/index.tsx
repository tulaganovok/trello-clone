import AIPromotion from '#/features/marketing/components/ai-promotion'
import About from '#/features/marketing/components/sections/about'
import Community from '#/features/marketing/components/sections/community'
import Feedback from '#/features/marketing/components/sections/feedback'
import GetStarted from '#/features/marketing/components/sections/get-started'
import Hero from '#/features/marketing/components/sections/hero'
import Message from '#/features/marketing/components/sections/message'
import Work from '#/features/marketing/components/sections/work'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(marketing)/')({
  component: MarketingPage,
})

function MarketingPage() {
  return (
    <>
      <AIPromotion />

      {/* Sections */}
      <Hero />
      <About />
      <Message />
      <Work />
      <Feedback />
      <Community />
      <GetStarted />
    </>
  )
}
