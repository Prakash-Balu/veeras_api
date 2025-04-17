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



/**
 * @swagger
 * /payment/createnew:
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
 *               phoneCode:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               currencyCode:
 *                 type: string    
 *               planId:
 *                 type: string
 *               amount:
 *                 type: number
 *               referralId:
 *                 type: string 
 *             required:
 *               - planId
 *               - currencyCode
 *               - amount
 *               - phoneCode
 *               - phone     
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