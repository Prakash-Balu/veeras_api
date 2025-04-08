/**
 * @swagger
 * tags:
 *   - name: Agora
 *     description: Agora management APIs
 */


/**
 * @swagger
 * /agora/generate-token:
 *  get:
 *     tags:
 *       - Agora
 *     parameters:
 *       - in: query
 *         name: channelName
 *         schema:
 *           type: string
 *         required: false
 *         description: Channel name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         required: false
 *         description: Role as needed Publisher or Subscriber
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Server Error
 */