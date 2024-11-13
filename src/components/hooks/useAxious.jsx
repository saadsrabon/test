import axios from 'axios';

const axiousInstace = axios.create({
  baseURL: 'https://api.elplanes.com/api/v1',
});

const UseAxious = () => {
  return axiousInstace;
};

export default UseAxious;
