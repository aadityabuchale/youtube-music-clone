import React from "react";
import MediumSizeButton from "./MediumSizeButton";
import "./Common_components.styles/LikeDislikeClickModal.css";

function LikeDislikeClickModal() {
    return (
        <div className="like-modal-container">
            <h2 className="like-modal-heading">Like This Song</h2>
            <p className="like-modal-para">
                Improve recommendations and save music after signing in
            </p>
            <MediumSizeButton text={"Sign in"} />
        </div>
    );
}

export default LikeDislikeClickModal;
