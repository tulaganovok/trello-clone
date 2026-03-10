import AIPromotion from '#/features/marketing/components/ai-promotion'
import OnboardingCarousel from '#/features/marketing/components/sections/about'
import Hero from '#/features/marketing/components/sections/hero'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(marketing)/')({
  component: MarketingPage,
})

function MarketingPage() {
  return (
    <>
      <AIPromotion />
      <Hero />
      <OnboardingCarousel />
    </>
  )
}
