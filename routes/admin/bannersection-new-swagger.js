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
 *               name:
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
 *         description: Number of Banner section to list in per page
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Server Error
 */
