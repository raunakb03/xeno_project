import axios from 'axios';

export const createSegment = async (segment: any) => {
    try {
        const response = await axios.post('https://xeno-project.onrender.com/create-segment', { userId: segment });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getSegments = async (clerkId: any) => {
    if(!clerkId) return [];
    try {
        const response = await axios.get('https://xeno-project.onrender.com/get-all-segment?clerkId=' + clerkId);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
