import { gql } from 'apollo-boost';
// import { gql } from 'graphql-tag';

const GET_BOARD = gql`
    query($id: String!) {
        getBoard(id: $id) {
            name
            shortid
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

export { GET_BOARD };