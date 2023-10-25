import { server } from "../store.js";
import axios from "axios";


export const createCourse = (formData) => async (dispatch) => {
    try {

        dispatch({ type: "createCourseRequest" });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
        };

        const { data } = await axios.post(`${server}/createcourse`,
            formData,
            config
        );

        dispatch({ type: "createCourseSuccess", payload: data.message });

    } catch (error) {

        dispatch({ type: "createCourseFail", payload: error.response.data.message });

    }
};


export const getDashboardStats = () => async dispatch => {
    try {
        const config = {
            withCredentials: true,
        };
        dispatch({ type: 'getAdminStatsRequest' });

        const { data } = await axios.get(`${server}/admin/stats`, config);

        dispatch({ type: 'getAdminStatsSuccess', payload: data });
    } catch (error) {
        dispatch({
            type: 'getAdminStatsFail',
            payload: error.response.data.message,
        });
    }
};