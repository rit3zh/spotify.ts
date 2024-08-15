export interface GenreHeader {
  title?: string;
  color?: string;
  image?: string;
}
export interface GenreItems {
  title?: string;
  id?: string;
  sections?: GenreSections[];
}
export interface GenreSections {
  playlist?: GenrePlaylist;
  album?: GenreAlbums;
}

export interface Genre {
  header?: GenreHeader;
  items?: GenreItems[];
}

export interface GenreAlbums {
  type?: string;
  title?: string;
  id?: string;
  image?: string;
  artists?: GenreAlbumArtists[];
}

export interface GenrePlaylist {
  title?: string;
  id?: string;
  format?: string;
  description?: string;
  type?: string;
  owner?: GenrePlaylistOwner;
}
interface GenreAlbumArtists {
  name?: string;
  id?: string;
}
interface GenrePlaylistOwner {
  name?: string;
  type?: string;
}
