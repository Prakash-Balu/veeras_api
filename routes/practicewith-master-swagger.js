
/**
 * @swagger
 * tags:
 *   - name: PracticeWithMasterCustomer
 *     description: PracticeWithMasterCustomer management APIs
 */

/**
 * @swagger
 * /practicewithmasterCustomer/getPractice/{id}:
 *   get:
 *     tags:
 *       - PracticeWithMasterCustomer
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
 * /practicewithmasterCustomer/listPractices:
 *   get:
 *     tags:
 *       - PracticeWithMasterCustomer
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