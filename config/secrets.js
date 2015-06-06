var secrets = {
  db: process.env.MONGODB || 'mongodb://localhost:27017/test',
  sessionSecret: '-xX7sMSDkLkxc9ike**wdsd',
  soundcloud: {
    clientID: 'e2c5b056f6c119f619f7c492eb85f107',
    clientSecret:'e8332c51484b8657a4f00440d0fc9fe0',
    callbackURL: '/auth/soundcloud/callback',
    passReqToCallback: true
  }
};

module.exports = secrets; 