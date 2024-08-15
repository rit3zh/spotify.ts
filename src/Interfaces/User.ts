export interface User {
  id?: string;
  name?: string;
  image?: string;
  followers?: number;
  following?: number;

  color?: string;
  followersHidden?: boolean;
  playlists?: UserPlaylists[];
}

interface UserPlaylists {
  name?: string;
  id?: string;
  followers?: number;
  image?: string;
  owner?: PlaylistUserOwner;
}

interface PlaylistUserOwner {
  name?: string;
  id?: string;
}
