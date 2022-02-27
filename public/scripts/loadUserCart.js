import { createCardHTML } from '/scripts/componentGenerator.js';
async function getCartData() {
    document.getElementById('cart').innerHTML = "Loading ...";
    const res = await fetch(`/cart`, {
        method: 'GET'
    })
    if (res.ok)
        loadCartData(await res.json());
    else {
        alert(`error loading cart \n${await res.statusText}\n${await res.text()}`);
    }
}
function loadCartData(data) {
    document.getElementById("cart").innerHTML = ""
    let innerHTML = "";
    if (data.length > 0)
        document.getElementById('order_button').style.display = 'block'
    else
        innerHTML+=`<text>no items had been added to cart yet</text>`
    for (let item of data)
        innerHTML += createCardHTML(item, 'Remove', 'card_onclick', 'cart')

    document.getElementById("cart").innerHTML = innerHTML
}
getCartData()
async function getOrders() {
    const res = await fetch('/orders/', {
        method: 'GET'
    });
    if (res.ok) {
        loadOrders(await res.json())
    }
    else {
        alert('failed to retrive orders +/n' + res.statusText)
    }
}
function loadOrders(orderes) {
    document.getElementById("orders-tab").innerHTML = ""
    let innerHTML = ''
    for (let order of orderes) {
        innerHTML+=`<div class='order-container'>`
        innerHTML+=`<div class='order-details'>`
        innerHTML += ` 
        <text>order id</text>
        <text>${order.order_id}</text>
        <text>status</text>
        <text>${order.status}</text>
        <text>total price</text>
        <text>${order.total_price}</text>
        <text>payment method</text>
        <text>cash on delivery</text>
      
        `
        innerHTML += '</div>'
    
        innerHTML += `<div class='store'>`;
        for (let item of order.items)
            innerHTML += createCardHTML(item, null, null, 'order')
        innerHTML += '</div>'
        innerHTML += '</div>'
    }
    document.getElementById("orders-tab").innerHTML += innerHTML
}
getOrders()