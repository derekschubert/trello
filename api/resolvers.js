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
      // await timeout(2000);
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
    createBoard: async (parent, args, context, info) => {
      let statusMessage = '';
      let boardArgs = { ...args };

      boardArgs.team = {
        id: '1',
        name: 'Starbound',
        members: '1',
      };

      boardArgs.visibility = 'Private'

      const board = await new Board(boardArgs).save((err) => {
        if (err) {
          console.err(err);
          statusMessage = err;
        } else {
          statusMessage = 'Success!';
        }
      });

      return statusMessage;
    },
    updateLists: async (parent, args, context, info) => {
      let statusMessage;

      let board = await Board.findOne({ shortid: args.boardId }, (err) => {
        statusMessage = 'Success';
        if (err) statusMessage = `${err}`;
      });

      if (args.lists) board.lists = args.lists;
      if (args.listOrder) board.listOrder = args.listOrder;
      if (args.cards) board.cards = args.cards;

      await board.save();
      return statusMessage;
    },
    resetBoardDB: async () => (
      Board.remove({})
    ),
    resetUserDB: async () => (
      User.remove({})
    ),
    deleteBoard: async (parent, args, context, info) => {
      let statusMessage;

      let _ = await Board.remove({ shortid: args.boardId }, (err) => {
        if (err) {
          statusMessage = 'ERROR';
          console.log(err);
        } else {
          statusMessage = 'success';
          console.log('Successfully deleted board');
        }
      });

      return statusMessage;
    },
    updateBoardName: async (parent, args, context, info) => {
      let statusMessage;

      let board = await Board.findOne({ shortid: args.boardId }, (err) => {
        statusMessage = 'success';
        if (err) statusMessage = `${err}`;
      });

      board.name = args.name;

      await board.save();
      return statusMessage;
    },
  },
};
