// Steam API Function Calls
import Steam from './databaseFunctions/callSteamAPI';

// Mongoose Models
import Cat from './models/cat';

export default {
    Query: {
        allCats: async(parent, args) => {
            // { _id: 123123, id: "123123", name: "String" }
            console.group("Finding all cats...");
            let cats = await Cat.find();
            console.log("Found Cats:");
            console.log(cats);
            console.groupEnd();
            return cats;
        },
        getSteamFriendsFromAPI: async(parent, args) => {
            console.log("Retrieving all Steam Friends from API");
            let friends = await Steam.getFriends("PASS IN STEAMID LATER");
            console.group("Got friends!");
            friends.forEach(friend => {console.log(friend)});
            console.groupEnd();
            return friends;
        },
        getSteamGamesFromAPI: async(parent, args) => {
            let games = await Steam.getGames("PASS IN STEAMID");
            console.group("Got games!");
            games.forEach(game => {console.log(game)});
            console.groupEnd();
            return games;
        }
    },
    Mutation: {
        createCat: async (parent, args) => {
            // { _id: 123123, name: "String"}
            console.group("Creating new cat...");
            let kitten = await new Cat(args).save();
            console.log("Created a new kitten!");
            console.log(kitten);
            console.groupEnd();
            return kitten; 
        }
    }
}