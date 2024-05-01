// Define the type for the basic user information that might be returned on signup or login
export type UserResponse = {
    name: string;
    email: string;
    password: string;  // Note: Storing password like this is for demonstration. In practice, passwords should not be handled on the client-side like this after signup/login.
    type: UserType;
    token: string;     // JWT Token for authenticating further requests
    id: string
}

// Enum for user types
export enum UserType {
    Customer = "Customer",
    Receiver = "Receiver"
}

// Optionally, define other relevant types for your authentication flow, such as credentials for login
export type UserCredentials = {
    email: string;
    password: string;
}
