import React, { useState } from "react";
import CastSharpIcon from "@mui/icons-material/CastSharp";
import { Avatar, Button } from "@mui/material";
import "./Components.styles/Header.css";
import SearchBox from "./SearchBox";
import SignInModal from "./SignInModal";
import { useAuth0Object, useMusicAuth } from "../Contexts/MusicAuthProvider";
import MediumSizeButton from "./Common_Components/MediumSizeButton";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useMusic } from "../Contexts/MusicPlayerProvider";
import { useNavigate } from "react-router-dom";
import { useMusicLogic } from "../Contexts/MusicLogicsProvider";

function Header() {
	const { user, isAuthenticated } = useAuth0Object();
	const { authDispatch, userModal } = useMusicAuth();
	const [navExpanded, setNavExpanded] = useState(true);

	const navigate = useNavigate();
	const { handleMusicPlayer, musicPlayer, musicController } = useMusic();
	const { searchDispatch } = useMusicLogic();
	// console.log(document.querySelector(".user-modal"));

	function handleAvatarClick() {
		if (userModal) authDispatch({ type: "hideModal" });
		else authDispatch({ type: "showModal" });
	}

	function handleNavbarClick() {
		if (musicPlayer === "active" && musicController === "active") {
			handleMusicPlayer("keepAsItIs", "inactive", "active");
		}

		navigate("/");
	}

	return (
		<div className='header'>
			<div className='header-logo-container'>
				<MenuOutlinedIcon
					sx={{ cursor: "pointer" }}
					onClick={() => searchDispatch({ type: "setNavExpanded" })}
				></MenuOutlinedIcon>

				<img
					src='/images/on_platform_logo_dark.svg'
					alt='logo-img'
					className='nav-item-logo'
					onClick={handleNavbarClick}
				/>
			</div>
			<SearchBox />

			<div className=' header-login'>
				<CastSharpIcon
					className='screencast-icon'
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
							cursor: "pointer",
						}}
						src={user?.picture}
						onClick={handleAvatarClick}
						className='keepSigninModal'
					></Avatar>
				)}
			</div>

			{userModal && <SignInModal />}
		</div>
	);
}

export default Header;
