const { gql } = require('apollo-server')

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User]
    }

    type Query {
        users: [User!]!
        user(id: ID!): User!
    }

    input CreateUserInput{
        name: String!
        username: String!
        age: Int!
        nationality: Nationality = ph
    }

    input UpdateUsernameInput {
    id: ID!
    newUsername: String!
    }

    type Mutation{
        createUser(input: CreateUserInput!): User!
        updateUsername(input: UpdateUsernameInput!): User
        deleteUser(id: ID!): User
    }

    enum Nationality{
        canada
        ph
        au
        usa
        russia
    }
`

module.exports = { typeDefs }