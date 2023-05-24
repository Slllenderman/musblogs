import { AppDispatch } from "..";
import axios from "axios";
import { postFeedSlice } from "../reducers/postFeedSlice";
import { FullPostProps } from "../../Types/DataBase";

export const fetchPostFeed = (url: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postFeedSlice.actions.postFeedFetching())
        const response = await axios.get<Array<FullPostProps>>(url)
        dispatch(postFeedSlice.actions.postFeedFetchingPosts([...response.data]))
        dispatch(postFeedSlice.actions.postFeedFetchingSuccess())
    }
    catch (error: any) {
        dispatch(postFeedSlice.actions.postFeedFetchingError(error.message))
    }
}