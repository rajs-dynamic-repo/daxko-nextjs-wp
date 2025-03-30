export default function NewsAndUpdates() {
  const newsItems = [
    {
      id: '1',
      title: 'Spider-Man: No Way Home Breaks Box Office Records',
      date: '2022-01-15',
      excerpt: 'The latest Spider-Man film continues to dominate the global box office with unprecedented numbers.',
      image: 'https://i.annihil.us/u/prod/marvel/i/mg/6/b0/61d4794272911/clean.jpg',
    },
    {
      id: '2',
      title: 'New Comic Series Announced for Spider-Man',
      date: '2022-02-22',
      excerpt: 'Marvel reveals a new comic series focusing on Spider-Man\'s adventures with Doctor Strange.',
      image: 'https://i.annihil.us/u/prod/marvel/i/mg/c/80/621e6cafa9dfd/clean.jpg',
    },
    {
      id: '3',
      title: 'Spider-Man Universe Expands with New Characters',
      date: '2022-03-10',
      excerpt: 'Marvel introduces new characters to join the Spider-Man universe in upcoming comics.',
      image: 'https://i.annihil.us/u/prod/marvel/i/mg/9/d0/62b5eca1c47c1/clean.jpg',
    }
  ];

  return (
    <section id="news" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">News & Updates</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay up-to-date with the latest news from the Marvel Universe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{new Date(item.date).toLocaleDateString()}</p>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <a href="#" className="text-red-600 hover:text-red-800 font-semibold">Read More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}