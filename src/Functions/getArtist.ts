import { createSpotifyAuthorizationContext } from "@/Structure/Context";
import { client } from "@/Structure/RequestClient";
import {
  createSpotifyArtistParams,
  fixDoubleEncodedUrl,
  getSpotifyURL,
} from "@/Modifiers/url+modifiers";

import { artistParser } from "@/Parser/artist.parser";
import { Artist } from "@/Interfaces/Artist";

interface PagePagination {
  offSet?: number;
  limit?: number;
}
interface IOptions {
  id: string;
  pagePagination?: PagePagination;
}
export async function getArtist<T extends string>(id: T): Promise<Artist> {
  const token = await client.getAccessToken();
  const context = createSpotifyAuthorizationContext(token);
  const params = createSpotifyArtistParams({
    id,
  });
  const spotifyResolvedObjectURL: string = getSpotifyURL(params);
  const doubleEncodedURL: string = fixDoubleEncodedUrl(
    spotifyResolvedObjectURL
  );
  const fetchRequest = await client.request(doubleEncodedURL, {
    ...context,
  });

  return artistParser(fetchRequest);
}
