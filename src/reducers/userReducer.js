import { ADD_USER, DELETE_USER, UPDATE_USER } from "../constants/ActionType"

const initialState = {
    userList: []
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_USER: {
            const newUserList = [...state.userList, action.newUser]
        
            return {
                ...state,
                userList: newUserList
            }
        }

        case DELETE_USER: {
            const userIndex = state.userList.findIndex(user => user.id === action.userId)
            const newUserList = [...state.userList]

            if (userIndex !== -1) {
                newUserList.splice(userIndex, 1)
            }

            return {
                ...state,
                userList: newUserList
            }
        }


        case UPDATE_USER: {
            const userIndex = state.userList.findIndex(user => user.id === action.user.id)
            const newUserList = [...state.userList]

            if (userIndex !== -1) {
                newUserList[userIndex] = action.user
            }

            return {
                ...state,
                userList: newUserList
            }
        }

        default:
            return state
    }
}

export default userReducer