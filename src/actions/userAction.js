import { ADD_USER, DELETE_USER, UPDATE_USER } from '../constants/ActionType'


export const addUserAction = (newUser) => {
    return {
        type: ADD_USER,
        newUser
    }
}

export const deleteUserAction = (userId) => {
    return {
        type: DELETE_USER,
        userId
    }
}

export const updateUserAction = (user) => {
    return {
        type: UPDATE_USER,
        user
    }
}