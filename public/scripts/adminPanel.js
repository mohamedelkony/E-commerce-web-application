



async function postData() {
    let myForm = document.getElementById('add_form')
    let formData = new FormData(myForm)
    const res = await fetch('/inventory', {
        method: 'POST',
        body: formData
    })
    if (res.ok) {
        let body = await res.json()
        alert(`product added (id:${body.product_id})`)
    }
    else
        alert('Error ' + await res.text())
}
async function fetchInventory() {
    const res = await fetch('/inventory?pageSize=100', {
        method: 'get'
    })
    if (res.ok) {
        let data = await res.json()
        return data
    }
    else
        throw (`Error ${await res.text()}`)
}

function loadInventoryData(data) {
    let HTML = `<table id='inventoryTable'>
<tr>
<th>id</th>
<th>name</th>
<th>descrption</th>
<th>price</th>
<th>quantity</th>
<th>image</th>
<th>delete</th>
</tr>
`
for (let item of data) {
    HTML += `<tr 
>
  <td>
    ${item.product_id}
  </td>
  <td>
  <div class ='wrapper'>
    <text class='label'>${item.product_name}</text>
    <input class='textbox' id='name_${item.product_id}' type='text' value='${item.product_name}' 
    onkeypress="editName_onkeypress(event,${item.product_id})">
    </div>
  </td>
  <td><div class ='wrapper'>
    <text class='label'>${item.product_desc}</text>
    <input id='desc_${item.product_id}' class='textbox' type='text' value='${item.product_desc}' 
    onkeypress="editDescription_onkeypress(event,${item.product_id})">
    </div>
</td>
  <td><div class ='wrapper'>
    <text class='label'>${item.price}</text>
    <input class='textbox' type='text' value='${item.price}' 
    id='price_${item.product_id}'
    onkeypress="editPrice_onkeypress(event,${item.product_id})">
    </div>
</td>
  <td><div class ='wrapper'>
    <text class='label'>${item.quantity}</text>
    <input class='textbox' type='text' value='${item.quantity}' 
    id='quantity_${item.product_id}'
    onkeypress="editQuantity_onkeypress(event,${item.product_id})">
    </div>
</td>
<td>
<img src='${item.image_url}' width=40px>
</td>
  <td><input type='button' value='delete' onclick='delete_onClick(${item.product_id})'></td>
	</tr>`
  }
  HTML += '</table>'
  document.getElementById("tablediv").innerHTML = HTML;

}

async function delete_onClick(id) {
    if (confirm(`Are you sure to delete product of id :${id}?`) == true) {
        {
            const res = await fetch('/inventory', {
                method: 'DELETE',
                body: JSON.stringify({ 'product_id': id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                let body = await res.json()
                alert(`product of id:${body.product_id} has been deleted succesfully`)
            location.reload()
            }
            else
                alert('Error ' + await res.text())
        }
    }
}
async function loadInventory() {
    try {
        let data = await fetchInventory()
        loadInventoryData(data)
    } catch (error) {
        alert(error)
    }
}
loadInventory()
async function editName_onkeypress(e, id) {
    if (e.keyCode === 13) {
      e.preventDefault(); 
      let newname=document.getElementById('name_'+id).value
       if(confirm(`rename to ${newname}?`)==true)
       {
        let res=await fetch('/inventory/name',{
            method:'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({'product_id':id,
                'product_name':newname
            })
        })
        if(res.ok)
        {
            alert('success')
            location.reload()
        }
        else{
            alert('error'+await res.text())
        }
       } 
    }
}
async function editDescription_onkeypress(e, id) {
    if (e.keyCode === 13) {
        e.preventDefault(); 
        let newname=document.getElementById('desc_'+id).value
         if(confirm(`update description to ${newname}?`)==true)
         {
          let res=await fetch('/inventory/description',{
              method:'put',
              headers: {
                  'Content-Type': 'application/json'
              },
              body:JSON.stringify({'product_id':id,
                  'product_desc':newname
              })
          })
          if(res.ok)
          {
              alert('success')
              location.reload()
          }
          else{
              alert('error'+await res.text())
          }
         } 
      }
  }
  async function editPrice_onkeypress(e, id) {
    if (e.keyCode === 13) {
        e.preventDefault(); 
        let newprice=document.getElementById('price_'+id).value
        newprice=Number.parseFloat(newprice)
        if(newprice<=0) 
        {
            alert('invalid price')
        }
        if(confirm(`change price to ${newprice}?`)==true)
         {
          let res=await fetch('/inventory/price',{
              method:'put',
              headers: {
                  'Content-Type': 'application/json'
              },
              body:JSON.stringify({'product_id':id,
                  'price':newprice
              })
          })
          if(res.ok)
          {
              alert('success')
              location.reload()
          }
          else{
              alert('error'+await res.text())
          }
         } 
      }
  }

  async function editQuantity_onkeypress(e, id) {
    if (e.keyCode === 13) {
        e.preventDefault(); 
        let newQuantity=document.getElementById('quantity_'+id).value
         if(confirm(`update quantity to ${newQuantity}?`)==true)
         {
          let res=await fetch('/inventory/quantity',{
              method:'put',
              headers: {
                  'Content-Type': 'application/json'
              },
              body:JSON.stringify({'product_id':id,
                  'quantity':newQuantity
              })
          })
          if(res.ok)
          {
              alert('success')
              location.reload()
          }
          else{
              alert('error'+await res.text())
          }
         } 
      }
  
}
