import axios from 'axios';

export const createCampaign = async (campaign: any) => {
    try {
        const response = await axios.post('https://xeno-project.onrender.com/create-campaign', campaign);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getCampaigns = async (userId: any) => {
    if(!userId) return [];
    try {
        const response = await axios.get('https://xeno-project.onrender.com/get-all-campaigns?userId=' + userId);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
