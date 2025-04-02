
/**
 * @swagger
 * tags:
 *   - name: PracticeWithMaster
 *     description: PracticeWithMaster management APIs
 */

/**
 * @swagger
 * /practicewithmaster/addPractice:
 *   post:
 *     tags:
 *       - PracticeWithMaster
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               segmentId:
 *                 type: string
 *               videoUrl:
 *                 type: string
 *               shorts:
 *                 type: array 
 *                 items: 
 *                   type: object
 *                   properties:
 *                     shortUrl:
 *                       type: string 
 *                     question:
 *                       type: string
 *                     answer:     
 *                       type: string
 *             required:
 *               - name
 *               - description
 *               - videoUrl
 *               - short
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
 * /practicewithmaster/updatePractice:
 *   put:
 *     tags:
 *       - PracticeWithMaster
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               description:
 *                 type: string
 *               segmentId:
 *                 type: string
 *               videoUrl:
 *                 type: string
 *               status:
 *                 type: string
 *               shorts:
 *                 type: array 
 *                 items: 
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     shortUrl:
 *                       type: string 
 *                     question:
 *                       type: string
 *                     answer:     
 *                       type: string
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
 * /practicewithmaster/deletePractice:
 *   delete:
 *     tags:
 *       - PracticeWithMaster
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
 *       '201':
 *         description: Created
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Server Error
 */

/**
 * @swagger
 * /practicewithmaster/getPractice/{id}:
 *   get:
 *     tags:
 *       - PracticeWithMaster
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the specific practice to retrieve
 *         schema:
 *           type: string
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
 * /practicewithmaster/listPractices:
 *   get:
 *     tags:
 *       - PracticeWithMaster
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
 *         description: Number of practice with master to list in per page
 *       - in: query
 *         name: status
 *         required: false
 *         description: Get list by status ("active", "inActive", "deleted")
 *         schema:
 *           type: string
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