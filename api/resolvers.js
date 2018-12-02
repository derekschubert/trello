import Board from './models/board';
import User from './models/user';
import ExampleBoardData from './exampleBoardData';

const timeout = time => (
  new Promise(resolve => setTimeout(resolve, time))
);

export default {
  Query: {
    getAllUsers: async () => {
      const users = await User.find();
      return users;
    },
    getAllBoards: async () => {
      const boards = await Board.find();
      await timeout(2000);
      return boards;
    },
    getBoard: async (parent, args, context, info) => {
      console.log('Board id:', args.id);
      const board = await Board.find({ shortid: args.id });
      console.log('Results:', board);
      return board[0];
    },
  },
  Mutation: {
    createExampleBoards: async () => (
      ExampleBoardData.map(b => (
        new Board(b).save()
      ))
    ),
    updateLists: async (parent, args, context, info) => {
      let statusMessage;

      let board = await Board.findOne({ shortid: args.boardId }, (err) => {
        statusMessage = 'Success';
        if (err) statusMessage = `${err}`;
      });

      if (args.lists) board.lists = args.lists;
      if (args.listOrder) board.listOrder = args.listOrder;

      await board.save();
      return statusMessage;
    },
    resetBoardDB: async () => (
      Board.remove({})
    ),
    resetUserDB: async () => (
      User.remove({})
    ),
  },
};
