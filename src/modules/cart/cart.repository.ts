import { Inject, Injectable } from "@nestjs/common";
import { and, eq } from "drizzle-orm";
import { DB_Provider, DB_Type } from "src/infra/db";
import { cartModel } from "src/infra/db/schema";
import { cartItemModel } from "src/infra/db/schema/cartItem.model";

// interface AddProductToCartArgs {
//     productId: string,
//     quantity: string,
//     userId: string,
//     storeId: string
// }
interface AddProductToCartArgs {
    productId: string,
    quantity: number,
    cartId: string,
    productPrice: number
}

interface RemoveProductFromCartArgs {
    productId: string,
    cartId: string,
}

interface UpdateUserCart {
    cartId: string,

}
interface ICartRepository {

}

@Injectable()
export class CartRepository implements ICartRepository {
    constructor(@Inject(DB_Provider) private db: DB_Type) { }

    async getUserCart(id: string) {
        const cart = await this.db.query.cartModel.findFirst({
            where: eq(cartModel.userId, id),
            with: {
                cartItems: true
            }
        })
        return cart;
    }


    async addProductToCart({ cartId, productId, productPrice, quantity }: AddProductToCartArgs) {

        const newCartItem = await this.db
            .insert(cartItemModel)
            .values({
                cartId,
                productId,
                productPrice,
                quantity
            })

        return newCartItem
    }

    async UpdateUserCart({ }: UpdateUserCart) {

    }
    async removeProductFromCart({ cartId, productId }: RemoveProductFromCartArgs) {

        const deleted = await this.db
            .delete(cartItemModel)
            .where(
                and(
                    eq(cartItemModel.cartId, cartId),
                    eq(cartItemModel.productId, productId)
                )
            )
        return deleted;
    }
}
