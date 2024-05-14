import { UserType } from "./authentication.type";

const tokenKey = "auth_token";
const userTypeKey = "user_type";
const userId = "user_id";

export default class AuthService {
  private _token: string | null = null;
  private _userType: UserType | null = null;
  private _id: string | null = null;
  constructor() {
    if (typeof window !== "undefined") {
      this.loadCredentials();
    }
  }

  // Load the token and user type from local storage, only in client-side
  private loadCredentials() {
    this._token = localStorage.getItem(tokenKey);
    this._userType = localStorage.getItem(userTypeKey) as UserType | null;
    this._id = localStorage.getItem(userId);
  }

  // Save the token and user type to local storage, only in client-side
  public saveCredentials(token: string, userType: UserType, id: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem(tokenKey, token);
      localStorage.setItem(userTypeKey, userType);
      localStorage.setItem(userId, id);
      this._token = token;
      this._userType = userType;
    }
  }

  // Clear the token and user type from local storage, only in client-side
  public clearCredentials() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(tokenKey);
      localStorage.removeItem(userTypeKey);
      localStorage.removeItem(userId);
    }
    this._token = null;
    this._userType = null;
    this._id = null;
  }
  

  // Handle the actual login using external response data
  public async login(
    token: string,
    userType: UserType,
    id: string
  ): Promise<void> {
    this.saveCredentials(token, userType, id);
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

  get userId(): string | null {
    return this._id;
  }
  // Check if the user is logged in
  public isLoggedIn(): boolean {
    return this._token !== null && typeof window !== "undefined";
  }
}
