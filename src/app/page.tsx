import HeroSection from './components/HeroSection'
import FeaturedHeroes from './components/FeaturedHeroes'
import NewsAndUpdates from './components/NewsAndUpdates'
import CallToAction from './components/CallToAction'
export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedHeroes />
      <NewsAndUpdates />
      <CallToAction />
    </>
  )
}