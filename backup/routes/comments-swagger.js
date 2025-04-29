/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: Comments management APIs
 */

/**
 * @swagger
 * /comments/addComment:
 *  post:
 *     tags:
 *       - Comments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               segmentId:
 *                 example: any
 *               seqNo:
 *                 type: integer
 *               text:
 *                 example: any
 *               audioPath:
 *                 example: any
 *             required:
 *               - segmentId
 *               - seqNo
 *               - text
 *               - audioPath
 *     responses:
 *       '200':
 *         description: Success
 *       '201':
 *         description: Created
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Server Error
 */

/**
 * @swagger
 * /comments/addReplies:
 *  post:
 *     tags:
 *       - Comments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentId:
 *                 example: any
 *               seqNo:
 *                 type: integer
 *               text:
 *                 example: any
 *               audioPath:
 *                 example: any
 *             required:
 *               - commentId
 *               - seqNo
 *               - text
 *               - audioPath
 *     responses:
 *       '200':
 *         description: Success
 *       '201':
 *         description: Created
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Server Error
 */

/**
 * @swagger
 * /comments/viewComment:
 *   get:
 *     tags:
 *       - Comments
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name : segmentId
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success
 */
