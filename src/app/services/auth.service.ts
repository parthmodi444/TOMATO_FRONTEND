import { CredentialsModel } from './../models/credentials.model';
import { firstValueFrom } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import store from '../redux/store';
import { loginAction, logoutAction, registerAction } from '../redux/auth-state';
import { deleteCartAction } from '../redux/cart-state';
import { removeAllItemsAction } from '../redux/cart-items-state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public async isUserIdFree(userId: number): Promise<string> {
    let userIdToCheck = { userId: userId };
    const response = await firstValueFrom(
      this.http.post<string>(environment.preRegisterUrl, userIdToCheck)
    );
    return response;
  }

  // ------------------------------------


  public async register(user: UserModel): Promise<void> {
    const token = await firstValueFrom(
      this.http.post<string>(environment.registerUrl, user)
    );
    store.dispatch(registerAction(token));

    // token expires in '2 houres'
    setTimeout(() => this.logout(), 7200000);
  }

  // ------------------------------------

  
  public async login(credentials: CredentialsModel): Promise<void> {
    const token = await firstValueFrom(
      this.http.post<string>(environment.loginUrl, credentials)
    );
    store.dispatch(loginAction(token));

    // token expires in '2 houres'
    setTimeout(() => this.logout(), 7200000);
  }

  public logout(): void {
    store.dispatch(logoutAction());
    store.dispatch(deleteCartAction());
    store.dispatch(removeAllItemsAction());
  }
}
