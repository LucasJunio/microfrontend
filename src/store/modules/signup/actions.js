export function signupRequest(object) {
    return {
        type: '@signup/SIGNUP_REQUEST',
        payload: object
    };
}

export function returnSignupRequest(object) {
    return {
        type: '@signup/SIGNUP_RETURN',
        payload: { object }
    };
}