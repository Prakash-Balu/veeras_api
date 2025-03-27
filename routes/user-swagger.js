/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User management APIs
 */

/**
 * @swagger
 * /user/@me:
 *   get:
 *     tags:
 *       - User
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
 * /user/record-sesion:
 *   get:
 *     tags:
 *       - User
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
 * /user/web-logout:
 *   get:
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         token: token
 *         schema:
 *           type: token
 *     responses:
 *       '200':
 *         description: Success
 */

/**
 * @swagger
 * /user/session:
 *   get:
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         token: token
 *         schema:
 *           type: token
 *     responses:
 *       '200':
 *         description: Success
 */

/**
 * @swagger
 * /user/userDetails:
 *   post:
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *     parameters:
 *       - in: query
 *         token: token
 *         schema:
 *           type: token
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
 * /user/attendance:
 *   get:
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *         required: true
 *         description: Start date (YYYY-MM-DD format)
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *         required: true
 *         description: End date (YYYY-MM-DD format)
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
 * /user/report-attendance:
 *   get:
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: reportType
 *         schema:
 *           type: string
 *         required: true
 *         description: monthly or weekly
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Server Error
 */
