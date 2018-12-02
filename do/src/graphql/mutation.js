import { gql } from 'apollo-boost';

const MOVE_CARD = gql`
    mutation moveCard($boardId: String!, $listId: String!, $cardOrder: [String!]!, $cardId: String!, $newPosition: Int) {
        moveCard(boardId: $boardId, listId: $listId, cardOrder: $cardOrder, cardId: $cardId, newPosition: $newPosition)
    }
`;

const UPDATE_LISTS = gql`
    mutation updateLists($boardId: String!, $lists: [ListInput!], $listOrder: [String!]) {
      updateLists(boardId: $boardId, lists: $lists, listOrder: $listOrder)
    }
`;

export { MOVE_CARD, UPDATE_LISTS };