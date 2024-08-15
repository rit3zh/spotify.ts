import { extractSpotifyID } from "@/Utils/getSpotifyId";
import type { Genre } from "@/Interfaces/Genres";

export function genreParser<T>(body: any): Genre {
  const { data } = body;
  const { browse } = data;
  const header = {
    title: browse?.header?.title?.transformedLabel,
    color: browse?.header?.color?.hex,
    image: browse?.header?.backgroundImage?.sources?.at(-1)?.url,
  };
  const items = browse?.sections?.items?.map((item: any, index: any) => {
    const title = item?.data?.title?.transformedLabel;
    const id = extractSpotifyID(item?.uri);

    const sectionItems = item?.sectionItems?.items?.map((_sectionItem: any) => {
      const content = _sectionItem?.content;
      const data = content?.data;
      const typename = data?.__typename;
      const albums = [];
      const playlists = [];
      if (typename === "Album") {
        const album = fetchAlbumSection(data);
        albums.push(album);
      } else {
        const playlist = fetchPlaylist(data);
        playlists.push(playlist);
      }
      return {
        playlist: playlists[0],
        album: albums[0],
      };
    });

    return {
      title,
      id,
      sections: sectionItems,
    };
  });
  return {
    header,
    items,
  };
}

function fetchAlbumSection(body: any) {
  const type = body?.__typename;
  const title = body?.name;
  const id = extractSpotifyID(body?.uri);
  const image: string = body?.coverArt?.sources?.at(-1)?.url;
  const artists = body?.artists?.items?.map((artist: any) => ({
    name: artist.profile?.name,
    id: extractSpotifyID(artist?.uri),
  }));
  return {
    type,
    title,
    id,
    image,
    artists,
  };
}

function fetchPlaylist(body: any) {
  const type = body?.__typename;
  const description = body?.description;
  const artwork = body?.images?.items?.at(-1)?.sources[0]?.url;
  if (typeof artwork === "undefined") return;
  const title = body?.name;
  const format = body?.format;
  const id = extractSpotifyID(body?.uri);
  const owner = {
    name: body?.ownerV2?.data?.name,
    type: body?.ownerV2?.data?.__typename,
  };
  return {
    title,
    owner,
    format,
    id,
    description,
    type,
  };
}
