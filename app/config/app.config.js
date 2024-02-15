module.exports = {
  // Secret key for JWT signing and encryption
  secret: 'suvey system 1.0',
  // db_collection_prefix: 'ciis_',
  lang: 'en',
  // CORS setting
  // allowed_origin: ['http://localhost:3000', 'https://localhost:4000'],
  server_url: "http://x162-43-21-229.static.xvps.ne.jp",
  // Setting port for server0
  expiresIn: 3600 * 72, // 3 days
  // Database connection information
  // db_url: 'mongodb://192.168.143.43:27017/ciis',
  // db_url: 'mongodb://127.0.0.1:27017/ciis',
  // db_options: {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // },
  serviceUrl: process.env.REACT_APP_SERVICE_URL || 'http://192.168.1.3:5005/api'
};
