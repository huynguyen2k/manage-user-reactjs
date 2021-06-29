import { ADD_USER, DELETE_USER, EDIT_USER, UPDATE_USER } from "../type/UserListType"


export const addUserAction = (user) => {
    return {
        type: ADD_USER,
        user
    }
}

export const deleteUserAction = (userId) => {
    return {
        type: DELETE_USER,
        userId
    }
}

export const editUserAction = (user) => {
    return {
        type: EDIT_USER,
        user
    }
}

export const updateUserAction = (user) => {
    return {
        type: UPDATE_USER,
        user
    }
}