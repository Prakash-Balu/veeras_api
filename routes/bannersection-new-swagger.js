
/**
 * @swagger
 * tags:
 *   - name: BannerSection_customer
 *     description: BannerSection management APIs
 */

/**
 * @swagger
 * /bannerSectionCustomer/listBannerSection:
 *   get:
 *     tags:
 *       - BannerSection_customer
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
 *         description: Number of Banner section to list in per page
 *     responses: 
 *       '200':
 *         description: Success
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Server Error
 */ 