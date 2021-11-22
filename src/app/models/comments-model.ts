export interface CommentsDboModel{
    id: string;
    recipesId: string;
    userName: string;
    message?: string;
    rating: number;
    currentDate: Date;
}