interface AlbumCopyRight {
  text?: string;
  type?: string;
}
export interface Album {
  type?: string;
  label?: string;
  title?: string;
  copyright?: AlbumCopyRight[];
  date?: string;
  id?: string;
  artwork?: string;
  colors?: AlbumColors;
  disc?: AlbumDisc[];
  more?: AlbumMoreByArtist[];
  items?: AlbumItems[];
}
export interface AlbumDisc {
  number?: number;
  totalTracks?: number;
}
interface AlbumColors {
  dark?: string;
  light?: string;
  raw?: string;
}

export interface AlbumItems {
  title?: string;
  artists?: AlbumArtists[];
  disc?: number;
  id?: string;
  duration?: number;
  trackNumber?: number;
}
export interface AlbumArtists {
  name?: string;
  id?: string;
}

export interface AlbumMoreByArtist {
  type?: string;
  title?: string;
  id?: string;
  artwork?: string;
  date?: number;
}
