import { gql } from 'apollo-boost';

const MOVE_CARD = gql`
  mutation moveCard($boardId: String!, $listId: String!, $cardOrder: [String!]!, $cardId: String!, $newPosition: Int) {
    moveCard(boardId: $boardId, listId: $listId, cardOrder: $cardOrder, cardId: $cardId, newPosition: $newPosition)
  }
`;

const UPDATE_LISTS = gql`
  mutation updateLists($boardId: String!, $lists: [ListInput!], $listOrder: [String!], $cards: [CardInput!]) {
    updateLists(boardId: $boardId, lists: $lists, listOrder: $listOrder, cards: $cards)
  }
`;

const CREATE_BOARD = gql`
  mutation createBoard($shortid: String!, $name: String!, $owner: String!, $color: String!, $teamid: String!) {
    createBoard(shortid: $shortid, name: $name, owner: $owner, color: $color, teamid: $teamid)
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: String!) {
    deleteBoard(boardId: $boardId)
  }
`;

const UPDATE_BOARD_NAME = gql`
  mutation updateBoardName($boardId: String!, $name: String!) {
    updateBoardName(boardId: $boardId, name: $name)
  }
`;

export { MOVE_CARD, CREATE_BOARD, UPDATE_LISTS, DELETE_BOARD, UPDATE_BOARD_NAME };