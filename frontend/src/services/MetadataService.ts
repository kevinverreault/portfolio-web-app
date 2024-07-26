import type { Album, SiteMetadata } from "../types/SiteMetadata";
import siteMetadata from "../metadata.json";

class MetadataService {
  private metadata: SiteMetadata;

  constructor() {
    this.metadata = siteMetadata;
  }

  public getAlbum(albumName: string): Album {
    const albumIndex = this.metadata.albums.findIndex(x => x.title === albumName.toLowerCase());
    if (albumIndex < 0) {
      throw Error(`Album ${albumName} not found in metadata`);
    }
  
    return this.metadata.albums[albumIndex];
  }
}

const metadataService = new MetadataService();
export default metadataService;
