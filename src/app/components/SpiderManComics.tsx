// src/app/components/SpiderManComics.tsx
'use client';

import { useState, useEffect } from 'react';
import { fetchSpiderManComics, getMarvelImageUrl } from '../lib/marvelApi';
import { fetchVillains } from '../lib/wordpressApi';
import { MarvelComic } from '../lib/marvelApi';
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
        setVillains([{ id: 'all', name: 'All Villains', slug: 'all' }, ...data]);
      } catch (err) {
        console.error('Failed to load villains:', err);
        // Fallback is handled in the fetchVillains function
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

  // Reset visible comics when villain filter changes
  useEffect(() => {
    setVisibleComics(9);
  }, [selectedVillain]);

  // Filter comics by villain
  const filteredComics = selectedVillain === 'all'
    ? comics
    : comics.filter(comic => comic.villain === selectedVillain);

  // Get comics to display based on visibility limit
  const comicsToDisplay = filteredComics.slice(0, visibleComics);

  // Check if there are more comics to load
  const hasMoreComics = filteredComics.length > visibleComics;

  // Handle load more click
  const handleLoadMore = () => {
    setVisibleComics(prev => prev + 9);
  };

  // Rest of component remains the same...
  return (
    // JSX implementation as provided in the previous example
  );
}