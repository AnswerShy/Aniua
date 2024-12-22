import AnimeServiceInstance from "@/app/api";
import { useEffect, useState } from "react";

export const useEpisodeList = (slug: string) => {
  const [episodesList, setEpisodesList] = useState<EpisodeListInterface[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const list = await AnimeServiceInstance.fetchEpisodeList(slug);
      setEpisodesList(list);
      setLoading(false);
    };

    fetchEpisodes();
  }, [slug]);

  return [episodesList, loading] as const;
};
