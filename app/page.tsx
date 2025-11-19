import Navigation from '@/components/navigation'
import HeroSection from '@/components/hero-section'
import FeaturedCoins from '@/components/featured-coins'
import HowItWorks from '@/components/how-it-works'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="w-full">
      <Navigation />
      <HeroSection />
      <FeaturedCoins />
      <HowItWorks />
      <Footer />
    </main>
  )
}
