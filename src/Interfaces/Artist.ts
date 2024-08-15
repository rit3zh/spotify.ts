export interface Artist {
  id?: string;
  name?: string;
  verified?: boolean;
  type?: string;
  cities?: ArtistCities[];
  biography?: string;
  image?: string;
  rank?: number;
  header?: string;
  gallery?: string[];
  followers?: number;
  listeners?: number;
  externalLinks?: ArtistExternalLinks[];
  pinned?: Pinned;
  latest?: ArtistLatest;
  playlist?: ArtistPlaylist[];
  albums?: ArtistAlbums[];
  popular?: ArtistAlbums[];
  compilations?: ArtistAlbums[];
  singles?: ArtistAlbums[];
  tracks?: ArtistTracks[];
  appearsOn?: ArtistAppearsOn[];
  discover?: ArtistDiscover[];
  featuring?: ArtistFeaturing[];
  artists?: IArtists[];
}

interface ArtistCities {
  city?: string;
  country?: string;
  listeners?: number;
  region?: string;
}
interface ArtistExternalLinks {
  name?: string;
  url?: string;
}
interface IArtists {
  id?: string;
  name?: string;
  image?: string;
}
interface ArtistFeaturing {
  title?: string;
  type?: string;
  description?: string;
  id?: string;
  image?: string;
  owner?: Owner;
}
interface ArtistDiscover {
  title?: string;
  type?: string;
  description?: string;
  id?: string;
  image?: string;
  owner?: Owner;
}

interface ArtistAppearsOn {
  title?: string;
  id?: string;
  type?: string;
  artwork?: string;
  date?: number;
  artists?: ArtistAlbum[];
}
interface ArtistTracks {
  title?: any;
  album?: {
    id?: string;
    artwork?: string;
  };
  artists?: ArtistAlbum[];
  duration?: number;
  id?: string;
  plays?: string | number;
  disc?: number;
  contentRating?: string;
}

interface ArtistAlbum {
  name?: string;
  id?: string;
}
interface ArtistAlbums {
  title?: string;
  id?: string;
  artwork?: string;
  label?: string;
  date?: number;
  copyright?: ArtistCopyRight[];
  type?: string;
  count?: number;
}
interface ArtistPlaylist {
  type?: string;
  title?: string;
  id?: string;
  owner?: Owner;
  images?: string;
}

interface Owner {
  name?: string;
  type?: string;
}

interface Pinned {
  name?: string;
  type?: string;
  artwork?: string;
  id?: string;
}

interface ArtistLatest {
  title?: string;
  id?: string;
  artwork?: string;
  label?: string;
  date?: number;
  copyright?: ArtistCopyRight[];
  type?: string;
  count?: number;
}

interface ArtistCopyRight {
  text?: string;
  type?: string;
}
