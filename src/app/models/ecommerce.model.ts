export interface IUser {
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    image: string,
    token: string
}

export interface IProduct {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: string[]
}

export interface IProductList {
    products: IProduct[],
    total: number,
    skip: number,
    limit: number
}

// export interface ICart {
//     carts: [
//         {
//             id: number,
//             products: [
//                 {
//                     id: number,
//                     title: string,
//                     price: number,
//                     quantity: number,
//                     total: number,
//                     discountPercentage: number,
//                     discountedPrice: number
//                 }
//             ],
//             total: number,
//             discountedTotal: number,
//             userId: number,
//             totalProducts: number,
//             totalQuantity: number
//         }
//     ],
//     total: number,
//     skip: number,
//     limit: number
// }

export interface ICart {
    userId: number,
    products: [{
        product: IProduct,
        quantity: number,
        total: number
    }],
    totalItems: number,
    total: number
}