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
    for (let item of data)
        innerHTML += createCardHTML(item, 'Remove', 'card_onclick','cart')

    document.getElementById("cart").innerHTML = innerHTML
}
getCartData()
async function getOrders(){
    const res=await fetch('/orders/',{
        method:'GET'
    });
    if(res.ok)
    {
        loadOrders(await res.json())
    }
    else{
        alert('failed to retrive orders +/n'+res.statusText)
    }
}
function loadOrders(orderes)
{
    document.getElementById("orders").innerHTML = ""
    for(let order of orderes)
    {
        let innerHTML = "";
        for (let item of order.items)
            innerHTML += createCardHTML(item, null,null,'order')
        document.getElementById("orders").innerHTML += innerHTML
     }
}
getOrders()