import { extractSpotifyID } from "../Utils/getSpotifyId";
import type { Album } from "../Interfaces/Album";
export function albumParser(body: any): Album {
  const { data } = body;
  const album = data?.albumUnion;
  const type = album?.__typename;
  const title = album?.name;
  const label = album?.label;
  const copyright = album?.copyright?.items?.map((item: any) => item);
  const date = album?.date?.isoString;
  const id = extractSpotifyID(album?.uri);
  const artwork = album?.coverArt?.sources?.at(-1)?.url;
  const artworkColor = album?.coverArt?.extractedColors;
  const colors = {
    dark: artworkColor.colorDark?.hex,
    light: artworkColor.colorLight?.hex,
    raw: artworkColor?.colorRaw?.hex,
  };

  const items = album?.tracksV2?.items?.map((item: any) => {
    const track = item?.track;
    const title = track?.name;
    const artists = track?.artists?.items?.map((a: any) => ({
      name: a?.profile?.name,
      id: extractSpotifyID(a?.uri),
    }));
    const disc = track?.discNumber;
    const playcount = track?.playcount;
    const id = extractSpotifyID(track?.uri);
    const duration = track?.duration?.totalMilliseconds;
    const trackNumber = track?.trackNumber;
    return {
      title,
      artists,
      disc,
      playcount,
      id,
      duration,
      trackNumber,
    };
  });
  const disc = album?.discs?.items.map((disc: any) => ({
    number: disc?.number,
    totalTracks: disc?.tracks?.totalCount,
  }));
  const more =
    album?.moreAlbumsByArtist?.items[0]?.discography?.popularReleasesAlbums?.items?.map(
      (item: any) => {
        const type = item?.type;
        const artwork = item?.coverArt?.sources?.at(-1)?.url;
        const date = item?.date?.year;
        const title = item?.name;
        const id = extractSpotifyID(item?.uri);
        return {
          type,
          title,
          date,
          artwork,
          id,
        };
      }
    );
  return {
    type,
    label,
    title,
    copyright,
    date,
    id,
    artwork,
    colors,
    items,
    disc,
    more,
  };
}
