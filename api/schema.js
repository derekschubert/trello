export default `

type User {
  id: String!
  first_name: String!
  last_name: String!
  username: String!
  email: String!
  boards: [String]
  teams: [String]
}

type Team {
  id: String
  name: String
  members: [User]
}

type Board {
  shortid: String!
  id: String!
  color: String
  team: Team!
  visibility: String!
  name: String!
  owner: String!
  admins: [String]
  moderators: [String]
  members: [String]!
  lists: [List]
  cards: [Card]
  listOrder: [String]
}

type Card {
  shortid: String!
  id: String!
  name: String!
  description: String!
}

type List {
  shortid: String!
  id: String!
  name: String!
  color: String!
  orderOfCards: [String]
}

type Query {
  getBoard(id: String!): Board!
  getAllBoards: [Board!]!
  getUser: User!
  getAllUsers: [User!]!
}

type Mutation {
  createBoard(name: String!, owner: String!): Board!
  createUser(username: String!, first_name: String!, last_name: String!, email: String!): User!
  createExampleBoards(name: String): [Board!]!
  resetBoardDB: [Board]
  resetUserDB: [User]
  moveCard(boardId: String!, listId: String!, orderOfCards: [String!]!, cardId: String!, newPosition: Int!): [String!]!
  moveList(listId: String!): List!
}
`;
