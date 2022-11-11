import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isAuthenticated(){
    console.log('checking if logged in')
    let result = false;
    return this.http.get('/api/loggedin', {withCredentials: true}).pipe(
      map(() => true),
      catchError(() => of(false))
    )
  }

  setUserInfo(user:any) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  validate(email:string, password:string) {
    return this.http.post('/api/login', {'username': email, 'password': password}, {withCredentials: true});
  }

  register(email:string, firstName:string, lastName:string, password:string) {
    return this.http.post('/api/register', {email, firstName, lastName, password});
  }

  logout() {
    return this.http.delete('/api/logout', {withCredentials: true});
  }

}
