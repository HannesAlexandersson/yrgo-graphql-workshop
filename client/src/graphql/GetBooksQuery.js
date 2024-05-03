import { gql } from '@apollo/client';

export const GetBooksQuery = gql`
    query {
        books {
            title
            author{
                name
                _id
                __typename
            }
            _id
            
        }
    }
`;