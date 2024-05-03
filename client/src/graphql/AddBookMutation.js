
import { gql, useMutation } from "@apollo/client";

export const ADD_BOOK_MUTATION = gql`
    mutation AddBook($title: String!, $authorId: ID!) {
        addBook(title: $title, authorId: $authorId) {
           success
           message
        }
    }
`;



