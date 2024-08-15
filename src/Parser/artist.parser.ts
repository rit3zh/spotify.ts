import { extractSpotifyID } from "@/Utils/getSpotifyId";
import type { Artist } from "@/Interfaces/Artist";
export function artistParser(body: any): Artist {
  const { data } = body;
  const artist = data?.artistUnion;
  const type = artist?.__typename;
  const id = artist?.id;
  const profile = artist?.profile;
  const biography = profile?.biography?.text;
  const name = profile?.name;
  const externalLinks = profile?.externalLinks?.items?.map((item: any) => item);
  const pins = profile?.pinnedItem?.itemV2?.data;
  const stats = artist?.stats;
  const followers = stats?.followers;
  const listeners = stats?.monthlyListeners;
  const cities = stats?.topCities?.items?.map((item: any) => ({
    city: item?.city,
    country: item?.country,
    listeners: item?.numberOfListeners,
    region: item?.region,
  }));
  const rank = stats?.worldRank;
  const visuals = artist?.visuals;
  const image = visuals?.avatarImage?.sources?.at(-1)?.url;

  const header = visuals?.headerImage?.sources?.at(-1)?.url;
  const gallery = visuals?.gallery?.items[0]?.sources?.map(
    (image: any) => image.url
  );

  const pinned = {
    name: pins?.name,
    type: pins?.__typename,
    artwork: pins?.coverArt?.sources?.at(-1)?.url,
    id: extractSpotifyID(pins?.uri),
  };
  const playlist = profile?.playlistsV2?.items?.map((item: any) => {
    const data = item?.data;
    const type = data?.__typename;
    const title = data?.name;
    const description = data?.description;
    const images = data?.images?.items[0]?.sources?.at(-1)?.url;
    const id = extractSpotifyID(data?.uri);
    const owner = {
      name: data?.ownerV2?.data?.name,
      type: data?.ownerV2?.data?.__typename,
    };

    return {
      type,
      description,
      images,
      title,
      owner,
      id,
    };
  });

  const discography = artist?.discography;
  const _latest = discography?.latest;
  const latest = {
    title: _latest?.name,
    id: _latest?.id,
    artwork: _latest?.coverArt?.sources?.at(-1)?.url,
    label: _latest?.label,
    date: _latest?.date?.year,
    copyright: _latest?.copyright?.items?.map((item: any) => item),
    type: _latest?.type,
    count: _latest?.tracks?.totalCount,
  };
  const albums = discography?.albums?.items?.map((item: any) => {
    const releases = item?.releases?.items?.map((i: any) => fetchAlbum(i));
    return releases;
  });
  const popular = discography?.popularReleasesAlbums?.items?.map((item: any) =>
    fetchAlbum(item)
  );
  const compilations =
    discography?.compilations?.items[0]?.releases?.items?.map((i: any) =>
      fetchAlbum(i)
    );
  const singles = discography?.singles?.items?.map((i: any) => {
    const releases = i?.releases?.items?.map((i: any) => fetchAlbum(i));
    return releases;
  });
  const tracks = discography?.topTracks?.items?.map((i: any) => {
    const track = i?.track;
    return fetchTrack(track);
  });
  const releated = artist?.relatedContent;
  const appearsOn = releated?.appearsOn?.items?.map((i: any) => {
    const _latest = i?.releases?.items[0];
    return {
      title: _latest?.name,
      id: _latest?.id,
      type: _latest?.type,
      artwork: _latest?.coverArt?.sources?.at(-1)?.url,
      date: _latest?.date?.year,
      artists: _latest?.artists?.items?.map((a: any) => ({
        name: a.profile?.name,
        id: extractSpotifyID(a?.uri),
      })),
    };
  });
  const discover = releated?.discoveredOnV2?.items?.map((item: any) => ({
    title: item?.data?.name,
    type: item?.data?.__typename,
    description: item?.data?.description,
    id: item?.data?.id,
    image: item.data.images?.items[0]?.sources?.at(-1)?.url,
    owner: {
      type: item?.data?.ownerV2?.data?.__typename,
      name: item?.data?.ownerV2?.data?.name,
    },
  }));
  const featuring = releated?.featuringV2?.items?.map((item: any) => ({
    title: item?.data?.name,
    type: item?.data?.__typename,
    description: item?.data?.description,
    id: item?.data?.id,
    image: item.data.images?.items[0]?.sources?.at(-1)?.url,
    owner: {
      type: item?.data?.ownerV2?.data?.__typename,
      name: item?.data?.ownerV2?.data?.name,
    },
  }));
  const artists = releated?.relatedArtists?.items?.map((artist: any) => ({
    id: artist?.id,
    name: artist?.profile?.name,
    image: artist?.visuals?.avatarImage?.sources?.at(-1)?.url,
  }));
  const verified = profile?.verified;

  return {
    id,
    type,
    name,
    biography,
    externalLinks,
    cities,
    followers,
    listeners,
    image,
    rank,
    header,
    gallery,
    pinned,
    playlist,
    latest,
    albums,
    popular,
    compilations,
    singles,
    tracks,
    appearsOn,
    discover,
    featuring,
    verified,
    artists,
  };
}

function fetchAlbum(_latest: any) {
  return {
    title: _latest?.name,
    id: _latest?.id,
    artwork: _latest?.coverArt?.sources?.at(-1)?.url,
    label: _latest?.label,
    date: _latest?.date?.year,
    copyright: _latest?.copyright?.items?.map((item: any) => item),
    type: _latest?.type,
    count: _latest?.tracks?.totalCount,
  };
}

function fetchTrack(track: any) {
  const title = track?.name;
  const album = {
    id: extractSpotifyID(track?.albumOfTrack?.uri),
    artwork: track?.albumOfTrack?.coverArt?.sources?.at(-1)?.url,
  };
  const artists = track?.artists?.items?.map((a: any) => ({
    name: a.profile?.name,
    id: extractSpotifyID(a?.uri),
  }));
  const duration = track?.duration?.totalMilliseconds;
  const id = track?.id;
  const plays = track?.playcount;
  const disc = track?.discNumber;
  const contentRating = track?.contentRating?.label;
  return {
    title,
    album,
    artists,
    duration,
    id,
    plays,
    disc,
    contentRating,
  };
}
