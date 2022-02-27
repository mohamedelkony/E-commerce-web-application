async function getUserData() {
    const res = await fetch(`/users/me`, {
        method: 'GET'
    });
    if (res.ok)
        loadUserData(await res.json());
    else {
        alert(`Can't get user` + res.statusText)
    }
}
function loadUserData(data) {
    document.getElementById('username').innerText = data.username;
    document.getElementById('email').innerText = data.email;
    document.getElementById('gender').innerText = data.gender;
    document.getElementById('dateofbirth').innerText = data.birth;
}
async function card_onclick(product_id) {
    const res = await fetch(`/cart`, {
        method: 'DELETE',
        body: JSON.stringify({ "product_id": product_id }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res.ok) {
        alert('item removed')
        location.reload()
    }
    else
        alert(await res.status + await res.statusText + await res.data);
}
async function decreaseHandler(product_id) {
    const res = await fetch(`/cart`, {
        method: 'put',
        body: JSON.stringify({ "product_id": product_id, 'quantity': 'down' }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res.ok) {
        document.getElementById(product_id + '_quantity').innerText = (await res.json()).quantity
    }
    else
        alert(await res.status + await res.statusText + await res.data);
}
async function increaseHandler(product_id) {
    const res = await fetch(`/cart`, {
        method: 'put',
        body: JSON.stringify({ "product_id": product_id, 'quantity': 'up' }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res.ok) {

        document.getElementById(product_id + '_quantity').innerText = (await res.json()).quantity
    }
    else
        alert(await res.status + await res.statusText + await res.data);
}

async function order_onclick()
{
    const res=await fetch('/orders/',{
        method:'post'
    });
    if(res.ok)
    {
        alert('new order was created for cart items succesfully')
        location.reload()
    }
    else{
        alert('failed to order cart items +/n'+res.statusText)
    }

}
getUserData(window.location.pathname.split('/')[2])
