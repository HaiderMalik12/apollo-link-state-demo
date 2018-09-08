import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const TODOS_QUERY = gql`
 {
   todos @client{
     id
     completed
     text
   }
 }

`;
const TodoList = () => {
  return (
    <Query query={TODOS_QUERY}>
      {({ data: { todos } }) => {
        console.log(todos);
        return (
          <ul>
            {todos.map(todo => {
              return <li key={todo.id}>{todo.text}</li>;
            })}
          </ul>
        );
      }}
    </Query>
  );
};
export default TodoList;
