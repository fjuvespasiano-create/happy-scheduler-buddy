import { createServerFn } from "@tanstack/react-start";

const CHANNEL_ID = "UCvcwbWCUR8SWGjJKohb1-cw";
const CHANNEL_HANDLE = "william_coelho2024";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export type YTVideo = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  thumbnailHQ: string;
  published: string;
  description: string;
};

type Cache = { at: number; data: YTVideo[] };
let cache: Cache | null = null;
const TTL_MS = 10 * 60 * 1000;

function decodeEntities(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function parseFeed(xml: string): YTVideo[] {
  const entries = xml.split("<entry>").slice(1);
  const out: YTVideo[] = [];
  for (const raw of entries) {
    const block = raw.split("</entry>")[0];
    const id = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = block.match(/<title>([^<]+)<\/title>/)?.[1];
    const published = block.match(/<published>([^<]+)<\/published>/)?.[1];
    const description =
      block.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] ?? "";
    if (!id || !title) continue;
    out.push({
      id,
      title: decodeEntities(title),
      url: `https://www.youtube.com/watch?v=${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
      thumbnailHQ: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      published: published ?? "",
      description: decodeEntities(description).slice(0, 200),
    });
  }
  return out;
}

export const getChannelVideos = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ videos: YTVideo[]; channelUrl: string; handle: string }> => {
    const channelUrl = `https://www.youtube.com/@${CHANNEL_HANDLE}`;
    try {
      if (cache && Date.now() - cache.at < TTL_MS) {
        return { videos: cache.data, channelUrl, handle: CHANNEL_HANDLE };
      }
      const res = await fetch(FEED_URL, {
        headers: { "User-Agent": "Mozilla/5.0 AutoLimpezaPro/1.0" },
      });
      if (!res.ok) throw new Error(`Feed HTTP ${res.status}`);
      const xml = await res.text();
      const videos = parseFeed(xml);
      cache = { at: Date.now(), data: videos };
      return { videos, channelUrl, handle: CHANNEL_HANDLE };
    } catch (e) {
      console.error("youtube feed error", e);
      return {
        videos: cache?.data ?? [],
        channelUrl,
        handle: CHANNEL_HANDLE,
      };
    }
  },
);
