// Importing our defined types
import { UserResponse, UserType, UserCredentials } from "./authentication.type";

const tokenKey = "auth_token";
const userTypeKey = "user_type";

export default class AuthService {
  private _token: string | null = null;
  private _userType: UserType | null = null;

  constructor() {
    this.loadCredentials();
  }

  // Load the token and user type from local storage
  private loadCredentials() {
    this._token = localStorage.getItem(tokenKey);
    this._userType = localStorage.getItem(userTypeKey) as UserType | null;
  }

  // Save the token and user type to local storage
  private saveCredentials(token: string, userType: UserType) {
    localStorage.setItem(tokenKey, token);
    localStorage.setItem(userTypeKey, userType);
    this._token = token;
    this._userType = userType;
  }

  // Clear the token and user type from local storage
  private clearCredentials() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userTypeKey);
    this._token = null;
    this._userType = null;
  }

  // Simulate the signup process
  async signup(credentials: UserCredentials): Promise<void> {
    // Here you would typically make an HTTP request to your backend to signup the user
    // This is a simulation of a successful signup
    const fakeResponse: UserResponse = {
      name: "Example User",
      email: credentials.email,
      password: credentials.password, // This would not be returned in a real application
      type: UserType.Customer, // This should be determined by your backend
      token: "fake-jwt-token-for-demo",
    };
    this.saveCredentials(fakeResponse.token, fakeResponse.type);
  }

  // Simulate the login process
  async login(credentials: UserCredentials): Promise<void> {
    // HTTP request simulation for login
    const fakeResponse: UserResponse = {
      name: "Example User",
      email: credentials.email,
      password: credentials.password, // Not typically handled like this post-login
      type: UserType.Customer, // Determined by your backend
      token: "fake-jwt-token-for-demo",
    };
    this.saveCredentials(fakeResponse.token, fakeResponse.type);

    console.log("User type:", fakeResponse.type);
    console.log("Token:", fakeResponse.token);
  }

  // Logout the user
  logout(): void {
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
  isLoggedIn(): boolean {
    return this._token !== null;
  }
}
