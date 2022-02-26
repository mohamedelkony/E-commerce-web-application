export function createCardHTML(cardData, buttonText, onclick_method_name, display) {
    var html = `<div class="card">
    <div class='card_details'>
    <div class='img_wrapper'>
    <img src="${cardData.image_url}" alt="${cardData.image_name}" >
    </div>
    <text class='product_name'>${cardData.product_name}</text>
    <text class="product_desc">${cardData.product_desc}</text>
    <text class="product_price">${cardData.price}$</text>`
    if (display == 'cart') {
        html += `<div class ='quantity'>
        <text>quantity</text>
        <button onclick='decreaseHandler(${cardData.product_id})'>-</button>
        <text id='${cardData.product_id}_quantity'>${cardData.quantity}</text>
        <button onclick='increaseHandler(${cardData.product_id})'>+</button>
        </div>`
    }
    else if (display == 'order') {
        html += `<div class ='quantity'>
        <text>quantity</text>
        <text>${cardData.quantity}</text>
        </div>`
    }
    html+='</div>'
    if (display != 'order') {
        if (cardData.quantity == 0) {
            html += `<button>Out of stock</button>`
        } else {
            html += `<button id="${cardData.product_id}" onclick="${onclick_method_name}(${cardData.product_id})">${buttonText}</button>`
        }
    }   html += `</div>`
    return html
}