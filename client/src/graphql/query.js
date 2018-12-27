import { gql } from 'apollo-boost';
// import { gql } from 'graphql-tag';

const GET_BOARD = gql`
    query($id: String!) {
        getBoard(id: $id) {
            name
            shortid
            color
            team {
                name
            }
            lists {
                shortid
                color
                name
                cardOrder
            }
            cards {
                name
                shortid
                description
            }
            visibility
            listOrder
        }
    }
`;

const GET_BOARDS = gql`
  {
    getAllBoards {
      name
      shortid
      color
    }
  }
`;

export { GET_BOARD, GET_BOARDS };