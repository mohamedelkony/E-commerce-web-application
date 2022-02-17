export function createCardHTML(cardData, buttonText,onclick_method_name,displayQuantity) {
    var html= `<div class="card">
    <div class='img_wrapper'>
    <img src="${cardData.image_url}" alt="${cardData.image_name}" >
    </div>
    <h4>${cardData.product_name}</h4>
    <p class="card_p">${cardData.product_desc}</p>
    <p class="price">${cardData.price}$</p>`
    if(displayQuantity)
    {
        html+=`<div class ='quantity'>
        <text>quantity</text>
        <button onclick='decreaseHandler(${cardData.product_id})'>-</button>
        <text id='${cardData.product_id}_quantity'>${cardData.quantity}</text>
        <button onclick='increaseHandler(${cardData.product_id})'>+</button>
        </div>`
    }

    html+= `<button id="${cardData.product_id}" onclick="${onclick_method_name}(${cardData.product_id})">${buttonText}</button>
    </div>`
    return html
}