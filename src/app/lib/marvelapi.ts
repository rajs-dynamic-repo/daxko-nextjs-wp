import axios from 'axios';
import crypto from 'crypto';

// Types
export interface MarvelComic {
  id: number;
  title: string;
  description: string | null;
  thumbnail: {
    path: string;
    extension: string;
  };
  issueNumber: number;
  prices: { price: number }[];
  dates: { date: string }[];
  villain?: string | null;
}

// Get hash for Marvel API
function getMarvelHash(timestamp: string) {
  const privateKey = process.env.NEXT_PUBLIC_MARVEL_API_PRIVATE_KEY || '';
  const publicKey = process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY || '';
  
  return crypto
    .createHash('md5')
    .update(timestamp + privateKey + publicKey)
    .digest('hex');
}

// Helper function to determine villain based on comic content
function determineVillain(comic: any): string | null {
  const title = comic.title?.toLowerCase() || '';
  const description = comic.description?.toLowerCase() || '';
  
  if (title.includes('goblin') || description.includes('goblin')) {
    return 'green-goblin';
  } else if (title.includes('venom') || description.includes('venom')) {
    return 'venom';
  } else if (title.includes('octopus') || description.includes('octopus') || 
             title.includes('doc ock') || description.includes('doc ock')) {
    return 'doctor-octopus';
  } else if (title.includes('electro') || description.includes('electro')) {
    return 'electro';
  } else if (title.includes('carnage') || description.includes('carnage')) {
    return 'carnage';
  } else if (title.includes('chameleon') || description.includes('chameleon')) {
    return 'chameleon';
  } else if (title.includes('hobgoblin') || description.includes('hobgoblin')) {
    return 'hobgoblin';
  } else if (title.includes('kraven') || description.includes('kraven')) {
    return 'kraven';
  } else if (title.includes('shocker') || description.includes('shocker')) {
    return 'shocker';
  }
  
  return null;
}

// Fetch Spider-Man comics from 2022
export async function fetchSpiderManComics(): Promise<MarvelComic[]> {
  try {
    const publicKey = process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY || '';
    const privateKey = process.env.NEXT_PUBLIC_MARVEL_API_PRIVATE_KEY || '';
    
    if (!publicKey || !privateKey) {
      console.error('Marvel API keys are not configured properly');
      throw new Error('Marvel API configuration error');
    }
    
    const timestamp = Date.now().toString();
    const hash = getMarvelHash(timestamp);
    
    console.log('Fetching Spider-Man comics from Marvel API...');
    
    const response = await axios.get('https://gateway.marvel.com/v1/public/comics', {
      params: {
        ts: timestamp,
        apikey: publicKey,
        hash: hash,
        characters: '1009610', // Spider-Man character ID
        startYear: '2022',     // Comics from 2022
        orderBy: 'issueNumber',
        limit: 100
      }
    });
    
    if (response.status !== 200 || !response.data || !response.data.data || !response.data.data.results) {
      console.error('Invalid response from Marvel API:', response.status);
      throw new Error('Failed to fetch Spider-Man comics: Invalid response');
    }
    
    console.log(`Successfully fetched ${response.data.data.results.length} Spider-Man comics`);
    
    // Process the comics data and add villain information
    const comics = response.data.data.results.map((comic: any) => {
      // Add villain information based on comic content
      const villain = determineVillain(comic);
      
      return {
        id: comic.id,
        title: comic.title || 'Unknown Title',
        description: comic.description,
        thumbnail: {
          path: comic.thumbnail?.path || 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
          extension: comic.thumbnail?.extension || 'jpg'
        },
        issueNumber: comic.issueNumber || 0,
        prices: comic.prices || [{ price: 0 }],
        dates: comic.dates || [{ date: new Date().toISOString() }],
        villain
      };
    });
    
    return comics;
    
  } catch (error) {
    // Handle specific error types
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Marvel API error response:', error.response.status, error.response.data);
        throw new Error(`Marvel API error: ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from Marvel API:', error.request);
        throw new Error('Network error: No response from Marvel API');
      } else {
        console.error('Error setting up Marvel API request:', error.message);
        throw new Error(`Request setup error: ${error.message}`);
      }
    }
    
    // Generic error handling for non-Axios errors
    console.error('Error fetching Spider-Man comics:', error);
    throw new Error('Failed to fetch Spider-Man comics');
  }
}

export function getMarvelImageUrl(path: string, extension: string, size = 'portrait_incredible') {
  if (path.includes('image_not_available')) {
    return 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_incredible.jpg';
  }
  return `${path}/${size}.${extension}`;
}