import { getManifestUrl } from "./data-url";

export type AdapterRunStatus = "succeeded" | "skipped" | "failed";

export type ManifestStatus = {
  adapter: string;
  status: AdapterRunStatus;
  generatedAt: string;
};

type ManifestResponse = {
  ok: boolean;
  json: () => Promise<unknown>;
};

type ManifestFetch = (url: string) => Promise<ManifestResponse>;

const exactAdapters: { [api: string]: string } = {
  "spotify-music": "spotify",
  "rescuetime-time-tracking": "rescuetime",
  "last-fm-music": "last-fm",
  "pocket-casts-podcasts": "pocket-casts",
  "wakatime-time-tracking": "wakatime",
  "clockify-time-tracking": "clockify",
  "twitter-tweets": "twitter",
  "twitter-likes": "twitter",
};

const getAdapterName = (api: string) => {
  if (api.startsWith("google-fit-")) return "google-fit";
  if (api.startsWith("oura-")) return "oura-ring";
  return exactAdapters[api];
};

const isAdapterRunStatus = (status: unknown): status is AdapterRunStatus =>
  status === "succeeded" || status === "skipped" || status === "failed";

const isGeneratedAt = (value: unknown): value is string => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) return false;
  const timestamp = new Date(value);
  return !isNaN(timestamp.getTime()) && timestamp.toISOString() === value;
};

const adapterLabels: { [adapter: string]: string } = {
  spotify: "Spotify",
  rescuetime: "RescueTime",
  "last-fm": "Last.fm",
  "pocket-casts": "Pocket Casts",
  wakatime: "WakaTime",
  clockify: "Clockify",
  "google-fit": "Google Fit",
  "oura-ring": "Oura Ring",
  twitter: "Twitter",
};

export const formatManifestStatus = ({ adapter, status, generatedAt }: ManifestStatus) => {
  const label = adapterLabels[adapter] || adapter;
  const date = generatedAt.slice(0, 10);
  if (status === "succeeded") return `Latest ${label} update succeeded on ${date}.`;
  const verb = status === "failed" ? "failed" : "was skipped";
  return `Latest ${label} update ${verb} on ${date}; showing available historical data.`;
};

export const getManifestStatus = async (
  repo: string,
  ref: string,
  api: string,
  fetchManifest: ManifestFetch = (url) => fetch(url)
): Promise<ManifestStatus | null> => {
  const adapter = getAdapterName(api);
  if (!adapter) return null;

  try {
    const response = await fetchManifest(getManifestUrl(repo, ref));
    if (!response.ok) return null;

    const manifest: any = await response.json();
    if (manifest?.format !== 3 || !isGeneratedAt(manifest.generatedAt) || !Array.isArray(manifest.adapters)) {
      return null;
    }

    const outcome = manifest.adapters.find((item: any) => item?.name === adapter);
    if (!outcome || !isAdapterRunStatus(outcome.status)) return null;

    return { adapter, status: outcome.status, generatedAt: manifest.generatedAt };
  } catch {
    return null;
  }
};
