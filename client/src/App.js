import { useState } from "react";
import { AddAuthorDialog, AddBookDialog, Card, Main, Tabs } from "./components";


// Replace with real data
import { mockedAuthors, mockedBooks } from "./temporaryDatabase";
import Box from "@mui/material/Box";

import { useMutation, useQuery } from '@apollo/client';
import { GetAuthorsQuery } from "./graphql/GetAuthorsQuery";
import { GetBooksQuery } from "./graphql/GetBooksQuery";
import { ADD_AUTHOR_MUTATION } from "./graphql/AddAuthorMutation";
import { ADD_BOOK_MUTATION } from "./graphql/AddBookMutation";
import { REMOVE_BOOK_MUTATION } from "./graphql/RemoveBook";
import "@reach/tabs/styles.css";

function App() {
  const tabs = ["authors", "books"];
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [activeItem, setActiveItem] = useState(null);
  const [modalOpen, toggleModal] = useState(false);
  const { data, error, loading } = useQuery(GetAuthorsQuery);
  const { data: bookData, error: bookError, loading: bookLoading } = useQuery(GetBooksQuery);
  const [addAuthor, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_AUTHOR_MUTATION);
  const [addBook, { loading: bookMutLoading, error: bookMutError } ] = useMutation(ADD_BOOK_MUTATION);
  const [removeBook, { loading: remBookLoading, error: remBookErr} ] = useMutation(REMOVE_BOOK_MUTATION);

  
  
  const handleAddAuthor = async (authorName) => {
    const { data } = await addAuthor({ variables: { name: authorName } });
    console.log("Author added successfully:", data.addAuthor);
  };
  const handleAddBook = async ({ authorId, bookTitle }) => {
   const { data } = await addBook({variables: { title: bookTitle, authorId: authorId}});
   console.log('book added succesfully', data.addBook);
};
const handleRemoveBook = async ( _id) => {
  const { data } = await removeBook({ variables: { _id } });
  console.log('Book removed successfully:', data.removeBook);
  
}

  return (
    <>
      <Main>
        <Box>
          <Tabs
            {...(bookData ? { books: bookData.books } : { books: mockedBooks})}

            {...(data ? { authors: data.authors } : { authors: mockedAuthors })}

            handleRemoveBook={handleRemoveBook} //Replace with a function
            handleRemoveAuthor={() => console.log("Remove author!")} //Replace with a function
            onRowClick={setActiveItem}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            toggleModal={() => toggleModal(true)}
            tabs={tabs}
          />
        </Box>
        {activeItem && <Card {...activeItem} />}
      </Main>

      {currentTab === "books" ? (
        <AddBookDialog
          onSubmit={handleAddBook} 
          authors={data.authors} 
          toggleModal={toggleModal}
          modalOpen={modalOpen}
        />
      ) : null}
      {currentTab === "authors" ? (
        <AddAuthorDialog
          onSubmit={handleAddAuthor} 
          toggleModal={toggleModal}
          modalOpen={modalOpen}
        />
      ) : null}
    </>
  );
}

export default App;
