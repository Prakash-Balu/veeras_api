/**
 * @swagger
 * tags:
 *   - name: SegmentCategory
 *     description: SegmentCategory management APIs
 */

/**
 * @swagger
 * /segment_category/listSegmentCategory:
 *  get:
 *     tags:
 *       -  SegmentCategory
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of category to list per page
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Server Error
 */