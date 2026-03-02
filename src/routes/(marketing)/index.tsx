import AIPromotion from '#/components/features/marketing/ai-promotion'
import HeroSection from '#/components/features/marketing/sections/hero.section'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(marketing)/')({
  component: MarketingPage,
})

function MarketingPage() {
  return (
    <>
      <AIPromotion />
      <HeroSection />
    </>
  )
}
