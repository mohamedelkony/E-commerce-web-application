export function createCardHTML(cardData, buttonText,onclick_method_name) {
    return `<div class="card">
    <img src="${cardData.image_url}" alt="${cardData.image_name}" >
    <h5>${cardData.product_name}</h5>
    <p class="card_p">${cardData.product_desc}</p>
    <p class="price">${cardData.price}$</p>
    <button id="${cardData.product_id}" onclick="${onclick_method_name}(${cardData.product_id})">${buttonText}</button></p>
    </div>`
}