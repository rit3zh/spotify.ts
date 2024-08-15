export interface Search {
  tracks?: SearchTracks[];
  artist?: SearchArtist[];
  genres?: SearchGenres[];
  user?: SearchUsers[];
  podcasts?: SearchPodcast[];
  topResults?: SearchTopResults[];
  playlists?: SearchPlaylist[];
  albums?: SearchAlbums;
}
interface SearchAlbums {
  preRelease?: PreReleaseAlbums[];
  items?: SearchDeepAlbums[];
}

interface SearchDeepAlbums {
  title?: string;
  id?: string;
  artwork?: string;
  date?: number;
  type?: string;
}
interface PreReleaseAlbums {
  title?: string;
  type?: string;
  artwork?: string;
  id?: string;
  date?: number;
  timezone?: string;
}
interface SearchTopResults {
  artist?: SearchArtist[];
  track?: SearchTracks[];
  list?: SearchPlaylist[];
}
interface SearchPlaylist {
  id?: string;
  title?: string;
  format?: string;
  description?: string;
  image?: string;
  owner?: PlaylistOwner;
}

interface PlaylistOwner {
  name?: string;
  id?: string;
  image?: string;
}

interface SearchPodcast {
  title?: string;
  id?: string;
  type?: string;
  image?: string;
  publiser?: string;
  mediaType?: string;
}
interface SearchUsers {
  id?: string;
  username?: string;
  name?: string;
  type?: string;
  image?: string;
}
interface SearchGenres {
  name?: string;
  id?: string;
  type?: string;
  image?: string;
}
interface SearchArtist {
  name?: string;
  id?: string;
  verified?: boolean;
  type?: string;
  image?: string;
}

interface SearchTracks {
  title?: string;
  album?: SearchTrackAlbum;
  artists?: SearchTracksArtists[];
  duration?: number;
  contentRating?: string;
}

interface SearchTracksArtists {
  name?: string;
  id?: string;
}
interface SearchTrackAlbum {
  id?: string;
  artwork?: string;
  title?: string;
}
