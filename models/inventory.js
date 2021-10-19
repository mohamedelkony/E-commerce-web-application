const mysql = require("mysql2/promise")
let conn = require("./connector").getConnection()
async function getProducts(limit) {
    let thisLimit = limit;
    if (limit == undefined || limit == null)
        thisLimit = 10;
    [res, fields] = await conn.execute(
        "select a.id as product_id,a.product_name,a.price,a.product_desc,a.quantity,b.url as image_url,b.image_name from inventory as a left join products_images as b on a.id=b.its_product_id order by a.price desc limit ?;", [thisLimit.toString()])
    return res;
}

async function addToCart(product_id, session_id) {
    let sql = "insert into cart_item(product_id,session_id) values (?,?)"
    await conn.execute(sql, [product_id, session_id])
}
async function getCart(session_id) {
    let sql = "select product_id,product_name,price,url as image_url,product_desc,image_name ,quantity from cart_item as a left join inventory as b on a.product_id=b.id left join products_images as c on a.product_id =c.its_product_id where session_id =?";
    [res, fields] = await conn.execute(sql, [session_id])
    return res;
}
exports.getProducts = getProducts
exports.addToCart = addToCart
exports.getCart = getCart