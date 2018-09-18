import axios from "axios";

export const registerUser = (user, callback) => {
   axios.post(`http://localhost:3002/api/user`, user).then(res => {
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
     axios.post(`http://localhost:3002/api/check-login`, data).then(res => {
      console.log(res);      
      const result =  res.data.result[0][0];
      callback(result);
   }).catch(err => {
     console.log(err); 
   });
};

export const getHomeInfos = () => {

};