import axios from "axios";

export const registerUser = (user, callback) => {
   axios.post(`http://localhost:3002/api/user`, user).then(res => {
      console.log(res);
      callback();
   }).catch(err => {
     console.log(err); 
   });
};

export const checkLogin = (username, password, callback) => {
  const data  = {
    username,
    password
  };
     axios.get(`http://localhost:3002/api/user`, data).then(res => {
      console.log(res);
      callback(1);
   }).catch(err => {
     console.log(err); 
   });
};

