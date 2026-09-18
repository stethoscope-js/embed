import { getDataUrl, getRefQuery } from "./data-url";

const expectEqual = (actual: string, expected: string) => {
  if (actual !== expected) {
    throw new Error(`Expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`);
  }
};

expectEqual(
  getDataUrl("owner/repository", "rescuetime-time-tracking", "api.json"),
  "https://raw.githubusercontent.com/owner/repository/master/data/rescuetime-time-tracking/api.json"
);

expectEqual(
  getDataUrl("owner/repository", "rescuetime-time-tracking", "summary/weeks/2026-09-14.json", "releases/v3"),
  "https://raw.githubusercontent.com/owner/repository/releases%2Fv3/data/rescuetime-time-tracking/summary/weeks/2026-09-14.json"
);

expectEqual(getRefQuery("master"), "");
expectEqual(getRefQuery("releases/v3"), "&ref=releases%2Fv3");
