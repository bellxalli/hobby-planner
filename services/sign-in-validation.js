//validation for sign in(home) and create account page 
export default function validateSignIn(user)
{
    const errors = [ ]
    
    if(user.username.trim() === "")
    {
        errors.push("Must have a username");
    }
    if(user.password.trim() === "")
    {
        errors.push("Password must be longer than one character");
    }
    return {
        isValid: errors.length === 0,
        errors
    }
}