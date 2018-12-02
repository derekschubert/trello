cmport Apolloclient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import defaults from './defaults';

// https://medium.freecodecamp.org/updated-for-apollo-v2-1-managing-local-state-with-apollo-d1882f2fbb7

const cache = new InMemoryCache();
const stateLink = withClientState({
  cache,
  defaults
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
  ]),
});

export { client };
