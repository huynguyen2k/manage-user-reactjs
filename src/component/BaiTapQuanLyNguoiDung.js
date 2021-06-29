import React, { Component } from 'react'
import FormDangKy from './FormDangKy'
import TableDanhSachNguoiDung from './TableDanhSachNguoiDung'
import '../assets/css/style.css'

export default class BaiTapQuanLyNguoiDung extends Component {
    render() {
        console.log('BaiTapQuanLyNguoiDung')

        return (
            <div className="wrapper">
                <div className="container">
                    <FormDangKy />
                    <TableDanhSachNguoiDung />
                </div>
            </div>
        )
    }
}
