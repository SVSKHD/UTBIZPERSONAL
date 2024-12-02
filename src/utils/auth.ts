// /utils/auth.ts
import { User, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../configs/firebase";

/**
 * Logs in a user using Google authentication via Firebase.
 * @returns {Promise<User>} The authenticated user's information.
 * @throws Will throw an error if the login process fails.
 */
export const googleLogin = async (): Promise<User> => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("User Info:", user);
        return user;
    } catch (error) {
        console.error("Error during Google login:", error);
        throw error;
    }
};

/**
 * Logs out the currently authenticated user.
 * @returns {Promise<void>}
 * @throws Will throw an error if the logout process fails.
 */
export const logout = async (): Promise<void> => {
    try {
        await signOut(auth);
        console.log("User signed out");
    } catch (error) {
        console.error("Error during logout:", error);
        throw error;
    }
};