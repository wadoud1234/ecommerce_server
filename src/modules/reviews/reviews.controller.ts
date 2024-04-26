import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { createReviewDto, CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Validation } from 'src/common/decorators/validation.decorator';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("Reviews")
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }
  @Post()
  @Validation(createReviewDto)
  async createReview(@Body() dto: CreateReviewDto) {
    return await this.reviewsService.createReview(dto)
  }

  @Patch()
  async updateReview(@Body() dto: UpdateReviewDto) {
    return await this.reviewsService.updateReview(dto)
  }
}
