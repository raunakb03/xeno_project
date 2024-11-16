import axios from 'axios';

export const createCampaign = async (campaign: any) => {
    try {
        const response = await axios.post('http://localhost:5000/create-campaign', campaign);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getCampaigns = async (userId: any) => {
    try {
        const response = await axios.get('http://localhost:5000/get-all-campaigns?userId=' + userId);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
