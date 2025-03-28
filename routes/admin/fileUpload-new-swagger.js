/**
 * @swagger
 * tags:
 *   - name: File Upload
 *     description: FileUpload APIs
 */

/**
 * @swagger
 * /fileupload:
 *   post:
 *     tags:
 *       - File Upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               section:
 *                 type: string
 *                 description: The section name where the video will be stored.
 *                 example: Banner
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: Upload video and get video url.
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Server Error
 */
