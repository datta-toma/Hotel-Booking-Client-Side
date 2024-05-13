import {  GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useState } from "react";
import auth from '../firebase/firebase.config';
import { useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

//  social auth provider
 const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    
    const [loading, setLoading] = useState(true);
    console.log(loading)

    // create user
    const createUser = (email, password) =>{
      setLoading(true);
      return  createUserWithEmailAndPassword(auth, email, password)
    }

    // update Profile
    const updateUserProfile = (name, image) =>{
       return updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
          })
    }

    // sin in user
    const signInUser = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google login
    const googleLogin = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }


    // logout
    const logout = () =>{
        setUser(null)
        setLoading(true)
        signOut(auth) 
    }

    // observable
    useEffect(() =>{
       const unsubscribe = onAuthStateChanged(auth, (user) => {
        const userEmail = user?.email || user?.email;
        const loggedUser = {email: userEmail}
        setLoading(false)
        setUser(user);
        // if user exists then  issue a token
        if(user){    
            axios.post('http://localhost:5000/jwt', loggedUser, {withCredentials: true})
            .then(res =>{
                console.log('token response', res.data);
            })
        }
        else{
            axios.post('http://localhost:5000/logout', loggedUser, {withCredentials: true})
            .then(res =>{
                console.log(res.data);
            })
        }


        // if (user) {
        //     setUser(user);
        //     setLoading(false);
        //   }
        //   else {
        //     setUser(null);
        //     setLoading(false);
        //   }
           
          });
          return () => unsubscribe();
    },[]);

    
    const allValues ={createUser, signInUser, googleLogin,  logout, user, updateUserProfile, loading}

    return (
        <AuthContext.Provider value={allValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;