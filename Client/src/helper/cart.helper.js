export const addToCartHelper = (cart, item, customer, updateQty = false, quantity, removeItem=false) => {

    let newCart = { ...cart }

    let items = [...newCart.items]

    try {
        if (newCart.items.length > 0) {

            let itemAllreadyExist = newCart.items.find(i => i.id === item.id)
            let itemAllreadyExistIndex = newCart.items.findIndex(i => i.id === item.id)
    
            if (removeItem) {
                // console.log("testing");
                items.splice(itemAllreadyExistIndex, 1)
    
            } else {
                if (itemAllreadyExist) {
    
                    if (updateQty) {
                        items.splice(itemAllreadyExistIndex, 1, {
                            ...itemAllreadyExist,
                            qty: quantity
                        })
                    } else {
                        items.splice(itemAllreadyExistIndex, 1, {
                            ...itemAllreadyExist,
                            qty: itemAllreadyExist.qty + 1
                        })
                    }
    
                } else {
                    items.push({ ...item, qty: 1 })
    
                }
            }
    
    
        } else {
            items.push({ ...item, qty: 1 })
        }
    } catch (error) {
        console.log(error.message);
    }

  



    newCart.items = items

    newCart.subTotal = 0;
    newCart.tax = 0;
    newCart.grandTotal = 0;

    for (const i of newCart.items) {

        newCart.subTotal += parseFloat(i.price) * parseInt(i.qty)
    }

    newCart.grandTotal = newCart.subTotal + newCart.tax

    newCart.customer = customer

    return newCart;
}