const { user } = require('pg/lib/defaults')
const { UserList } = require('./FakeData')

const resolvers = {
    Query: {
        users: () => {
            return UserList
        },
        user: (parent, args) => {
            const { id } = args
            return UserList.find((a) => a.id ==id)
        }
    },

    Mutation: {
        createUser: (parents, args) =>{
            const user = args.input
            console.log(user)
            const lastId = UserList[UserList.length-1].id
            user.id = lastId + 1
            UserList.push(user)
            return user
        },

        updateUsername: (parents, args) =>{
           const { id, newUsername} = args.input
           user2 = UserList.find((a) => a.id ==id)
           user2.username = newUsername
           console.log(user2)
           return user2
        },

        deleteUser: (parent, args) =>{
            const id = args.id
            const new2 = UserList.filter((a) => a.id !=id)
            console.log(new2)
            return null
        }
    }

    
}

module.exports = { resolvers }