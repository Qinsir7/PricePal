// aws-config.js
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-west-2',  // 更新为你的 AWS 区域
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, // 从环境变量中读取 AWS 访问密钥 ID
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY, // 从环境变量中读取 AWS 秘密访问密钥
});

module.exports = AWS;
