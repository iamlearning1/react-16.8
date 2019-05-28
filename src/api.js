import axios from 'axios';

export default axios.create({
  baseURL: 'https://burger-builder-1-1.firebaseio.com'
});
