export default `
type Cat {
    id: String!
    name: String!
}

type Game {
    appid: String!
    name: String!
    playtime_forever: Int!
    img_icon_url: String!
    img_logo_url: String!
}

type Friend {
    steamid: String!
    relationship: String!
    friend_since: String!
}

type Query {
    allCats: [Cat!]!
    getSteamGamesFromAPI: [Game!]!
    getSteamFriendsFromAPI: [Friend!]!
}

type Mutation {
    createCat(name: String!): Cat!
}

`;