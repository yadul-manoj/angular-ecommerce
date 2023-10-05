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

export interface IWishlist {
    userId: number,
    products: IProduct[],
    totalItems: number,
}

export interface ICategoryProducts {
    category: string,
    productList: IProductList | null
}