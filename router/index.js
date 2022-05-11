
const Router = require("koa-router");
const router = new Router();
//const router = new Router({ prefix: "/users" }); 
const { sequelize } = require('../sequelize')
const { classify, order, good, card } = sequelize.models

const baseApi = require("../controllers")

const Classify = baseApi(classify)
const Order = baseApi(order);
const Card = baseApi(card);
const Good = baseApi(good)
const GoodController = require("../controllers/good")
const OrderController = require("../controllers/order")
const CardController = require("../controllers/card")
const ClassifyController = require("../controllers/classify")



router.get('/classify/page', ClassifyController.get_page, Classify.$get_page);
router.post("/classify", Classify.$post)
router.delete("/classify", Classify.$delete)
router.put("/classify", Classify.$put)

router.get("/orderStatus", Order.$get)
router.get("/order", Order.$get)
router.post("/takeCard", OrderController.takeCard)
router.get("/order/page", OrderController.get_page, Order.$get_page)
router.put("/order", Order.$put)
router.post("/order", Order.$post)
router.delete("/order", Order.$delete)

router.get("/good/page", GoodController.get_page, Good.$get_page)
router.get("/good", Good.$get)
router.put("/good", Good.$put)
router.post("/good", Good.$post)
router.delete("/good", Good.$delete)

router.get("/card/page", CardController.get_page, Card.$get_page)
router.get("/card", Card.$get)
router.put("/card", Card.$put)
router.post("/card", CardController.bulkCreate)
router.delete("/card", Card.$delete)




module.exports = router