export interface ValidatedCreateAccountDetails {
    email: string,
    secret: string,
}

export interface ValidatedLoginDetails {
    email: string,
    pass: string,
}

export interface ValidatedVerifyDetails {
    email: string,
    pass: string,
    code: string,
}

export interface Session {
    token: string,
    account_id: string,
    expiration: number
}

export async function createAccount(accountDetails: ValidatedCreateAccountDetails): Promise<boolean> {
    try {
        const response = await fetch(`/api/account/create`, {
            method: "POST",
            body: JSON.stringify(accountDetails)
        });
        return true;
    } catch (e) {
        // TODO: parse error message from response
        throw new Error("failed to create account");
    }
}

export async function login(loginDetails: ValidatedLoginDetails): Promise<boolean> {
    try {
        const response = await fetch(`/api/account/login`, {
            method: "POST",
            body: JSON.stringify(loginDetails)
        });
        const session: Session = await response.json();
        window.localStorage.setItem("session", JSON.stringify(session));

        return true;
    } catch (e) {
        // TODO: parse error message from response
        throw new Error("Failed to Login");
    }
}

export async function verify(verifyDetails: ValidatedVerifyDetails): Promise<boolean> {
    try {
        const response = await fetch(`/api/account/logout`, {
            method: "POST",
            body: JSON.stringify(verifyDetails)
        });
        return true;
    } catch (e) {
        // TODO: parse error message from response
        throw new Error("failed to verify account");
    }
}

export async function logout(session: Session): Promise<boolean> {
    try {
        const response = await fetch(`/api/account/logout`, {
            method: "POST",
            body: JSON.stringify({ token: session.token })
        });
        return true;
    } catch (e) {
        // TODO: parse error message from response
        throw new Error("failed to logout");
    }
}