export default function CallToAction() {
  return (
    <section className="py-16 bg-red-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the Marvel Community</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Sign up for our newsletter to get the latest updates on comics, movies, TV shows, and more!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="px-4 py-3 rounded-md text-gray-900 flex-grow"
          />
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-md">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}