/**
 * @swagger
 * tags:
 *   - name: Chat
 *     description: Chat management APIs
 */

/**
 * @swagger
 * /chat/common-chat:
 *   post:
 *     tags:
 *       - Chat
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classRoomId:
 *                 type: string
 *               message:
 *                 type: string
 *               isAudio:
 *                 type: boolean
 *             required:
 *               - classRoomId
 *               - message
 *               - isAudio
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
 * /chat/common-chat/reply:
 *   post:
 *     tags:
 *       - Chat
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classRoomId:
 *                 type: string
 *               parentId:
 *                 type: objectId
 *               message:
 *                 type: string
 *               isAudio:
 *                 type: boolean
 *             required:
 *               - parentId
 *               - segmentId
 *               - message
 *               - isAudio
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
 * /chat/common-chat/list:
 *   get:
 *     tags:
 *       - Chat
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name : classRoomId
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Server Error
 */

/**
 * @swagger
 * /chat/upload/audio:
 *   post:
 *     tags:
 *       - Chat
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               audio:
 *                 type: string
 *                 format: binary
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
