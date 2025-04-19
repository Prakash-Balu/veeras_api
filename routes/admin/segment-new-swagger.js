/**
 * @swagger
 * tags:
 *   - name: Segments - new
 *     description: Segments management APIs
 */


/**
 * @swagger
 * /segments_new/addSegment:
 *  post:
 *     tags:
 *       -  Segments - new
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: array 
 *                 items: 
 *                   type: string 
 *             required:
 *               - title
 *               - category
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
 * /segments_new/updateSegment:
 *  put:
 *     tags:
 *       -  Segments - new
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *               category:
 *                 type: array 
 *                 items: 
 *                   type: string 
 *               status:
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
 * /segments_new/listSegments:
 *  get:
 *     tags:
 *       -  Segments - new
 *     security:
 *       - BearerAuth: []
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
 *         description: Number of Segment to list in per page
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
 * /segments_new/{id}:
 *   get:
 *     tags:
 *       - Segments - new
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the specific segment to retrieve
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



// /**
//  * @swagger
//  * /segments_new/deleteSegment:
//  *  put:
//  *     tags:
//  *       -  Segments - new
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               id:
//  *                 type: string
//  *             required:
//  *               - _id
//  *     responses:
//  *       '200':
//  *         description: Success
//  *       '400':
//  *         description: Bad Request
//  *       '500':
//  *         description: Server Error
//  */