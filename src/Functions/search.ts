import { client } from "../Structure/RequestClient";
import {
  createSpotifyAlbumParams,
  fixDoubleEncodedUrl,
  getSpotifyURL,
} from "../Modifiers/url+modifiers";
import { createSpotifySearchAllParams } from "../Modifiers/url+modifiers";
import { createSpotifyAuthorizationContext } from "../Structure/Context";
import { searchParser } from "../Parser/search.parser";
import { Search } from "../Interfaces/Search";
interface PagePagination {
  offSet?: number;
  limit?: number;
}
interface IOptions {
  query: string;
  pagePagination?: PagePagination;
  topResults?: number;
  filter?: "songs" | "albums" | "artists" | "playlists";
}

export async function search<T extends IOptions>(
  options: IOptions
): Promise<Search> {
  const token = await client.getAccessToken();
  const context = createSpotifyAuthorizationContext(token);
  const params = createSpotifySearchAllParams({
    query: options.query,
    offSet: options?.pagePagination?.offSet ?? 0,
    limit: options?.pagePagination?.limit ?? 10,
    topResults: options?.topResults ?? 5,
  });
  const spotifyResolvedObjectURL: string = getSpotifyURL(params);
  const doubleEncodedURL: string = fixDoubleEncodedUrl(
    spotifyResolvedObjectURL
  );
  const fetchRequest = await client.request(doubleEncodedURL, {
    ...context,
  });
  return searchParser(fetchRequest);
}
