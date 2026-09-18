import { formatManifestStatus, getManifestStatus } from "./manifest-status";

const expectEqual = (actual: unknown, expected: unknown) => {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`);
  }
};

const manifest = {
  format: 3,
  generatedAt: "2026-09-18T03:56:23.582Z",
  adapters: [
    { name: "rescuetime", status: "succeeded" },
    { name: "oura-ring", status: "failed" },
  ],
};

const run = async () => {
  let requestedUrl = "";
  const available = await getManifestStatus("owner/repository", "releases/v3", "oura-sleep", async (url) => {
    requestedUrl = url;
    return { ok: true, json: async () => manifest };
  });

  expectEqual(
    requestedUrl,
    "https://raw.githubusercontent.com/owner/repository/releases%2Fv3/data/.stethoscope/manifest.v3.json"
  );
  expectEqual(available, {
    adapter: "oura-ring",
    status: "failed",
    generatedAt: "2026-09-18T03:56:23.582Z",
  });
  if (available) {
    expectEqual(
      formatManifestStatus(available),
      "Latest Oura Ring update failed on 2026-09-18; showing available historical data."
    );
  }

  const legacy = await getManifestStatus("owner/repository", "master", "rescuetime-time-tracking", async () => ({
    ok: false,
    json: async () => {
      throw new Error("A 404 response body must not be parsed");
    },
  }));
  expectEqual(legacy, null);

  const unavailable = await getManifestStatus("owner/repository", "master", "rescuetime-time-tracking", async () => {
    throw new Error("network unavailable");
  });
  expectEqual(unavailable, null);

  const invalid = await getManifestStatus("owner/repository", "master", "rescuetime-time-tracking", async () => ({
    ok: true,
    json: async () => ({ format: 2, generatedAt: manifest.generatedAt, adapters: manifest.adapters }),
  }));
  expectEqual(invalid, null);

  const invalidTimestamp = await getManifestStatus(
    "owner/repository",
    "master",
    "rescuetime-time-tracking",
    async () => ({
      ok: true,
      json: async () => ({ ...manifest, generatedAt: "" }),
    })
  );
  expectEqual(invalidTimestamp, null);

  const impossibleTimestamp = await getManifestStatus(
    "owner/repository",
    "master",
    "rescuetime-time-tracking",
    async () => ({
      ok: true,
      json: async () => ({ ...manifest, generatedAt: "2026-02-31T03:56:23.582Z" }),
    })
  );
  expectEqual(impossibleTimestamp, null);

  const invalidJson = await getManifestStatus("owner/repository", "master", "rescuetime-time-tracking", async () => ({
    ok: true,
    json: async () => {
      throw new SyntaxError("invalid JSON");
    },
  }));
  expectEqual(invalidJson, null);

  const missingAdapter = await getManifestStatus(
    "owner/repository",
    "master",
    "wakatime-time-tracking",
    async () => ({ ok: true, json: async () => manifest })
  );
  expectEqual(missingAdapter, null);

  let fetchedUnknownApi = false;
  const unknownApi = await getManifestStatus("owner/repository", "master", "custom-category", async () => {
    fetchedUnknownApi = true;
    return { ok: true, json: async () => manifest };
  });
  expectEqual(unknownApi, null);
  expectEqual(fetchedUnknownApi, false);
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
