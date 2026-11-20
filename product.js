const searchParams= new URLSearchParams(location.search);
const id= searchParams.get('id');

const getProductInfo= async (id)=> {
    const {data}= await axios.get(`https://dummyjson.com/product/${id}`);
    return data;
}

const displayProductInfo= async (id)=> {
    const loader= document.querySelector('.details-loader');
    try{
        const Product= await getProductInfo(id);


        document.querySelector('.product-images').innerHTML = `            
            <div class="main-image">
                <img src="${Product.thumbnail}" alt="${Product.title}" />
            </div>

            <div class="thumbnail">
                    
            </div>
        `
        document.querySelector('.thumbnail').innerHTML = Product.images.map((imgThum)=>{
            return  `
                <img src="${imgThum}" alt="Product thumbnail" />
            `
        }).join('');

        document.querySelector('.product-info').innerHTML= `
            <span class="category">${Product.category}</span>

                <h1>${Product.title}</h1>

                <p class="brand">Brand: <strong>${Product.brand? Product.brand: ""}</strong></p>

                <div class="rating">
                    ${Product.rating} / 5
                </div>

                <div class="price">
                    <span>${Product.price}</span>
                    <del>$11.16</del>
                    <span class="discount">${Product.discountPercentage}% OFF</span>
                </div>

                <p class="description">
                    ${Product.description}
                </p>

                <div class="availability">
                    <span class="status">In Stock</span>
                    <span>${Product.stock} items available</span>
                </div>

                <p class="sku">SKU: ${Product.sku}</p>

                <p class="minimum-order">
                    Minimum Order Quantity: ${Product.minimumOrderQuantity}
                </p>

                <button class="add-to-cart" type="button">
                    Add to Cart
                </button>
        `

        document.querySelector('.additional-info').innerHTML += `
            <div class="specifications">
                <div><strong>Weight:</strong> ${Product.weight} g</div>
                <div><strong>Width:</strong> ${Product.dimensions.width} cm</div>
                <div><strong>Height:</strong> ${Product.dimensions.height} cm</div>
                <div><strong>Depth:</strong> ${Product.dimensions.depth} cm</div>
                <div><strong>Warranty:</strong> ${Product.warrantyInformation} </div>
                <div><strong>Shipping:</strong> ${Product.shippingInformation}</div>
                <div><strong>Return Policy:</strong> ${Product.returnPolicy}</div>
                <div><strong>Barcode:</strong> ${Product.meta.barcode}</div>
            </div>

            <h2>Tags</h2>
            <div class="tags">
            </div>
        `
        document.querySelector('.tags').innerHTML= Product.tags.map( (tag)=> {
            return `
                <span>${tag}</span>
                `
        }).join('');

        document.querySelector('.reviews').innerHTML += Product.reviews.map((review)=>{
            let stars= "⭐".repeat(review.rating)
            return `
                <div class="review">
                <div class="review-header">
                    <strong>${review.reviewerName}</strong>
                    <span>${stars} ${review.rating}</span>
                </div>
                <p>${review.comment}</p>
            </div>
            `
        })

    }catch(error){
        document.querySelector('.product-info').innerHTML= `
                <div calss="error">
                    Faild to load Data
                </div>
        `
    }finally{
        loader.classList.add('d-none')
    }
}
displayProductInfo(id);