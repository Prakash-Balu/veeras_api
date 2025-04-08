/**
 * @swagger
 * tags:
 *   - name: Classroom
 *     description: Classroom management APIs
 */

/**
 * @swagger
 * /classroom/add:
 *   post:
 *     tags:
 *       - Classroom
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               segmentId:
 *                 type: string
 *               subject:
 *                 type: string
 *               video_url:
 *                type: string
 *             required:
 *               - subject
 *               - segmentId
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
 * /classroom/update:
 *   put:
 *     tags:
 *       - Classroom
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               segmentId:
 *                 type: string
 *               subject:
 *                 type: string
 *               isSubject:
 *                 type: string
 *               video_url:
 *                 type: string
 *               slug_url:
 *                 type: string
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
 * /classroom/delete:
 *   delete:
 *     tags:
 *       - Classroom
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *             required:
 *               - id
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
 * /classroom/get/{id}:
 *   get:
 *     tags:
 *       - Classroom
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the specific Classroom to retrieve
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
 * /classroom/lists:
 *   get:
 *     tags:
 *       - Classroom
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of class room list in per page
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Server Error
 */
