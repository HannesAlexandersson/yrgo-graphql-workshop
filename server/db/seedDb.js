import { MongoClient, ServerApiVersion } from "mongodb";

const authors = [
  {
    name: "Charlie McBrown",
    books: [],
  },
  {
    name: "Keegan Breagan",
    books: [],
  },
];

const books = [
  {
    title: "When winning ends",
  },
  {
    title: "GraphQL with Apollo - Better than the REST?",
  },
  {
    title: "Book of Death",
  },
  {
    title: "Moms got a new API",
  },
  {
    title: "Tomorrow - Today",
  },
  {
    title: "Brown - Downtown",
  },
];
const uri = `mongodb://localhost:5005/`;

export const seedDataBase = async () => {
  try {
    const client = new MongoClient(uri);
    await client.connect();

    await client.db("bookkeeper_db").dropCollection("books");
    await client.db("bookkeeper_db").dropCollection("authors");

    const booksCollection = await client
      .db("bookkeeper_db")
      .createCollection("books");
    const authorsCollection = await client
      .db("bookkeeper_db")
      .createCollection("authors");

    const authorsRes = await authorsCollection.insertMany(authors);
    const booksRes = await booksCollection.insertMany(books);

    await authorsCollection.updateOne(
      { _id: authorsRes.insertedIds[0] },
      {
        $set: {
          books: [
            booksRes.insertedIds[0],
            booksRes.insertedIds[1],
            booksRes.insertedIds[2],
          ],
        },
      }
    );

    const bookIdsOne = [
      booksRes.insertedIds[0],
      booksRes.insertedIds[1],
      booksRes.insertedIds[2],
    ];

    await Promise.all(
      bookIdsOne.map(async (book) => {
        await booksCollection.updateOne(
          { _id: book },
          { $set: { author: authorsRes.insertedIds[0] } }
        );
      })
    );

    await authorsCollection.updateOne(
      { _id: authorsRes.insertedIds[1] },
      {
        $set: {
          books: [
            booksRes.insertedIds[3],
            booksRes.insertedIds[4],
            booksRes.insertedIds[5],
          ],
        },
      }
    );

    const bookIdsTwo = [
      booksRes.insertedIds[3],
      booksRes.insertedIds[4],
      booksRes.insertedIds[5],
    ];
    await Promise.all(
      bookIdsTwo.map(async (book) => {
        await booksCollection.updateOne(
          { _id: book },
          { $set: { author: authorsRes.insertedIds[1] } }
        );
      })
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    console.log("Done seeding");
    process.exit();
  }
};

seedDataBase();
