export interface Playlist {
  title?: string;
  id?: string;
  type?: string;
  format?: string;
  followers?: number;
  permission?: string;
  description?: string;
  items?: PlaylistItems[];
  owner?: PlaylistOwner;
  headerImage?: string;
}

export interface PlaylistOwner {
  name?: string;
  id?: string;
  username?: string;
  image?: string;
  type?: string;
}

export interface PlaylistItems {
  addedAt?: string;
  title?: string;
  type?: string;
  artists?: PlaylistItemArtists[];
  duration?: number;
  id?: string;
  album?: PlaylistItemAlbum;
}

interface PlaylistItemArtists {
  name?: string;
  id?: string;
}

interface PlaylistItemAlbum {
  name?: string;
  id?: string;
  artwork?: string;
  artists?: PlaylistItemArtists[];
}
