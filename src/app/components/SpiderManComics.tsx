'use client';

import { useState, useEffect } from 'react';
import { fetchSpiderManComics, getMarvelImageUrl } from '../lib/marvelapi';
import { fetchVillains } from '../lib/wordpressAPI';
import { MarvelComic } from '../lib/marvelapi';
import { Villain } from '../lib/types';

export default function SpiderManComics() {
  const [comics, setComics] = useState<MarvelComic[]>([]);
  const [villains, setVillains] = useState<Villain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedVillain, setSelectedVillain] = useState('all');
  const [visibleComics, setVisibleComics] = useState(9); // Show 9 comics at first

  // Fetch villains from WordPress on component mount
  useEffect(() => {
    async function loadVillains() {
      try {
        const data = await fetchVillains();

        // Check the data for duplicates to help debug
        const slugs = new Set();
        data.forEach(v => {
          if (slugs.has(v.slug)) {
            console.warn(`Duplicate villain slug found: ${v.slug}`);
          }
          slugs.add(v.slug);
        });

        setVillains([
          { id: 'option-all-villains', name: 'All Villains', slug: 'all' },
          ...data
        ]);
      } catch (err) {
        console.error('Failed to load villains:', err);
      }
    }

    loadVillains();
  }, []);

  // Fetch comics from Marvel API on component mount
  useEffect(() => {
    async function loadComics() {
      try {
        setLoading(true);
        const data = await fetchSpiderManComics();
        setComics(data);
        setError(false);
      } catch (err) {
        console.error('Failed to load comics:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadComics();
  }, []);

  useEffect(() => {
    setVisibleComics(9);
  }, [selectedVillain]);

  // Filter comics by villain
  const filteredComics = selectedVillain === 'all'
    ? comics
    : comics.filter(comic => comic.villain === selectedVillain);

  const comicsToDisplay = filteredComics ? filteredComics.slice(0, visibleComics) : [];
  const hasMoreComics = filteredComics ? visibleComics < filteredComics.length : false;

  const handleLoadMore = () => {
    setVisibleComics(prev => prev + 9);
  };

  return (
    <section id="comics" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Spider-Man Comics (2022)</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the latest Spider-Man comics from 2022. Filter by villain to find specific storylines.
          </p>
        </div>

        {/* Villain filter */}
        <div className="mb-8 flex justify-center">
          <select
            value={selectedVillain}
            onChange={(e) => setSelectedVillain(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            {villains.map((villain) => (
              <option key={`select-option-${villain.id}`} value={villain.slug}>
                {villain.name}
              </option>
            ))}
          </select>
        </div>

        <hr className="mb-8" />

        {/* Comics grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, index) => (
              <div key={`skeleton-${index}`} className="bg-gray-200 rounded-lg h-[400px] animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">Unable to load comics. Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {comicsToDisplay && comicsToDisplay.length > 0 ? (
                comicsToDisplay.map((comic) => (
                  <div key={`comic-${comic.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-[2/3] overflow-hidden">
                      <img
                        src={getMarvelImageUrl(comic.thumbnail.path, comic.thumbnail.extension)}
                        alt={comic.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{comic.title}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Issue #{comic.issueNumber}
                        </span>
                        <span className="text-sm font-semibold text-red-600">
                          ${comic.prices[0]?.price || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-lg text-gray-600">No comics found for the selected villain.</p>
                </div>
              )}
            </div>

            {/* Load More Button */}
            {hasMoreComics && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleLoadMore}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}