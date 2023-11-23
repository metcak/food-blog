import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "dotenv";

config();

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({
  region: `${bucketRegion}`,
  credentials: {
    accessKeyId: `${accessKey}`,
    secretAccessKey: `${secretAccessKey}`
  }
})

function uploadFile(fileBuffer, fileName, mimetype) {
    const uploadParams = {
      Bucket: `${bucketName}`,
      Body: fileBuffer,
      Key: fileName,
      ContentType: mimetype
    }
  
    return s3.send(new PutObjectCommand(uploadParams));
}

async function getObjectSignedUrl(key) {
    const params = {
      Bucket: `${bucketName}`,
      Key: key
    }
  
    // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
    const command = new GetObjectCommand(params);
    const seconds = 60
    const url = await getSignedUrl(s3, command, { expiresIn: seconds });
  
    return url
}

const _uploadFile = uploadFile;
export { _uploadFile as uploadFile };
const _getObjectSignedUrl = getObjectSignedUrl;
export { _getObjectSignedUrl as getObjectSignedUrl };