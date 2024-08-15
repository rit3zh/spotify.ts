import { User } from "@/Interfaces/User";
import { extractSpotifyID } from "@/Utils/getSpotifyId";

export function parseUser(body: any): User {
  const user = body;
  const name = user?.name;
  const id = extractSpotifyID(user?.uri);
  const image = user?.image_url;
  const following = user?.followers_count;
  const followers = user?.following_count;
  const playlists = user?.public_playlists?.map((item: any) => ({
    name: item?.name,
    id: extractSpotifyID(item?.uri),
    image: item?.image_url,
    followers: item?.followers_count,
    owner: {
      name: item?.owner_name,
      id: extractSpotifyID(item?.owner_uri),
    },
  }));
  const color = `#${user?.color}`;
  const followersHidden = user?.show_follows;
  return {
    id,
    name,
    image,
    following,
    followers,
    playlists,
    color,
    followersHidden,
  };
}
