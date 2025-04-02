
/**
 * @swagger
 * tags:
 *   - name: BannerSection
 *     description: BannerSection management APIs
 */


/**
 * @swagger
 * /bannerSection/addBannerSection:
 *   post:
 *     tags:
 *       - BannerSection
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               motivationalDescription:
 *                 type: string
 *               videoUrl:
 *                 type: string
 *             required:
 *               - name
 *               - motivationalDescription
 *               - videoUrl
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
 * /bannerSection/updateBannerSection:
 *   put:
 *     tags:
 *       - BannerSection
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               motivationalDescription:
 *                 type: string
 *               videoUrl:
 *                 type: string
 *               status:
 *                 type: string
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
 * /bannerSection/listBannerSection:
 *   get:
 *     tags:
 *       - BannerSection
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