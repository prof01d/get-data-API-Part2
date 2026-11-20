const getCategories= async ()=>{
    const response= await axios.get("https://dummyjson.com/products/categories");
    return response;
}
const displayCategories =async ()=>{
    const loader = document.querySelector('.categories_loader');
   try{
        const {data}= await getCategories();
        //console.log(data);
        const result =data.map((category) =>{
        return `
            <li><button type="button" data-category="${category.slug}">${category.name}</button></li>
        `
    }).join('');
    document.querySelector('[data-categories]').innerHTML= result;
   }
    catch{
        document.querySelector('[data-categories]').innerHTML= `<li>Faild to load Categories</li>`;
    }
    finally{
        loader.classList.add('d-none');
    }
}
displayCategories();

const getProducts= async ()=>{
    const response= await axios.get("https://dummyjson.com/products");
    return response;
}
const displayProducts =async ()=>{   
    document.querySelector('[data-products]').innerHTML= `
                <div class="product-card">
                    <div class="loader products_loader"></div>
                    <div class="product-info">
                        <h3>*****</h3>
                        <p>/////////////////////////////////////////////</p>

                        <div class="product-details">
                            
                        </div>

                        <p class="stock"> <span class="loader products_loader"> </span> </p>

                        <button class="loader products_loader"></button>
                    </div>
                </div>
                
        `;
    const loader = document.querySelector('.products_loader');
    try{
        const {data}= await getProducts();
        console.log(data.products);
        const result = data.products.map((product) =>{
            return `
                <div class="product-card" data-product-id="${product.id}">
                    <img src="${product.thumbnail}" alt="${product.description}">
                    
                    <div class="product-info">
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>

                        <div class="product-details">
                            <span class="price">$${product.price}</span>
                            <span class="rating">${product.rating}</span>
                        </div>

                        <p class="stock">In Stock: ${product.stock}</p>

                        <a href="./product.html?id=${product.id}">    
                            <button type="button" data-action="view-details">View Details</button>
                        </a>
                    </div>
                </div>
                `
        }).join('');
        document.querySelector('[data-products]').innerHTML= result;
    }
    catch{
        document.querySelector('[data-products]').innerHTML= `<li class="error">Faild to load Products</li>`;
    }
    finally{
        loader.classList.add('d-none');
    }
}
displayProducts();