import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DB_Provider, DB_Type } from "src/infra/db";
import { reviewsModel } from "src/infra/db/schema";

interface CreateReviewArgs {
    productId: string
    userId: string
    comment: string
    rating: number
}

interface UpdateReviewArgs {
    reviewId: string
    comment: string
}

interface DeleteReviewArgs {
    reviewId: string
}

interface IReviewsRespository {
    createReview(args: CreateReviewArgs): Promise<{ id: string, comment: string }>,
    deleteReview(args: DeleteReviewArgs): Promise<any>,
    updateReview(args: UpdateReviewArgs): Promise<any>
}

@Injectable()
export class ReviewsRepository implements IReviewsRespository {
    constructor(@Inject(DB_Provider) private readonly db: DB_Type) { }

    async createReview({ productId, userId, comment, rating }: CreateReviewArgs): Promise<any> {

        const newReview = await this.db
            .insert(reviewsModel)
            .values({
                userId,
                productId,
                comment,
                rating,
            })
            .returning({ id: reviewsModel.id, comment: reviewsModel.comment })

        return newReview[0];
    }

    async deleteReview({ reviewId }: DeleteReviewArgs): Promise<any> {

        const deletedReview = await this.db
            .delete(reviewsModel)
            .where(eq(reviewsModel.id, reviewId))

        return deletedReview
    }
    async updateReview({ reviewId, comment }: UpdateReviewArgs): Promise<{ id: string, comment: string }> {

        const updatedReview = await this.db
            .update(reviewsModel)
            .set({ comment })
            .where(eq(reviewsModel.id, reviewId))
            .returning({ id: reviewsModel.id, comment: reviewsModel.comment })

        return updatedReview[0]
    }

    // async createReview(userId: string, productId: string, dto: any) {
    //     const { rating, comment } = dto
    //     const review = await this.db
    //         .insert(reviewsModel)
    //         .values({
    //             userId,
    //             productId,
    //             rating,
    //             comment
    //         })
    //         .returning({ id: reviewsModel.id })
    //     return review
    // } s
}