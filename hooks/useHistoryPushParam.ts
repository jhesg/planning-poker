import { useRouter } from "next/router";

import { historyPushParam } from "@/utils";

export const useHistoryPushParam = () => {
  const router = useRouter();
  return (params: Record<string, string>) => historyPushParam(router, params);
};
