import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsRepository } from './reviews.repository';

@Injectable()
export class ReviewsService {

  constructor(private readonly reviewsRepository: ReviewsRepository) { }

  async createReview(dto: CreateReviewDto) {
    return await this.reviewsRepository.createReview(dto)
  }

  async updateReview(dto: UpdateReviewDto) {
    return await this.reviewsRepository.updateReview(dto)
  }

  async deleteReview(id: string) {
    return await this.reviewsRepository.deleteReview({ reviewId: id })
  }

}
