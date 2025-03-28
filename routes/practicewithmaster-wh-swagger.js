
/**
 * @swagger
 * tags:
 *   - name: PracticeWithMaster-wh-customer
 *     description: Practice With Master Watched History Management APIs
 */


/**
 * @swagger
 * /practicewithmaster_wh_customer/addWatchedHistory:
 *   post:
 *     tags:
 *       - PracticeWithMaster-wh-customer
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

 