import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLScalarType} from 'graphql';



const authors = [
  { id: 1, name: "George Orwell" },
  { id: 2, name: "Jane Austen" },
  { id: 3, name: "Mark Twain" }
];

const books = [
  { id: 1, name: "1984", authorId: 1 },
  { id: 2, name: "Animal Farm", authorId: 1 },
  { id: 3, name: "Pride and Prejudice", authorId: 2 },
  { id: 4, name: "Emma", authorId: 2 },
  { id: 5, name: "Sense and Sensibility", authorId: 2 },
  { id: 6, name: "Adventures of Huckleberry Finn", authorId: 3 },
  { id: 7, name: "The Adventures of Tom Sawyer", authorId: 3 },
  { id: 8, name: "A Connecticut Yankee in King Arthur's Court", authorId: 3 },
  { id: 9, name: "Down and Out in Paris and London", authorId: 1 },
  { id: 10, name: "Mansfield Park", authorId: 2 }
];



const app = express();

const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "Author details",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt)},
        name: { type: GraphQLNonNull(GraphQLString)},
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => {
                return books.filter(book => author.id === book.authorId)
            }
        }
    })
})


const BookType = new GraphQLObjectType({
    name: "Book",
    description: "This specifies a book",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt)},
        name: { type: GraphQLNonNull(GraphQLString)},
        authorId: { type: GraphQLNonNull(GraphQLInt)},
        author: {
            type: AuthorType,
            resolve: (book) => {
                return authors.find(author => author.id === book.authorId )
            }
        }
    })
})


const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        book: {
            type: BookType,
            description: "A single book",
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (parent, args) => books.find(book => book.id === args.id)
        }, 
        books: {
            type: new GraphQLList(BookType),
            description: "List of all books",
            resolve: () => books
        }, 
        authors: {
            type: new GraphQLList(AuthorType),
            description: "List of all authors",
            resolve: () => authors
        },
        author: {
            type: AuthorType,
            description: "A Single Author",
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (parent, args) => authors.find(author => author.id === args.id)
        }
    })
})

const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "All mutations",
    fields: () => ({
        addBook: {
            type: BookType,
            description: "A new book",
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                authorId: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parent, args) => {
                const book = {
                    id: books.length + 1,
                    name: args.name,
                    authorId: args.authorId
                };
                books.push(book);
                return book;
            }
        },
        addAuthor: {
            type: AuthorType,
            description: "A new Author",
            args: {
                name: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => {
                const author = {
                    id: authors.length + 1,
                    name: args.name
                };
                authors.push(author);
                return author;
            }

        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

// const schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: "HelloWorld",
//         fields: () => ({
//             message: {
//                 type: GraphQLString,
//                 resolve: () => "Hello World"
//             }
//         })
//     })
    
// })


app.use("/graphql", graphqlHTTP({
    graphiql: true,
    schema: schema
}))

app.listen(5000, () => console.log("Server is running"));