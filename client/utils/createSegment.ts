import axios from 'axios';

export const createSegment = async (segment: any) => {
  try {
    const response = await axios.post('http://localhost:5000/create-segment', {userId: segment});
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
