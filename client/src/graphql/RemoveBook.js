import { gql, useMutation } from "@apollo/client";

export const REMOVE_BOOK_MUTATION = gql`
    mutation RemoveBook($_id: ID!) {
        removeBook(_id: $_id) {
           success
           message
        }
    }
`;


