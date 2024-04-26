import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { removeProductFromCartDto, RemoveProductFromCartDto } from './dto/remove-product-from-cart.dto';
import { Validation } from 'src/common/decorators/validation.decorator';
import { AddProductToCartDto, addProductToCartDto } from './dto/add-product-to-cart.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Cart")
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Get(":id")
  async getUserCart(@Param("userId") userId: string) {
    return await this.cartService.getUserCart(userId)
  }

  @Patch(":cartId")
  @Validation(removeProductFromCartDto)
  async updateUserCart(@Param("cartId") cartId: string, @Body() dto: RemoveProductFromCartDto) {
    return await this.cartService.removeProductFromCart(cartId, dto)
  }

  @Post(":cartId")
  @Validation(addProductToCartDto)
  async addProductToCart(@Param("cartId") cartId: string, @Body() dto: AddProductToCartDto) {
    return await this.cartService.AddProductToCart(cartId, dto)
  }
}
