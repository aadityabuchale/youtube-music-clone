import React, { useState } from "react";
import CastSharpIcon from "@mui/icons-material/CastSharp";
import { Avatar, Button } from "@mui/material";
import "./Components.styles/Header.css";
import SearchBox from "./SearchBox";
import SignInModal from "./SignInModal";
import { useAuth0Object, useMusicAuth } from "../Contexts/MusicAuthProvider";
import MediumSizeButton from "./Common_Components/MediumSizeButton";

function Header() {
    const { user, isAuthenticated } = useAuth0Object();
    const { authDispatch, userModal } = useMusicAuth();

    // console.log(document.querySelector(".user-modal"));

    function handleAvatarClick() {
        if (userModal) authDispatch({ type: "hideModal" });
        else authDispatch({ type: "showModal" });
    }

    return (
        <div className="header">
            <SearchBox />

            <div className=" header-login">
                <CastSharpIcon
                    className="screencast-icon"
                    style={{ fill: "#999", marginTop: "3px" }}
                />

                {!isAuthenticated ? (
                    <MediumSizeButton text={"Sign In"} />
                ) : (
                    <Avatar
                        sx={{
                            width: 30,
                            height: 30,
                            fontSize: 13,
                        }}
                        src={user?.picture}
                        onClick={handleAvatarClick}
                        className="keepSigninModal"
                    ></Avatar>
                )}
            </div>

            {userModal && <SignInModal />}
        </div>
    );
}

export default Header;
