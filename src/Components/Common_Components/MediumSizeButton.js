import { Button } from "@mui/material";
import React from "react";
import { useAuth0Object } from "../../Contexts/MusicAuthProvider";

function MediumSizeButton({ text }) {
	const { loginWithRedirect } = useAuth0Object();

	return (
		<Button
			sx={{
				backgroundColor: "white",
				border: "1.5px solid #555",
				// position: "absolute",
				// right: 0,
				margin: "10px",
				color: "black",
				textTransform: "none",
				padding: "5px 5px",
				borderRadius: "25px",
				display: "flex",
				gap: "8px",
				":hover": {
					backgroundColor: "#ddd",
				},

				":active": text === "Sign In" && {
					backgroundColor: "black",
					color: "white",
					border: "1px solid white",
				},
			}}
			onClick={() => loginWithRedirect()}
		>
			{text}
		</Button>
	);
}

export default MediumSizeButton;
