import { createSpotifyAuthorizationContext } from "../Structure/Context";
import { client } from "../Structure/RequestClient";

import { parseUser } from "../Parser/user.parser";
import { User } from "../Interfaces/User";

interface PaginationOptions {
  playlistLimit?: number;
  artistLimit?: number;
}
interface IOptions {
  id: string;
  paginationOptions?: PaginationOptions;
}

export async function getUser<T extends IOptions>(options: T): Promise<User> {
  const token = await client.getAccessToken();
  const context = createSpotifyAuthorizationContext(token);
  const MODIFIED_URL: string = `https://spclient.wg.spotify.com/user-profile-view/v3/profile/${
    options?.id
  }?playlist_limit=${
    options?.paginationOptions?.playlistLimit ?? 10
  }&artist_limit=${
    options?.paginationOptions?.artistLimit ?? 10
  }&episode_limit=10&market=from_token`;
  const fetchRequest = await client.request(MODIFIED_URL, {
    ...context,
  });

  return parseUser(fetchRequest);
}
