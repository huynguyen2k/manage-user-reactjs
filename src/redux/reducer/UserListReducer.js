import { ADD_USER, DELETE_USER, EDIT_USER, UPDATE_USER } from "../type/UserListType"

const userList = {
    userList: [],
    userEdit: {}
}

const UserListReducer = (state = userList, action) => {

    switch (action.type) {
        case ADD_USER: {
            const newUserList = [...state.userList]
            const newUser = {...action.user, id: Date.now()}

            newUserList.push(newUser)
            state.userList = newUserList

            break
        }

        case DELETE_USER: {
            let index = state.userList.findIndex(user => user.id === action.userId)

            if (index !== -1) {
                state.userList.splice(index, 1)
                state.userList = [...state.userList]
            }

            break
        }

        case EDIT_USER: {
            state.userEdit = action.user

            break
        }

        case UPDATE_USER: {
            let index = state.userList.findIndex(user => user.id === action.user.id)
            const newUserList = [...state.userList]

            if (index !== -1) {
                newUserList[index] = {...action.user}
            }

            state.userList = newUserList

            break
        }

        default:
    }

    return {...state}
}

export default UserListReducer