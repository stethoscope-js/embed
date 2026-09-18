const encodePath = (path: string) => path.split("/").map(encodeURIComponent).join("/");

export const getDataUrl = (repo: string, api: string, path: string, ref = "master") =>
  `https://raw.githubusercontent.com/${encodePath(repo)}/${encodeURIComponent(ref)}/data/${encodePath(api)}/${encodePath(
    path
  )}`;

export const getManifestUrl = (repo: string, ref = "master") =>
  `https://raw.githubusercontent.com/${encodePath(repo)}/${encodeURIComponent(
    ref
  )}/data/.stethoscope/manifest.v3.json`;

export const getRefQuery = (ref: string) => (ref === "master" ? "" : `&ref=${encodeURIComponent(ref)}`);
