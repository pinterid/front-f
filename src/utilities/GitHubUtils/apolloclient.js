// Apollo
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory";

// Base url
export const APIHost = "https://cors-anywhere.herokuapp.com/https://api.github.com";

// Cache setup
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [], // no types provided - works like a charm.ing
    },
  },
});
const cache = new InMemoryCache({ fragmentMatcher });

// Create api url from base url
const APILink = APIHost+"/graphql";

// Created HttpLink
const LINK = new HttpLink({
  uri: APILink,
  headers: {
    authorization: `Token ${
      //process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
      window.localStorage.getItem('access_token')
    }`,
  },
});

// Apollo client setup
export const client = new ApolloClient({
  cache,
  link: LINK,
});

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
