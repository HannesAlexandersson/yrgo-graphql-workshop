
import { gql, useMutation } from "@apollo/client";

export const ADD_AUTHOR_MUTATION = gql`
    mutation AddAuthor($name: String!) {
        addAuthor(name: $name) {
           success
           message
        }
    }
`;



