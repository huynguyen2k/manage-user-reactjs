import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUserAction, deleteUserAction, updateUserAction } from '../../actions/userAction'

import RegisterForm from '../../components/RegisterForm/index'
import UserList from '../../components/UserList/index'

import './style.scss'



export default function ManageUser() {

    const dispatch = useDispatch()
    const users = useSelector(state => state.userReducer.userList)

    const [ userEdit, setUserEdit ] = useState(null)

    const handleUserRegister = (user) => {
        const newUser = {
            ...user,
            id: Date.now()
        }

        dispatch(addUserAction(newUser))
    }

    const handleUserDelete = (userId) => {
        dispatch(deleteUserAction(userId))
    }

    const handleUserEdit = (user) => {
        const newUserEdit = {...user}
        
        setUserEdit(newUserEdit)
    }

    const handleUserUpdate = (user) => {
        dispatch(updateUserAction(user))
    }

    return (
        <div className="manage-user">
            <div className="container">
                <RegisterForm userEdit={userEdit} onUserUpdate={handleUserUpdate} onUserRegister={handleUserRegister} />
                <UserList onUserEdit={handleUserEdit} onUserDelete={handleUserDelete} users={users} />
            </div>
        </div>
    )
}
