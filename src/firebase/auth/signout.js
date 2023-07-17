import {
    getAuth,
    signOut
} from "firebase/auth";

const auth = getAuth();

export default async function authSignOut() {
    signOut(auth).then(() => {
        console.log('User has signed out')
    }).catch((error) => {
        console.error('Error signing out:', error)
    });
}