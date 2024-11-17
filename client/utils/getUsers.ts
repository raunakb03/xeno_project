import axios from "axios";

export const getAllUsers = async () => {
    console.log("called");
    try {
        const response = await axios.get("https://xeno-project.onrender.com/get-all-users");
        return response.data;
    } catch (error) {
        console.log("Error while fetching users", error);
        return [];
    }
};

export const getFilteredUsers = async (filter: any) => {
    try {
        const response = await axios.post("https://xeno-project.onrender.com/get-filtered-users", { filterData: filter });
        return response.data;
    } catch (error) {
        console.log("Error while fetching users", error);
        return [];
    }
};
