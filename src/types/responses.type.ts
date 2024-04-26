import { IUsersEntity } from "src/modules/users/entities/users.entity"

export type SuccessMessageResponseType = {
    success: boolean,
    message: string
}
export type isValidatedUserResponseType = {
    isValidated: boolean,
    user: IUsersEntity | null
}