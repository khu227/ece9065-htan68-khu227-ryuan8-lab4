import axios from "axios";
import { BASE_URL } from "./setting";

const API_URL = BASE_URL + 'api/open/';

const searchTracks = (artistName, trackTitle, trackGenre) => {
    return axios.post(API_URL + 'trackDetailsBycombi', {
        artist_name: artistName,
        track_title: trackTitle,
        track_genres: trackGenre
    })
        .then(
            response => {
                return response.data;
            }
        );
};

const getPublicLists = () => {
    return axios.get(API_URL + 'tenPublicList')
        .then(
            response => {
                if (response.data.status == 401)
                    return [];
                else
                    return response.data;
            }
        );
};

const getPublicListsMore = name => {
    return axios.post(API_URL + 'tenPublicListMore', {
        list_name: name
    })
        .then(
            response => {
                return response.data;
            }
        );
};

const getListReviews = name => {
    return axios.post(API_URL + 'reviewOnPlaylist', {
        list_name: name
    })
        .then(
            response => {
                return response.data;
            }
        );
};

const getPolicy = name => {
    return axios.post(API_URL + 'showPolicy', {
        policy_name: name
    })
    .then(response => {
        console.log(response.data);
        return response.data.message[0].policy_body;
    });
};

export default {
    searchTracks,
    getPublicLists,
    getPublicListsMore,
    getListReviews,
    getPolicy
};