import React from 'react'
import './style.scss'


export default function UserList(props) {

    const { users, onUserDelete, onUserEdit } = props

    const handleUserEdit = (user) => {
        if (!onUserEdit) return

        onUserEdit(user)
    }

    const handleUserDelete = (userId) => {
        if (!onUserDelete) return
        
        onUserDelete(userId)
    }

    const renderUserList = () => {
        if (!Array.isArray(users) || users.length === 0) return

        return users.map((user, index) => {
            return (
                <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.fullName}</td>
                    <td>{user.password}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.userType}</td>
                    <td>
                        <button
                            onClick={() => handleUserEdit(user)} 
                            className="btn btn-small btn-success"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => handleUserDelete(user.id)}
                            className="btn btn-small btn-danger"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div className="user-list">
            <h1 className="user-list__header">User List</h1>
            <table className="user-list__body">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Username</th>
                        <th>Full name</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Phone number</th>
                        <th>User type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {renderUserList()}
                </tbody>
            </table>
        </div>
    )
}
