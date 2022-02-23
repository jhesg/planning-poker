import { NextRouter } from "next/router";

export const historyPushParam = (
  router: NextRouter,
  params: Record<string, string>
) => {
  const query = { ...router.query, ...params } as Record<string, string>;
  const url = `${router.pathname}?${new URLSearchParams(query).toString()}`;
  window.history.replaceState(undefined, "", url);
};
