// /app/api/villains/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Make the GraphQL request from the server side
    const response = await fetch('https://srdevtest1.wpenginepowered.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetVillains {
            villains {
              nodes {
                id
                title
                villainInformation {
                  villainSlug
                }
              }
            }
          }
        `
      }),
      next: { revalidate: 60 } // Cache for 60 seconds
    });

    const result = await response.json();
    
    if (!result.data || !result.data.villains || !result.data.villains.nodes) {
      return NextResponse.json({ message: 'No villains found' }, { status: 404 });
    }
    
    // Transform the data
    const villains = result.data.villains.nodes.map((node: any) => ({
      id: node.id,
      name: node.title,
      slug: node.villainInformation?.villainSlug || slugify(node.title)
    }));
    
    // Return the villains data
    return NextResponse.json(villains);
  } catch (error) {
    console.error('Error fetching villains from WordPress:', error);
    return NextResponse.json({ message: 'Failed to fetch villains' }, { status: 500 });
  }
}

// Helper function to create a slug from a string
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}