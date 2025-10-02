/**
 * Sends a standardized success response.
 * @param {object} res - The Express response object.
 * @param {number} statusCode - The HTTP status code.
 * @param {object} data - The payload to send (the actual data).
 * @param {string} [message] - An optional success message.
 */
const sendSuccess = (res, statusCode, data, message = 'Success') => {
  res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
};

export default sendSuccess;