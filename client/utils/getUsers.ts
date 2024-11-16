import axios from "axios";

export const getAllUsers = async () => {
    try {
        const response = await axios.get("http://localhost:5000/get-all-users");
        return response.data;
    } catch (error) {
        console.log("Error while fetching users", error);
        return [];
    }
};

export const getFilteredUsers = async (filter: any) => {
    try {
        const response = await axios.post("http://localhost:5000/get-filtered-users", { filterData: filter });
        return response.data;
    } catch (error) {
        console.log("Error while fetching users", error);
        return [];
    }
};
