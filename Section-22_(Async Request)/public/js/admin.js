const deleteProduct = (btn) =>{
    const prodId = btn.parentNode.querySelector('[name = productId]').value;
    const csrf_token = btn.parentNode.querySelector('[name = _csrf]').value;

    const productElement = btn.closest('article');

    fetch('/admin/product/' + prodId,{
        method : 'DELETE',
        headers : {
            'csrf-token' : csrf_token
        }
    })
    .then(result => {
        return result.json();
    })
    .then(data => {
        if(data.message === 'Success'){
            productElement.parentNode.removeChild(productElement);
        }  
    })
    .catch(err => {
        console.log(err);
    })

}