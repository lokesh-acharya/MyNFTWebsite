export default {
    MONGODB_URL: process.env.MONGODB_URL ||  'mongodb://localhost/amazona',
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || 'iamthegreatest',
    BUCKET_NAME: process.env.BUCKET_NAME || '',
    ID: process.env.ID || '',
    SECRET: process.env.SECRET || '',
    REGION: process.env.REGION || ''
};