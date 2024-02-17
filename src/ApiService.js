import axios from "axios";

const BASE_URL = "https://academics.newtonschool.co/api/v1/music/";
const PROJECT_ID = "7y0dq8leevty";

// get all songs
async function getSongsByCategory(endUrl) {
    try {
        const result = await axios.get(BASE_URL + endUrl, {
            headers: {
                projectId: PROJECT_ID,
            },
        });

        // console.log(result.data.data);

        return result.data.data;
    } catch (err) {
        return console.log(err);
    }
}

// for single music
async function getMusic(id) {
    try {
        const result = await axios.get(BASE_URL + "song/" + id, {
            headers: {
                projectId: PROJECT_ID,
            },
        });

        return result.data.data;
    } catch (err) {
        console.log(err);
    }
}

// for albums or artists
async function getAlbumOrArtist(id, isAlbum) {
    const albumOrArtist = isAlbum ? "album/" : "artist/";

    const URL = BASE_URL + albumOrArtist + id;

    try {
        const result = await axios.get(URL, {
            headers: {
                projectId: PROJECT_ID,
            },
        });

        // console.log(result.data.data);

        return result.data.data;
    } catch (err) {
        console.log(err);
    }
}

// for searchResults
async function getSearchResult(input, type) {
    let URL = `${BASE_URL}${type}?search={"title":"${input}"}`;

    if (type === "artist") {
        URL = `${BASE_URL}${type}?search={"name":"${input}"}`;
    } else {
        URL = `${BASE_URL}${type}?search={"title":"${input}"}`;
    }

    // console.log(URL);

    try {
        const result = await axios.get(URL, {
            headers: {
                projectId: PROJECT_ID,
            },
        });

        // console.log(result.data.data);

        return result.data.data;
    } catch (err) {
        console.log(err);
    }
}

async function loginUser(email, password) {
    const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                projectId: "7y0dq8leevty",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                appType: "music",
            }),
        }
    );

    const result = await response.json();

    return result;
}

async function signupUser(name, email, password) {
    const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                projectId: "7y0dq8leevty",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
                appType: "music",
            }),
        }
    );

    const result = response.json();

    return result;
}

export {
    getSongsByCategory,
    getMusic,
    getAlbumOrArtist,
    getSearchResult,
    loginUser,
    signupUser,
};
