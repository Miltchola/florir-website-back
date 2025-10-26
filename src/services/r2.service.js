import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME || !R2_PUBLIC_DOMAIN) {
  throw new Error("Missing R2 environment variables. Please check your .env file.");
}

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

/**
 * Uploads a file to R2
 * @param {Buffer} fileBuffer - The file buffer
 * @param {string} mimetype - The file's mimetype (e.g., "image/jpeg")
 * @returns {Promise<string>} - The public URL of the uploaded file
 */
export const uploadFile = async (fileBuffer, mimetype) => {
  const fileExtension = mimetype.split('/')[1] || 'jpg';
  const fileName = `${uuidv4()}.${fileExtension}`;

  const params = {
    Bucket: R2_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimetype,
  };

  try {
    await s3.send(new PutObjectCommand(params));
    const fileUrl = `${R2_PUBLIC_DOMAIN}/${fileName}`;
    return fileUrl;
  } catch (err) {
    console.error("Error uploading to R2:", err);
    throw new Error("Failed to upload file.");
  }
};

/**
 * Deletes a file from R2
 * @param {string} fileUrl - The public URL of the file to delete
 * @returns {Promise<void>}
 */
export const deleteFile = async (fileUrl) => {
  if (!fileUrl || !fileUrl.startsWith(R2_PUBLIC_DOMAIN)) {
    console.warn("Invalid file URL for deletion:", fileUrl);
    return;
  }

  const fileName = fileUrl.replace(`${R2_PUBLIC_DOMAIN}/`, "");

  const params = {
    Bucket: R2_BUCKET_NAME,
    Key: fileName,
  };

  try {
    await s3.send(new DeleteObjectCommand(params));
  } catch (err) {
    console.error("Error deleting from R2:", err);
  }
};