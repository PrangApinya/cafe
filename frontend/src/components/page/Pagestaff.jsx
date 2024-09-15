import React from 'react'
import './Pagestaff.css'
const Pagestaff = () => {
  return (
    <div className="container mt-3">
            <table className="table table-hover">
                            <thead className="table-header">
                                <tr>
                                    <th>RFID</th>
                                    <th>ชื่อ</th>
                                    <th>นามสกุล</th>
                                    <th>รหัสผ่าน</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>July</td>
                                    <td>Dooley</td>
                                    <td>july@example.com</td>
                                    <td>124315</td>
                                </tr>
                            </tbody>
                        </table>
        </div>
  )
}

export default Pagestaff