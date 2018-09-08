import gql from "graphql-tag";

export const defaults = {
  todos: []
};

let todoNext = 0;
export const resolvers = {
  Mutation: {
    addTodo: (_, { text }, { cache }) => {
      //create a query to fetch all todos
      const GET_TODOS = gql`
       {
         todos @client{
           id
           text
           completed
         }
       }
      `;
      const prev = cache.readQuery({
        query: GET_TODOS
      });
      console.log(prev);
      const newTodo = {
        id: todoNext++,
        completed: false,
        text,
        __typename: "TodoItem"
      };
      //add new todo item in the existing array
      const data = {
        todos: [...prev.todos, newTodo]
      };
      //finally update the cache with new todo items
      cache.writeData({ data });
      return newTodo;
    }
  }
};
