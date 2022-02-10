async function card_onclick(me) {
    const res = await fetch('/cart', {
        body: JSON.stringify({
            product_id: me
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res.ok)
        alert('item added')
    else {
        alert(res.statusText+'\n'+await res.text())
    }
}