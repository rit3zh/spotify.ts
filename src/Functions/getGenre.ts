import { createSpotifyAuthorizationContext } from "../Structure/Context";
import { client } from "../Structure/RequestClient";
import {
  createSpotifyParams,
  fixDoubleEncodedUrl,
  getSpotifyURL,
} from "../Modifiers/url+modifiers";
import { genreParser } from "../Parser/genre.parser";
import type { Genre } from "../Interfaces/Genres";

interface PagePagination {
  offSet?: number;
  limit?: number;
}
interface SectionPagination {
  offSet?: number;
  limit?: number;
}
interface IOptions {
  pageId?: string;
  pagePagination?: PagePagination;
  sectionPagination?: SectionPagination;
}

export async function getGenre<T extends IOptions>(options: T): Promise<Genre> {
  const token = await client.getAccessToken();
  const context = createSpotifyAuthorizationContext(token);
  const params = createSpotifyParams({
    id: options.pageId as string,
    pagePagination: {
      limit: options.pagePagination?.limit ?? 10,
      offset: options.pagePagination?.offSet ?? 0,
    },
    sectionPagination: {
      limit: options.sectionPagination?.limit ?? 10,
      offset: options.sectionPagination?.offSet ?? 0,
    },
  });
  const spotifyResolvedObjectURL: string = getSpotifyURL(params);
  const doubleEncodedURL: string = fixDoubleEncodedUrl(
    spotifyResolvedObjectURL
  );
  const fetchRequest = await client.request(doubleEncodedURL, {
    ...context,
  });
  return genreParser(fetchRequest);
}
