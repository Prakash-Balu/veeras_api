/**
 * @swagger
 * tags:
 *   - name: Location
 *     description: Location management APIs
 */

/**
 * @swagger
 * /location/getCountryPriceDetails:
 *  post:
 *     tags:
 *       - Location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               countryCode:
 *                 example: any
 *             required:
 *               - countryCode
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
 * /location/addLocationPrice:
 *  post:
 *     tags:
 *       - Location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               countryName:
 *                 example: any
 *               countryCode:
 *                 example: any
 *               phoneCode:
 *                 example: any
 *               currencyCode:
 *                 example: any
 *               countryFlag:
 *                 example: any
 *               currencySymbol:
 *                 example: any
 *               currencyName:
 *                 example: any
 *               currencySymbolPosition:
 *                 example: any
 *               localityLanguage:
 *                 example: any
 *               monthFee:
 *                 example: any
 *               extendedPlan1Fee:
 *                 example: any
 *               extendedPlan2Fee:
 *                 example: any
 *             required:
 *               - countryName
 *               - countryCode
 *               - phoneCode
 *               - currencyCode
 *               - countryFlag
 *               - currencySymbol
 *               - currencyName
 *               - currencySymbolPosition
 *               - localityLanguage
 *               - monthFee
 *               - extendedPlan1Fee
 *               - extendedPlan2Fee
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
 * /location/updateLocationPrice:
 *  post:
 *     tags:
 *       - Location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 example: any
 *               location_id:
 *                 example: any
 *               currencySymbolPosition:
 *                 example: any
 *               localityLanguage:
 *                 example: any
 *               monthFee:
 *                 example: any
 *               extendedPlan1Fee:
 *                 example: any
 *               extendedPlan2Fee:
 *                 example: any
 *             required:
 *               - _id
 *               - location_id
 *               - currencySymbolPosition
 *               - localityLanguage
 *               - monthFee
 *               - extendedPlan1Fee
 *               - extendedPlan2Fee
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
 * /location/deleteLocationPrice:
 *  post:
 *     tags:
 *       - Location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 example: any
 *               location_id:
 *                 example: any
 *             required:
 *               - _id
 *               - location_id
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
 * /location/getLocationPriceList:
 *  get:
 *     tags:
 *       - Location
  *     security:
 *       - BearerAuth: []
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