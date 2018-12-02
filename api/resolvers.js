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
      console.group('Update Lists');
      
      Board.findOne({ shortid: args.boardId }, (err, board) => {
        if (err) return `${err}`;
        if (args.lists) board.lists = args.lists;
        if (args.listOrder) board.listOrder = args.listOrder;
        board.save();

        console.log('Success!');
        return 'Success';
      });

      console.groupEnd();
    },
    moveCard: async (parent, args, context, info) => {
      console.group('Move Card');
      console.log(args);

      let newCardOrder = args.cardOrder.filter(c => c !== args.cardId);
      newCardOrder.splice(args.newPosition, 0, args.cardId);
      
      Board.findOne({ shortid: args.boardId }, (err, board) => {
        if (err) throw err;
        else {
          board.lists.forEach((l) => {
            if (l.shortid === args.listId) {
              l.cardOrder = newCardOrder;
            }
          });
          console.log('Success!');
          board.save();
        }
      });

      console.groupEnd();
      return newCardOrder;
    },
    moveList: async () => {

    },
    resetBoardDB: async () => (
      Board.remove({})
    ),
    resetUserDB: async () => (
      User.remove({})
    ),
  },
};
