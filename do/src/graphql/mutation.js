import { gql } from 'apollo-boost';

const moveCard = gql`
    mutation($boardId: String!, $listId: String!, $orderOfCards: [String!]!, $cardId: String!, $newPosition: Int!) {
        moveCard(boardId: $boardId, listId: $listId, orderOfCards: $orderOfCards, cardId: $cardId, newPosition: $newPosition)
    }
`;

export { moveCard };