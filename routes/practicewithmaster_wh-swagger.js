
/**
 * @swagger
 * tags:
 *   - name: practiceWithMaster_wh_customer
 *     description: practiceWithMaster_wh_customer management APIs
 */


/**
 * @swagger
 * /practiceWithMaster_wh_customer/addWatchedHistory:
 *   post:
 *     tags:
 *       - practiceWithMaster_wh_customer
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               practiceWithMasterId:
 *                 type: string
 *               shortId:
 *                 type: string
 *             required:
 *               - practiceWithMasterId
 *               - shortId
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

 