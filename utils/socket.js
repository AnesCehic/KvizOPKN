const { decrypt } = require('./encryption');
const db = require('../config/db');

module.exports = {
  authSocket: (socket, next) => {
    if(!socket.request._query.cookie) {
      next(new Error("Auth error!"));
    }

    try {
      const id = decrypt(socket.request._query.cookie.id);
      const user;
    } catch (error) {
      
    }
  }
}