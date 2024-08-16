import { PodcastShow } from "@/Interfaces/Show";

export function parsePodcastShow(body: any): PodcastShow {
  const { data } = body;
  const podcast = data?.podcastUnionV2;
  const type = podcast?.__typename;
  const name = podcast?.name;
  const id = podcast?.id;
  const episodes = podcast?.episodesV2?.items?.map((item: any) => {
    const entity = item?.entity;
    const content = entity?.data;
    const title = content?.name;
    const type = content?.__typename;
    const description = content?.description;
    const image = content?.coverArt?.sources?.at(-1)?.url;
    const id = content?.id;
    const contentRating = content?.contentRating?.label;
    const date = content?.releaseDate?.isoString;
    return {
      title,
      type,
      id,
      description,
      image,
      contentRating,
      date,
    };
  });
  return {
    id,
    name,
    type,
    episodes,
  };
}
