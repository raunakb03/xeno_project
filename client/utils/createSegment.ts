import axios from 'axios';

export const createSegment = async (segment: any) => {
    try {
        const response = await axios.post('http://localhost:5000/create-segment', { userId: segment });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getSegments = async (clerkId: any) => {
    console.log("called");
    try {
        const response = await axios.get('http://localhost:5000/get-all-segment?clerkId=' + clerkId);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
