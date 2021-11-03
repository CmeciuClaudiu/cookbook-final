export interface UserModel{
    id: string;
    userName: string;
    email: string;
    password: string;
    userRole: number;
}

export interface UserPasword{
    password:string;
    passwordChck:string;
}

export interface UserLogInObject{
    username:string;
    password:string;
}