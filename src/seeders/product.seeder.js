import faker from 'faker';
import { Product } from '..products/ProductsModel';
module.exports = require("../../index")

export const seedProducts = async () => {
    try {
        
        const quantity = 20
        const products = []
        
        for (let i = 0; i < quantity; i++) {
            products.push(
                new Product({
                    name: faker.commerce.product(),
                    description: faker.commerce.productDescription(),
                    startPrice: faker.commerce.price(),
                    images: faker.internet.cats(), 
                    sellerId: faker.datatype.uuid(),
                    state: faker.datatype.boolean(), 
                    productState: faker.lorem.sentence(),
                    timestramp: faker.date.past(),
                    bids: faker.datatype.number(),
                    endCost: faker.finance.amount(),
                })
            )
        }
console.log(products)
        products.forEach (product =>{
            Product.create(product)
        })

    } catch (error) {
        console.log(error)
    }
};

seedProducts()

module.exports = {
    seedProducts()
}