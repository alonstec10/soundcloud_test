var secrets = {
  db: process.env.MONGODB || 'mongodb://localhost:27017/test',
  sessionSecret: '-xX7sMSDkLkxc9ike**wdsd',
  soundcloud: {
    clientID: 'b5a386539cde753037a5dc9a7ec0628d',
    clientSecret:'6384923983c6783c7df86a0959e8a435',
    callbackURL: '/auth/soundcloud/callback',
    passReqToCallback: true
  }
};

module.exports = secrets; 