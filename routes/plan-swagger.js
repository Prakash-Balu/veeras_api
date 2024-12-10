/**
 * @swagger
 * tags:
 *   - name: Plan
 *     description: Plan management APIs
 */

/**
 * @swagger
 * /plan/getPlanDetails:
 *  get:
 *     tags:
 *       - Plan
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
 * /plan/addPlan:
 *  post:
 *     tags:
 *       - Plan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 example: any
 *               name:
 *                 example: any
 *               description:
 *                 example: any
 *               duration:
 *                 example: any
 *               offer_duration:
 *                 example: any
 *               monthoryear:
 *                 example: any
 *               monthsno:
 *                 type: integer
 *               feeFieldName:
 *                 example: any
 *             required:
 *               - code
 *               - name
 *               - description
 *               - duration
 *               - offer_duration
 *               - monthoryear
 *               - monthsno
 *               - feeFieldName
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
 * /plan/updatePlan:
 *  post:
 *     tags:
 *       - Plan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 example: any
 *               code:
 *                 example: any
 *               name:
 *                 example: any
 *               description:
 *                 example: any
 *               duration:
 *                 example: any
 *               offer_duration:
 *                 example: any
 *               monthoryear:
 *                 example: any
 *               monthsno:
 *                 type: integer
 *               feeFieldName:
 *                 example: any
 *             required:
 *               - _id
 *               - code
 *               - name
 *               - description
 *               - duration
 *               - offer_duration
 *               - monthoryear
 *               - monthsno
 *               - feeFieldName
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
 * /plan/deletePlan:
 *  post:
 *     tags:
 *       - Plan
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