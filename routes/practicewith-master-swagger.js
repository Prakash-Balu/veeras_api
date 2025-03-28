
/**
 * @swagger
 * tags:
 *   - name: PracticeWithMaster-Customer
 *     description: PracticeWithMasterCustomer management APIs
 */

/**
 * @swagger
 * /practicewithmaster-customer/getPractice/{id}:
 *   get:
 *     tags:
 *       - PracticeWithMaster-Customer
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
 * /practicewithmaster-customer/listPractices:
 *   get:
 *     tags:
 *       - PracticeWithMaster-Customer
 *     parameters:
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