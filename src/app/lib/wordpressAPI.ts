// src/app/lib/wordpressApi.ts
import { gql } from '@apollo/client';
import { apolloClient } from './apolloClient';
import { Villain } from '../types';

// GraphQL query to fetch villains from WordPress
const GET_VILLAINS = gql`
  query GetVillains {
    villains {
      nodes {
        id
        title
        slug
        villainDetails {
          villainSlug
        }
      }
    }
  }
`;

// Function to fetch villains from WordPress
export async function fetchVillains(): Promise<Villain[]> {
  try {
    const { data } = await apolloClient.query({
      query: GET_VILLAINS,
    });

    // Transform WordPress data to match our app's Villain type
    return data.villains.nodes.map((node: any) => ({
      id: node.id,
      name: node.title,
      slug: node.villainDetails?.villainSlug || node.slug,
    }));
  } catch (error) {
    console.error('Error fetching villains from WordPress:', error);
    
    // Fallback to static villains array if WordPress API fails
    return [
      { id: 'all', name: 'All Villains', slug: 'all' },
      { id: 'doc-ock', name: 'Doctor Octopus', slug: 'doctor-octopus' },
      { id: 'carnage', name: 'Carnage', slug: 'carnage' },
      { id: 'chameleon', name: 'Chameleon', slug: 'chameleon' },
      { id: 'electro', name: 'Electro', slug: 'electro' },
      { id: 'green-goblin', name: 'Green Goblin', slug: 'green-goblin' },
      { id: 'hobgoblin', name: 'Hobgoblin', slug: 'hobgoblin' },
      { id: 'kraven', name: 'Kraven the Hunter', slug: 'kraven' },
      { id: 'venom', name: 'Venom', slug: 'venom' },
      { id: 'shocker', name: 'Shocker', slug: 'shocker' }
    ];
  }
}