// Import Mongoose Models
import Board from './models/Board';

export default {
    Query: {
        getBoards: async(parent, args) => {
            console.group("Finding all boards...");
            let boards = await s.find();
            console.log("Found board:");
            console.log(boards);
            console.groupEnd();
            return boards;
        },
        exampleBoardData: async(parent, args) => {
            return exampleBoardData;
        }
    },
    Mutation: {

    }
}