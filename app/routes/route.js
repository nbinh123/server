// const UserRoute = require("../routes/user/UserRoute")
// const GameRoutes = require("./game/GameRoutes")
// const ShopRoutes = require("./shop/ShopRoutes")
// nạp các route vào đây để sử dụng

const UserRoutes = require("./user/UserRoutes")

function route(app) {
    app.use("/api/user", UserRoutes)   
}

module.exports = route