import { useMemo } from "react";
import { type SSRData } from "urql";
import { initUrqlClient } from "./urqlClientSeup";
export interface PageProps {
  URQL_DATA: SSRData;
}
/**
 * Simple hook to initialize the client with the pageProps.
 * @param pageProps - props of page
 * @returns urqlClient
 */
export const useClient = (pageProps: PageProps) => {
  const urqlData = pageProps.URQL_DATA;
  const { urqlClient } = useMemo(() => {
    return initUrqlClient("/graphql", urqlData);
  }, [urqlData]);

  return urqlClient;
};
