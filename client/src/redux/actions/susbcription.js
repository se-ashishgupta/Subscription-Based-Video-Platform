import { server } from "../store.js";
import axios from "axios";


export const buySubscription = () => async (dispatch) => {
    try {

        dispatch({ type: "buySubscriptionRequest" });

        const { data } = await axios.get(`${server}/subscribe`,
            {
                withCredentials: true,
            });

        dispatch({ type: "buySubscriptionSuccess", payload: data.subscriptionId });
        console.log(data.subscriptionId);

    } catch (error) {

        dispatch({ type: "buySubscriptionFail", payload: error.response.data.message });

    }
};