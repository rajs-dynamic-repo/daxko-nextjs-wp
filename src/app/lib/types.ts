export interface Hero {
  id: string;
  name: string;
  realName: string;
  bio: string;
  image: string;
  powers: string[];
  firstAppearance: string;
}

export interface Villain {
  id: string;
  name: string;
  slug: string;
}