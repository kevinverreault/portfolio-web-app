 type Album = {
  title: string;
  count: number;
  photos: ImageMetadata[]
}

type ImageMetadata = {
  id: string;
  order: number;
  metadata: {
    description: string;
  }
}

interface SiteMetadata {
  albums: Album[]
}

export type { SiteMetadata, Album }
