/**
 * @swagger
 * tags:
 *   - name: Segments
 *     description: Segments management APIs
 */

/**
 * @swagger
 * /segments/getSegments:
 *  get:
 *     tags:
 *       - Segments
  *     security:
 *       - BearerAuth: []
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
 * /segments/addSegment:
 *  post:
 *     tags:
 *       - Segments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 example: any
 *               description:
 *                 example: any
 *               video_url:
 *                 example: any
 *               iconName:
 *                 example: any
 *               routeUrl:
 *                 example: any
 *             required:
 *               - name
 *               - description
 *               - video_url
 *               - iconName
 *               - routeUrl
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
 * /segments/updateSegment:
 *  post:
 *     tags:
 *       - Segments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 example: any
 *               name:
 *                 example: any
 *               description:
 *                 example: any
 *               video_url:
 *                 example: any
 *               iconName:
 *                 example: any
 *               routeUrl:
 *                 example: any
 *             required:
 *               - _id
 *               - name
 *               - description
 *               - video_url
 *               - iconName
 *               - routeUrl
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
 * /segments/deleteSegment:
 *  post:
 *     tags:
 *       - Segments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 example: any
 *             required:
 *               - _id
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