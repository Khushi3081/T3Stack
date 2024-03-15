import {
  cacheExchange,
  type Client,
  createClient,
  fetchExchange,
  ssrExchange,
  type SSRData,
} from "urql";

let urqlClient: Client | null = null;

let ssrCache: ReturnType<typeof ssrExchange> | null = null;

const isServer = typeof window === "undefined";
//this will make URQL clients which will be warraped to all the routes

/**
 * Function to initialize urql client. can be used both on client and server
 * @param initialState -  usually the data from the server returned as props
 * @param url - graphql endpoint
 * @returns and object with urqlClient and ssrCache
 */
export function initUrqlClient(url?: string, initialState?: SSRData) {
  if (!urqlClient) {
    //fill the client with initial state from the server.
    ssrCache = ssrExchange({ initialState, isClient: !isServer });

    urqlClient = createClient({
      url: "http://localhost:8080",
      exchanges: [
        cacheExchange,
        ssrCache, // Add `ssr` in front of the `fetchExchange`
        fetchExchange,
      ],
    });
  } else {
    //when navigating to another page, client is already initialized.
    //lets restore that page's initial state
    if (initialState) {
      ssrCache?.restoreData(initialState);
    }
    ssrCache?.restoreData({});
  }

  // Return both the Client instance and the ssrCache.
  return { urqlClient, ssrCache };
}

//this is initalized
//This central Client manages all of our GraphQL requests and results.
//only used in client side
export const client = createClient({
  url: "http://localhost:8080/v1/graphql",
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    headers: {
      "x-hasura-admin-secret": "myadminsecretkey",
    },
  },
});
