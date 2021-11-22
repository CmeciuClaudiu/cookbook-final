import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserModel } from 'src/app/models/user-model';
import { Observable } from 'rxjs';
import { CommentsDboModel } from '../models/comments-model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  constructor(private http: HttpClient) { }

  user={} as UserModel; 

  userPost(user: UserModel): Observable<UserModel>{
    return this.http.post<UserModel>('http://cookbook.ddns.net:5000/api/users',user);
  }

  getUserDetails(name:string,password:string): Observable<UserModel>{
    let params = new HttpParams().set("name",name)
                                 .set("password", password);

    return this.http.get<UserModel>('http://cookbook.ddns.net:5000/api/users/userDetails' ,{ params: params});

  }

  editUser(user:UserModel,username:string,password:string){
    let params =new HttpParams().set("username",username)
                                .set("password",password);

    return this.http.put<UserModel>('http://cookbook.ddns.net:5000/api/users' ,user ,{params:params});
  }

  getUserList(name:string,password:string){
    let params=new HttpParams().set("name",name)
                               .set("password",password);

    return this.http.get<UserModel[]>('http://cookbook.ddns.net:5000/api/users/userList' ,{params:params})
  }

  deleteUser(username:string,loggedInUser:string,password:string) : Observable<string>{
      let params = new HttpParams().set("userName",username)
                                   .set("loggedInUser",loggedInUser)
                                   .set("password",password);

      return this.http.delete<string>('http://cookbook.ddns.net:5000/api/users' ,{ responseType: 'text' as 'json' , params:params});
  }

  getComments(recipeId: string){
    let params =new HttpParams().set("recipeId",recipeId);

    return this.http.get<CommentsDboModel[]>('http://cookbook.ddns.net:5000/api/users/comments',{params:params})
  }

  postComment (userComment: CommentsDboModel){
    return this.http.post('http://cookbook.ddns.net:5000/api/users/comments',userComment)
  }
}
