'use strict';

/**
 * Custom middleware used by the application
 */
module.exports = {

  /**
   *  Protect routes on your api from unauthenticated access
   */
  auth: function auth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send(401);
  },

  /**
   * Set a cookie for angular so it knows we have an http session
   */
  setUserCookie: function(req, res, next) {
    console.info('req.user', req.user);
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.userInfo), { maxAge: 2592000000 });
    }
    next();
  }
};