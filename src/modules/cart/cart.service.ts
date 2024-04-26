import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartRepository } from './cart.repository';
import { AddProductToCartDto } from './dto/add-product-to-cart.dto';
import { RemoveProductFromCartDto } from './dto/remove-product-from-cart.dto';

@Injectable()
export class CartService {

  constructor(private readonly cartRepository: CartRepository) { }

  async getUserCart(id: string) {
    return await this.cartRepository.getUserCart(id)
  }

  async AddProductToCart(cartId: string, dto: AddProductToCartDto) {
    return await this.cartRepository.addProductToCart({ ...dto, cartId })
  }

  async removeProductFromCart(cartId: string, dto: RemoveProductFromCartDto) {
    return await this.cartRepository.removeProductFromCart({ ...dto, cartId })
  }
}