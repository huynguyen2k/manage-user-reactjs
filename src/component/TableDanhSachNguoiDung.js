import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteUserAction, editUserAction } from '../redux/action/UserListAction'


class TableDanhSachNguoiDung extends Component {

    renderUserInfoRows = () => {
        return this.props.userList.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.fullName}</td>
                    <td>{user.password}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.userType}</td>
                    <td>
                        <button onClick={() => this.props.editUser(user)} className="btn btn-small btn-success">Chỉnh sửa</button>
                        <button onClick={() => this.props.deleteUser(user.id)} className="btn btn-small btn-danger">Xóa</button>
                    </td>
                </tr>
            )
        })
    }

    render() {

        return (
            <div className="user-info">
                <h1 className="user-info-header">Danh sách người dùng</h1>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tài khoản</th>
                            <th>Họ tên</th>
                            <th>Mật khẩu</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Loại người dùng</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUserInfoRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        userList: state.UserListReducer.userList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteUser: (userId) => {
            dispatch(deleteUserAction(userId))
        },

        editUser: (user) => {
            dispatch(editUserAction(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableDanhSachNguoiDung)