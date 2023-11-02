const express = require("express") // dùng thư viện express
const app = express()
const IP = 'localhost'
//`192.168.1.53`
// thuật toán hash mật khẩu
const crypto = require('crypto');

async function hashPassword(password) {
    // Tạo một salt ngẫu nhiên
    const salt = crypto.randomBytes(16).toString('hex');

    // Sử dụng sha256 để hash password kết hợp với salt
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');

    // Trả về salt cùng với hash password để lưu vào cơ sở dữ liệu
    return { salt, hash };
}

function verifyPassword(password, salt, hash) {
    // Sử dụng lại salt và hash đã lưu trong cơ sở dữ liệu để kiểm tra password nhập vào
    const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');

    // So sánh hash của password nhập vào với hash đã lưu
    return hash === verifyHash;
}

class UserController {

    index = async (req, res, next) => {
        res.json("ok")    
    }

    login = async (req, res, next) => {
        const { email, password } = req.body

        // lấy ra thông tin người dùng theo email
        const data = await UserSchema.findOne(
            { email: email }
        )
        if (verifyPassword(password, data.passwordHashed.salt, data.passwordHashed.hash)) {
            res.status(200).json({
                message: "Login successfully",
                UID: data._id,
                userData: data,
                status: 200
            })
        } else {
            res.json({
                message: "Login fail",
                status: 400
            })
        }
    }
    
    register = async (req, res, next) => {
        res.redirect("http://localhost:5500/form2.html")
        
    }
    
} 

module.exports = new UserController;