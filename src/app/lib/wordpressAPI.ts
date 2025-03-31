import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Create Apollo Client instance
const client = new ApolloClient({
  uri: 'https://srdevtest1.wpenginepowered.com/graphql',
  cache: new InMemoryCache(),
});

// Define villain type
export interface Villain {
  id: string;
  name: string;
  slug: string;
}

// Fetch villains from WordPress GraphQL
export async function fetchVillains(): Promise<Villain[]> {
  try {
    console.log('Fetching villains from WordPress...');
    
    const { data } = await client.query({
      query: gql`
        query GetVillains {
          villains {
            nodes {
              id
              title
              villainFields {
                slug
              }
            }
          }
        }
      `,
    });
    
    if (!data || !data.villains || !data.villains.nodes) {
      console.error('Invalid response from WordPress API');
      return getDefaultVillains();
    }
    
    // Transform the WordPress data to match our Villain interface
    const villains = data.villains.nodes.map((node: any) => {
      const slug = node.villainFields?.slug || slugify(node.title);
      const safeSlug = slug === 'all' ? 'all-villain' : slug;
      
      return {
        id: `villain-${node.id}`, 
        name: node.title,
        slug: safeSlug,
      };
    });
    
    console.log(`Successfully fetched ${villains.length} villains`);
    return villains;
    
  } catch (error) {
    console.error('Error fetching villains:', error);
    // Return default villains in case of error
    return getDefaultVillains();
  }
}

// Helper function to create a slug from a string
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

// Fallback villains in case the API fails
function getDefaultVillains(): Villain[] {
  return [
    { id: 'villain-doctor-octopus', name: 'Doctor Octopus', slug: 'doctor-octopus' },
    { id: 'villain-green-goblin', name: 'Green Goblin', slug: 'green-goblin' },
    { id: 'villain-venom', name: 'Venom', slug: 'venom' },
    { id: 'villain-carnage', name: 'Carnage', slug: 'carnage' },
    { id: 'villain-electro', name: 'Electro', slug: 'electro' },
    { id: 'villain-chameleon', name: 'Chameleon', slug: 'chameleon' },
    { id: 'villain-hobgoblin', name: 'Hobgoblin', slug: 'hobgoblin' },
    { id: 'villain-kraven', name: 'Kraven the Hunter', slug: 'kraven' },
    { id: 'villain-shocker', name: 'Shocker', slug: 'shocker' },
  ];
}