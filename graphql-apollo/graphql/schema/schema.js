export const schema =  `#graphql

    type User {
        _id: ID!
        name: String!
        email: String!
        address: String
        isActive: Boolean
        createdAt: String
    }

    type Product {
        
    }
    
    type Order {

    }

    type Query { 
        hello: String,
        hello2: String
        users: [User]
        products: [Product]
        orders: []
    },
`;