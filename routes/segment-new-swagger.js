/**
 * @swagger
 * tags:
 *   - name: Segments -new customer
 *     description: Segment list management APIs
 */

/**
 * @swagger
 * /segments_new_customer/listSegments:
 *  get:
 *     tags:
 *       -  Segments -new customer
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
