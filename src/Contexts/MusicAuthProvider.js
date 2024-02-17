import { useAuth0 } from "@auth0/auth0-react";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { loginUser, signupUser } from "../ApiService";

const MusicAuthContext = createContext();

function MusicAuthProvider({ children }) {
    // auth0 hook
    const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();

    const intialAuthObj = {
        isSignIn: false,
        userModal: false,
        userInfo: {},
        userAuthToken: "",
        likeX: NaN,
        likeY: NaN,
    };

    function authReducer(state, action) {
        switch (action.type) {
            case "setUserInfo":
                return { ...state, userInfo: action.payload };

            case "showModal":
                return { ...state, userModal: true };

            case "hideModal":
                return { ...state, userModal: false };

            case "setToken":
                return { ...state, userAuthToken: action.payload };

            case "setLikePosition":
                return { ...state };
        }
    }

    const [authState, authDispatch] = useReducer(authReducer, intialAuthObj);

    const { isSignIn, userInfo, userAuthToken, userModal } = authState;

    //handling user information

    useEffect(() => {
        async function fetchUser() {
            if (user) {
                // checking user login status
                const userData = await loginUser(user?.email, user?.sub);

                console.log("login status data", userData);

                if (userData?.status === "success") {
                    authDispatch({
                        type: "setToken",
                        payload: userData?.token,
                    });
                } else if (userData.status === "fail") {
                    //if we get user at firt we signup it initially
                    const userSignupData = await signupUser(
                        user?.name,
                        user?.email,
                        user?.sub
                    );

                    console.log("signup status data", userSignupData);

                    if (userSignupData?.status === "success") {
                        authDispatch({
                            type: "setToken",
                            payload: userData?.token,
                        });
                    }
                }
            }
        }

        fetchUser();
    }, [user]);

    // handling modal operations
    useEffect(() => {
        document.querySelector(".user-modal").style.visibility = userModal
            ? "visible"
            : "hidden";
    }, [userModal]);

    // ---------------- handling like dislike button clicks ----------------

    function handleLikeClick(e) {}

    let object = {
        ...authState,
        authDispatch,
    };

    return (
        <MusicAuthContext.Provider value={object}>
            {children}
        </MusicAuthContext.Provider>
    );
}

function useMusicAuth() {
    let obj = useContext(MusicAuthContext);

    if (obj) {
        return obj;
    } else {
        console.log("trying to access MusicAuthContext from outside");
    }
}

function useAuth0Object() {
    let authObj = useAuth0();

    if (authObj) {
        return authObj;
    } else {
        console.log("trying to access MusicAuth but user not registered");
    }
}

export default MusicAuthProvider;
export { useMusicAuth, useAuth0Object };
