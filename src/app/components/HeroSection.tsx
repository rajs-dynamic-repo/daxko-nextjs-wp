export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gray-900 text-white">
      <div className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url ('https://srdevtest1.wpenginepowered.com/wp-content/uploads/2025/03/spiddy-scaled.webp')` }}>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"></div>

      <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            DISCOVER THE MARVEL UNIVERSE
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Explore Spider-Man comics from 2022 and learn about your favorite Marvel heroes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded">
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}