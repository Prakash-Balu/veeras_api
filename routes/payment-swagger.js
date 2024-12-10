/**
 * @swagger
 * tags:
 *   - name: Payment
 *     description: Payment management APIs
 */

/**
 * @swagger
 * /payment/create:
 *   post:
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               planId:
 *                 type: string
 *               currencyCode:
 *                 type: string
 *               amount:
 *                 type: number
 *             required:
 *               - planId
 *               - currencyCode
 *               - amount
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