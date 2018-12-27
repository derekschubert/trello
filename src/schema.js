export default `
    type User {
        id: String!
        name: String!
        username: String!
        hasFavorited: Boolean
    }

    type Team {
        id: String!
        name: String!
    }

    type Label {
        shortcut: String
        name: String!
        color: String!
    }

    type List {
        id: String!
        name: String!
        position: Int!
        cards: [String]
        color: String
    }

    type Card {
        id: String!
        name: String!
        description: String
    }

    type Board {
        id: String!
        title: String!
        team: Team
        visiblity: String!
        members: [User]
        owner: String!
        moderators: [String]
        background: {
            mode: String
            url: String
            color: String
        }
        labels: [Label]
        lists: [List]
        cards: [Card]
    }

    type Query {
        getBoards: [Board!]!
        getBoard: Board!
    }
`;