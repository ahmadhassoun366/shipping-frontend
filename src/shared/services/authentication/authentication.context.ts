import { createContext } from "react";

import AuthenticationService from "./authentication.service";

const def = new AuthenticationService();

const AuthenticationSvcContext = createContext<AuthenticationService>(def);

export default AuthenticationSvcContext;