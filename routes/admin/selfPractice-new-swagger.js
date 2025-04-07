
/**
 * @swagger
 * tags:
 *   - name: SelfPractice
 *     description: SelfPractice management APIs
 */

/**
 * @swagger
 * /SelfPractice/add:
 *   post:
 *     tags:
 *       - SelfPractice
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayType:
 *                 type: string
 *               segmentId:
 *                 type: string
 *               subject:
 *                type: string  
 *               practices:
 *                 type: array 
 *                 items: 
 *                   type: object
 *                   properties:
 *                     questionInEnglish:
 *                       type: string 
 *                     questionInTamil:
 *                       type: string
 *                     answer:     
 *                       type: string
 *             required:
 *               - display
 *               - practice
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
 * /SelfPractice/update:
 *   put:
 *     tags:
 *       - SelfPractice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               displayType:
 *                 type: string
 *               segmentId:
 *                 type: string
 *               subject:
 *                type: string  
 *               isSubject:
 *                type: string  
 *               practices:
 *                 type: array 
 *                 items: 
 *                   type: object
 *                   properties:
 *                     questionInEnglish:
 *                       type: string 
 *                     questionInTamil:
 *                       type: string
 *                     answer:     
 *                       type: string
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
 * /SelfPractice/delete:
 *   delete:
 *     tags:
 *       - SelfPractice
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
 * /SelfPractice/get/{id}:
 *   get:
 *     tags:
 *       - SelfPractice
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the specific self practice to retrieve
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
 * /SelfPractice/lists:
 *   get:
 *     tags:
 *       - SelfPractice
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
 *         description: Number of self practice list in per page
 *     responses: 
 *       '200':
 *         description: Success
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Server Error
 */ 