'use client';

import { useState } from 'react';
import HeroModal from './HeroModal';
import { Hero } from '../lib/types';

// Sample hero data
const heroes: Hero[] = [
  {
    id: '1',
    name: 'Spider-Man',
    realName: 'Peter Parker',
    bio: 'Bitten by a radioactive spider, Peter Parker gained the proportionate strength, speed, and agility of a spider. After his Uncle Ben was murdered by a burglar he could have stopped, Peter learned that with great power comes great responsibility.',
    image: 'https://i.annihil.us/u/prod/marvel/i/mg/9/30/538cd33e15ab7/standard_incredible.jpg',
    powers: ['Wall-crawling', 'Super strength', 'Spider-sense', 'Enhanced agility'],
    firstAppearance: 'Amazing Fantasy #15 (August 1962)'
  },
  {
    id: '2',
    name: 'Iron Man',
    realName: 'Tony Stark',
    bio: 'Wounded, captured and forced to build a weapon by his enemies, billionaire industrialist Tony Stark created an advanced suit of armor to save his life and escape captivity. Now with a new outlook on life, Tony uses his money and intelligence to make the world a safer, better place as Iron Man.',
    image: 'https://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55/standard_incredible.jpg',
    powers: ['Powered armor', 'Superhuman strength', 'Flight', 'Energy repulsors'],
    firstAppearance: 'Tales of Suspense #39 (March 1963)'
  },
  {
    id: '3',
    name: 'Black Widow',
    realName: 'Natasha Romanoff',
    bio: 'Trained from a young age by the KGB, Natasha Romanoff was a master spy and one of the world\'s greatest assassins. After joining S.H.I.E.L.D. and later the Avengers, she used her skills for good, becoming one of the most respected heroes in the Marvel Universe.',
    image: 'https://i.annihil.us/u/prod/marvel/i/mg/f/30/50fecad1f395b/standard_incredible.jpg',
    powers: ['Master martial artist', 'Espionage', 'Acrobatics', 'Tactical expertise'],
    firstAppearance: 'Tales of Suspense #52 (April 1964)'
  },
  {
    id: '4',
    name: 'Captain America',
    realName: 'Steve Rogers',
    bio: 'During World War II, Steve Rogers volunteered to receive the experimental Super-Soldier Serum. Enhanced to the pinnacle of human perfection, he became Captain America and fought the Nazis and Japanese. Frozen in suspended animation, he was revived in the modern world to continue the fight for liberty.',
    image: 'https://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087/standard_incredible.jpg',
    powers: ['Peak human strength', 'Enhanced stamina', 'Master tactician', 'Indestructible shield'],
    firstAppearance: 'Captain America Comics #1 (March 1941)'
  }
];

export default function FeaturedHeroes() {
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  
  return (
    <section id="heroes" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Marvel Heroes</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Click on a hero to learn more about their powers, background, and adventures.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {heroes.map((hero) => (
            <div 
              key={hero.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105 hover:shadow-xl"
              onClick={() => setSelectedHero(hero)}
            >
              <img 
                src={hero.image} 
                alt={hero.name}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">{hero.name}</h3>
                <p className="text-gray-600 text-sm mb-2">Real Name: {hero.realName}</p>
                <p className="text-gray-700">
                  {hero.bio.length > 100 ? `${hero.bio.substring(0, 100)}...` : hero.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedHero && (
        <HeroModal 
          hero={selectedHero} 
          onClose={() => setSelectedHero(null)} 
        />
      )}
    </section>
  );
}