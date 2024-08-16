import { PodcastShow } from "@/Interfaces/Show";
import {
  createSpotifyShowParams,
  fixDoubleEncodedUrl,
  getSpotifyURL,
} from "@/Modifiers/url+modifiers";
import { parsePodcastShow } from "@/Parser/show.parser";
import { createSpotifyAuthorizationContext } from "@/Structure/Context";
import { client } from "@/Structure/RequestClient";

interface PagePagination {
  offSet?: number;
  limit?: number;
}
interface IOptions {
  id: string;
  pagePagination?: PagePagination;
}

export async function getPodcastShow<T extends IOptions>(
  options: T
): Promise<PodcastShow> {
  const token = await client.getAccessToken();
  const context = createSpotifyAuthorizationContext(token);
  const params = createSpotifyShowParams({
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
  return parsePodcastShow(fetchRequest);
}
