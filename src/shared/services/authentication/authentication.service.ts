import { UserType } from "./authentication.type";

const tokenKey = "auth_token";
const userTypeKey = "user_type";

export default class AuthService {
  private _token: string | null = null;
  private _userType: UserType | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadCredentials();
    }
  }

  // Load the token and user type from local storage, only in client-side
  private loadCredentials() {
    this._token = localStorage.getItem(tokenKey);
    this._userType = localStorage.getItem(userTypeKey) as UserType | null;
  }

  // Save the token and user type to local storage, only in client-side
  public saveCredentials(token: string, userType: UserType) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(tokenKey, token);
      localStorage.setItem(userTypeKey, userType);
      this._token = token;
      this._userType = userType;
    }
  }

  // Clear the token and user type from local storage, only in client-side
  public clearCredentials() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(tokenKey);
      localStorage.removeItem(userTypeKey);
    }
    this._token = null;
    this._userType = null;
  }

  // Handle the actual login using external response data
  public async login(token: string, userType: UserType): Promise<void> {
    this.saveCredentials(token, userType);
  }

  // Logout the user, only in client-side
  public logout(): void {
    this.clearCredentials();
  }

  // Get the current token
  get token(): string | null {
    return this._token;
  }

  // Get the current user type
  get userType(): UserType | null {
    return this._userType;
  }

  // Check if the user is logged in
  public isLoggedIn(): boolean {
    return this._token !== null && typeof window !== 'undefined';
  }
}
