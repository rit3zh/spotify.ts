export interface Sections {
  title?: string;
  pagingInfo?: PagingInfo;
  items?: SectionsItems[];
}

export interface SectionsItems {
  title?: string;
  albums?: SectionIAlbums[];
  playlists?: SectionIPlaylists[];
}

interface SectionIPlaylists {
  description?: string;
  images?: string;
  format?: string;
  owner?: PlaylistOwner;
  id?: string;
}

interface SectionIAlbums {
  title?: string;
  id?: string;
  artists?: AlbumArtists[];
  artwork?: string;
}
interface PagingInfo {
  nextOffSet?: number | null;
}

interface PlaylistOwner {
  name?: string;
  type?: string;
}

interface AlbumArtists {
  name?: string;
  id?: string;
}
