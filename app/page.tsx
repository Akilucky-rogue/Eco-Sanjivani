import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { CommunitySection } from "@/components/community-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CommunitySection />
      <Footer />
    </div>
  )
}
