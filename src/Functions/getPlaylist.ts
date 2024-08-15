import { createSpotifyAuthorizationContext } from "@/Structure/Context";
import { client } from "@/Structure/RequestClient";
import {
  createSpotifyPlaylisrParams,
  fixDoubleEncodedUrl,
  getSpotifyURL,
} from "@/Modifiers/url+modifiers";
import { playlistParser } from "@/Parser/playlist.parser";
import { Playlist } from "@/Interfaces/Playlist";

interface PagePagination {
  offSet?: number;
  limit?: number;
}
interface IOptions {
  id: string;
  pagePagination?: PagePagination;
}
export async function getPlaylist<T extends IOptions>(
  options: T
): Promise<Playlist> {
  const token = await client.getAccessToken();
  const context = createSpotifyAuthorizationContext(token);
  const params = createSpotifyPlaylisrParams({
    id: options?.id,
    offSet: options.pagePagination?.offSet ?? 0,
    limit: options?.pagePagination?.limit ?? 20,
  });
  const spotifyResolvedObjectURL: string = getSpotifyURL(params);
  const doubleEncodedURL: string = fixDoubleEncodedUrl(
    spotifyResolvedObjectURL
  );
  const fetchRequest = await client.request(doubleEncodedURL, {
    ...context,
  });

  return playlistParser(fetchRequest);
}
