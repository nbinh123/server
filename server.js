// import Schema


const express = require("express")
const app = express()
const http = require("http")
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const cors = require("cors")
const methodOverride = require('method-override');
const server = http.createServer(app);
const route = require("./app/routes/route")

// server sẽ chạy ở port 5000
server.listen(5000, () => {
    console.log("Listening at port 5000")
})
app.use(bodyParser.urlencoded({ extended: true }));


// kết nối database
async function connectDB() {

    // connect tới database blog
    try {
        await mongoose.connect(`mongodb://127.0.0.1/my_database`, {
            dbName: "Start-up",
        });
        // console.log("Connect database Successfully")
    } catch (error) {
        console.log("Connect blog Failure!")
    }

    // connect tới database collection

}
connectDB()

// cấu hình cái này để chuyển dổi dữ liệu khi chuyển lên client
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// cấu hình cái này là fix lỗi cors, chỉ sử dụng trong quá trình phát triển
app.use(cors());
// sử dụng method override để có thể gửi đi với phương thức put patch delete
app.use(methodOverride('_method'));












const IP = "192.168.1.51"
const { Server } = require("socket.io")
const io = new Server(server, {
    // Cấu hình socket.io sử dụng đường dẫn /socket.io
    path: '/socket.io',
    cors: {
        origin: `http://127.0.0.1:5500`,
        methods: ["GET", "POST"]
    }
})

route(app)


io.on('connection', (socket) => {
    console.log(socket.id)


    socket.on('disconnect', () => {
        console.log("Có người vừa rời khỏi trang ", socket.id)
    })

    socket.on("Client-send-msg", (msg) => {
        console.log(msg)
    })
}); 










// routers
