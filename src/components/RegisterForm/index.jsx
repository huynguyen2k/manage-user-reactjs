import React, { useEffect, useState } from 'react'
import './style.scss'


export default function RegisterForm(props) {

    const { onUserRegister, userEdit, onUserUpdate } = props

    const [ formValues, setFormValues ] = useState({
        username: '',
        password: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        userType: 'Guess',
    })

    const [ formErrors, setFormErrors ] = useState({
        username: '',
        password: '',
        fullName: '',
        phoneNumber: '',
        email: '',
    })

    const [ controlBtn, setControlBtn ] = useState({
        disabledRegister: false,
        disabledUpdate: true,
    })

    useEffect(() => {
        if (typeof userEdit !== 'object' || userEdit === null) return

        if (Object.keys(userEdit).length > 0) {
            setFormValues({...userEdit})
            resetFormErrors()
            setControlBtn({
                disabledRegister: true,
                disabledUpdate: false,
            })
        }

    }, [userEdit])

    const resetFormValues = () => {
        setFormValues({
            username: '',
            password: '',
            fullName: '',
            email: '',
            phoneNumber: '',
            userType: 'Guess',
        })
    }

    const resetFormErrors = () => {
        setFormErrors({
            username: '',
            password: '',
            fullName: '',
            phoneNumber: '',
            email: '',
        })
    }

    const resetControlBtn = () => {
        setControlBtn({
            disabledRegister: false,
            disabledUpdate: true,
        })
    }

    const resetState = () => {
        resetFormValues()
        resetFormErrors()
        resetControlBtn()
    }

    const handleValueChange = (e) => {
        const { name, value } = e.target

        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleInputBlur = (e) => {
        const { name, value } = e.target

        handleFormValidate(name, value)
    }

    const handleFormValidate = (name, value) => {
        let errorMessage = ''

        switch (name) {

            case 'password': {
                const passwordRegex = /^\w{6,}$/

                if (!passwordRegex.test(value)) {
                    errorMessage = 'Password must at least 6 characters!'
                }
                break
            }

            case 'phoneNumber': {
                const phoneNumberRegex = /^\d{10}$/

                if (!phoneNumberRegex.test(value)) {
                    errorMessage = 'Phone number must have 10 numeric!'
                }
                break
            }

            case 'email': {
                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                
                if (!emailRegex.test(value)) {
                    errorMessage = 'Email is not valid!'
                }
                break
            }

            default: {
                if (value === '') {
                    errorMessage = name + ' is required!'
                }
            }
        }

        formErrors[name] = errorMessage

        setFormErrors({
            ...formErrors,
            [name]: errorMessage
        })
    }

    const isValidForm = () => {
        return Object.values(formErrors).every(errorMessage => errorMessage === '')
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        Object.entries(formValues).forEach(([ name, value ]) => handleFormValidate(name, value))
    
        if (isValidForm() && onUserRegister) {
            onUserRegister(formValues)
            resetState()
        }
    }

    const handleUserUpdate = () => {
        Object.entries(formValues).forEach(([ name, value ]) => handleFormValidate(name, value))

        if (isValidForm() && onUserUpdate) {
            onUserUpdate(formValues)
            resetState()
        }
    }


    return (
        <form className="register-form" onSubmit={handleFormSubmit} method="post">
            <h1 className="register-form__header">Register Form</h1>
            <div className="row register-form__body">
                <div className="col-6">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input onBlur={handleInputBlur} onChange={handleValueChange} value={formValues.username} type="text" className="form-input" name="username" id="username" />
                    <p className="error-message">{formErrors.username}</p>
                </div>
                <div className="col-6">
                    <label className="form-label" htmlFor="fullName">Full name</label>
                    <input onBlur={handleInputBlur} onChange={handleValueChange} value={formValues.fullName} type="text" className="form-input" name="fullName" id="fullName" />
                    <p className="error-message">{formErrors.fullName}</p>
                </div>
                <div className="col-6">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input onBlur={handleInputBlur} onChange={handleValueChange} value={formValues.password} type="password" className="form-input" name="password" id="password" />
                    <p className="error-message">{formErrors.password}</p>
                </div>
                <div className="col-6">
                    <label className="form-label" htmlFor="phoneNumber">Phone number</label>
                    <input onBlur={handleInputBlur} onChange={handleValueChange} value={formValues.phoneNumber} type="text" className="form-input" name="phoneNumber" id="phoneNumber" />
                    <p className="error-message">{formErrors.phoneNumber}</p>
                </div>
                <div className="col-6">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input onBlur={handleInputBlur} onChange={handleValueChange} value={formValues.email} type="text" className="form-input" name="email" id="email" />
                    <p className="error-message">{formErrors.email}</p>
                </div>
                <div className="col-6">
                    <label className="form-label" htmlFor="userType">Loại người dùng</label>
                    <select onChange={handleValueChange} value={formValues.userType} className="form-input" name="userType" id="userType">
                        <option value="Guess">Guess</option>
                        <option value="Member">Member</option>
                        <option value="Manager">Manager</option>
                        <option value="Founder">Founder</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <div className="col-12">
                    <button disabled={controlBtn.disabledRegister} type="submit" className="btn btn-success">Register</button>
                    <button disabled={controlBtn.disabledUpdate} type="button" onClick={handleUserUpdate} className="btn btn-primary">Update</button>
                </div>
            </div>
        </form>
    )
}
