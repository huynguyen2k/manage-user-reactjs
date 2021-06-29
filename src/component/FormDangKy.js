import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addUserAction, updateUserAction } from '../redux/action/UserListAction'


class FormDangKy extends Component {

    constructor(props) {
        super(props)

        this.state = {
            inputs: {
                username: '',
                password: '',
                email: '',
                fullName: '',
                phoneNumber: '',
                userType: 'KhachHang',
            },
            errors: {
                username: '',
                password: '',
                email: '',
                fullName: '',
                phoneNumber: '',
            },
            disabledRegisterBtn: false,
            disabledUpdateBtn: true,
        }
    }

    resetState = () => {
        this.setState({
            inputs: {
                username: '',
                password: '',
                email: '',
                fullName: '',
                phoneNumber: '',
                userType: 'KhachHang',
            },
            disabledRegisterBtn: false,
            disabledUpdateBtn: true,
        })
    }

    handleChange = (event) => {
        let { name, value } = event.target

        this.setState({
            inputs: {...this.state.inputs, [name]: value}
        })
    }

    handleBlur = (event) => {
        let { name, value } = event.target

        this.formValidation(name, value)
    }

    formValidation = (name, value) => {
        const { errors } = this.state

        switch (name) {

            case 'password': {
                const passwordRegex = /^\w{6,}$/

                if (passwordRegex.test(value)) {
                    errors[name] = ''
                } else {
                    errors[name] = name + ' must be at least 6 characters!'
                }

                break
            }

            case 'phoneNumber': {
                const phoneNumberRegex = /^[0-9]{10}$/

                if (phoneNumberRegex.test(value)) {
                    errors[name] = ''
                } else {
                    errors[name] = name + ' consist of numbers only and must contain 10 numbers!'
                }

                break
            }

            case 'email': {
                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

                if (emailRegex.test(value)) {
                    errors[name] = ''
                } else {
                    errors[name] = name + ' is not valid!'
                }

                break
            }

            default: {
                if (value === '') {
                    errors[name] = name + ' is required!'
                } else {
                    errors[name] = ''
                }
            }
        }

        this.setState({   
            errors
        })
    }

    isValidForm = ()=> {
        const { errors } = this.state

        return Object.values(errors).every(value => value === '')
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const { inputs } = this.state

        Object.entries(inputs).forEach(([name, value]) => this.formValidation(name, value))

        if (this.isValidForm()) {
            this.props.addUser(inputs)
            this.resetState()
        }
    }

    handleUpdate = () => {
        const { inputs } = this.state

        Object.entries(inputs).forEach(([name, value]) => this.formValidation(name, value))

        if (this.isValidForm()) {
            this.props.updateUser(inputs)
            this.resetState()
        }
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.userEdit !== prevProps.userEdit) {
            this.setState({
                inputs: this.props.userEdit,
                errors: {
                    username: '',
                    password: '',
                    email: '',
                    fullName: '',
                    phoneNumber: '',
                },
                disabledRegisterBtn: true,
                disabledUpdateBtn: false
            })
        }
    }

    render() {

        return (
            <form className="form" method="post" onSubmit={this.handleSubmit}>
                <h1 className="form-header">Form đăng ký</h1>
                <div className="row form-body">
                    <div className="col-6">
                        <label className="form-label" htmlFor="username">Tài khoản</label>
                        <input type="text" onChange={this.handleChange} onBlur={this.handleBlur} value={this.state.inputs['username']} className="form-input" name="username" id="username" />
                        <p className="error-message">{this.state.errors['username']}</p>
                    </div>
                    <div className="col-6">
                        <label className="form-label" htmlFor="fullName">Họ tên</label>
                        <input type="text" onChange={this.handleChange} onBlur={this.handleBlur} value={this.state.inputs['fullName']} className="form-input" name="fullName" id="fullName" />
                        <p className="error-message">{this.state.errors['fullName']}</p>
                    </div>
                    <div className="col-6">
                        <label className="form-label" htmlFor="password">Mật khẩu</label>
                        <input type="password" onChange={this.handleChange} onBlur={this.handleBlur} value={this.state.inputs['password']} className="form-input" name="password" id="password" />
                        <p className="error-message">{this.state.errors['password']}</p>
                    </div>
                    <div className="col-6">
                        <label className="form-label" htmlFor="phoneNumber">Số điện thoại</label>
                        <input type="text" onChange={this.handleChange} onBlur={this.handleBlur} value={this.state.inputs['phoneNumber']} className="form-input" name="phoneNumber" id="phoneNumber" />
                        <p className="error-message">{this.state.errors['phoneNumber']}</p>
                    </div>
                    <div className="col-6">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input type="text" onChange={this.handleChange} onBlur={this.handleBlur} value={this.state.inputs['email']} className="form-input" name="email" id="email" />
                        <p className="error-message">{this.state.errors['email']}</p>
                    </div>
                    <div className="col-6">
                        <label className="form-label" htmlFor="userType">Loại người dùng</label>
                        <select onChange={this.handleChange} value={this.state.inputs['userType']} className="form-input" name="userType" id="userType">
                            <option value="KhachHang">Khách hàng</option>
                            <option value="ThanhVien">Thành viên</option>
                            <option value="QuanLy">Quản lý</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-success" disabled={this.state.disabledRegisterBtn ? 'disabled' : ''}>Đăng ký</button>
                        <button onClick={this.handleUpdate} type="button" className="btn btn-primary" disabled={this.state.disabledUpdateBtn ? 'disabled' : ''}>Cập nhật</button>
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        userEdit: state.UserListReducer.userEdit
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addUser: (user) => {
            dispatch(addUserAction(user))
        },
        updateUser: (user) => {
            dispatch(updateUserAction(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDangKy)