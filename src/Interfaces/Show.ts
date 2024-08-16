export interface PodcastShow {
  id?: string;
  name?: string;
  type?: string;
  episodes?: PodcastEpisodes[];
}

interface PodcastEpisodes {
  title?: string;
  type?: string;
  description?: string;
  image?: string;
  contentRating?: string;
  date?: string;
}
