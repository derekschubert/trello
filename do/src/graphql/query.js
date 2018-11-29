import { gql } from 'apollo-boost';

const getBoard = gql`
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
                orderOfCards
            }
            cards {
                name
                shortid
                description
            }
            visibility
        }
    }
`;

export { getBoard };