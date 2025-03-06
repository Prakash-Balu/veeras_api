"use strict";

const textEn = require("../localization/en.json");
const { StatusCodes } = require("http-status-codes");

module.exports = {
    lang: "en",
    codeNew: StatusCodes,
    code: {
        HTTP_SUCCESS: 200,
        SUCCESS: 200,
        HTTP_POST_S: 201, //post request succcess
        POST_S: 201,
        HTTP_GET_S: 200, //get request Success
        GET_S: 200,
        ERR: 400,
        INVALID: 400,
        FAILURE: 400,
        PWD_MISMATCH: 400,
        BAD_REQUEST: 400,
        HTTP_ERR: 400,
        NOT_AUTHERIZED: 401,
        FORBIDDEN: 403,
        USER_FORBIDDEN: 403,
        HTTP_GET_NF: 404, //get request NotFound (No Data)
        GET_NF: 404,
        HTTP_GET_F: 404, //get request Failure
        NOT_FOUND: 404,
        NO_RECORDS: 404,
        CONFLICT: 409,
        DB_FAILURE: 500,
        DB_ERR: 500,
        DUPLICATE_ENTRY: 1001, // profile invite exists
        CONTACT_BLOCKED: 1002, // user profile not match who can contact me
        USER_ACC_DEL: 1003, // User Delete The Account
        USER_PRO_HIDE: 1004, // User Hide her profile
        UPGRADE_PLAN: 1004, // User Hide her profile
        INVALID_TOKEN: 1005, // Token Expire
        NO_TODAY_SUITABLE_MATCHS: 1006,
        EMPTY_MATCHS: 1007,
        NEARBY_MATCHS: 1008,
        RECEIVED_INVITATIONS: 1009,
        ACCEPTED_INVITATIONS: 1010,
        SENT_INVITATIONS: 1011,
        RECEIVED_REQUESTS: 1012,
        ACCEPTED_REQUESTS: 1013,
        SENT_REQUESTS: 1014,
        RECENTLY_VIEWED: 1015,
        RECENTLY_VIEWED_BYME: 1016,
        BLOCK_PROFILES: 1017,
        DONTSHOW_PROFILES: 1018,
        CONTACTVIEW_PROFILES: 1019,
        PLAN_NOT_EXISTS: 1020,
        EMPTY_ORDER: 1021,
        COUPON_NOT_EXISTS: 1022,
        PAYMENT_NOT_EXISTS: 1023,
        UPLOAD_MIN_ONE_PHOTO: 1024,
        USER_ALREADY_HAVE_THIS_PLAN: 1025,
        INVALID_PROFILE: 1026,
        NO_NOTIFICATIONS: 1027,
        PREMIUM_MATCHS: 1028,
        PLS_SET_YOUR_LOCATION: 1029,
        INVALID_DEFAULT_IMG: 1030,
        COMPLETE_THIS_STEP: 1031
    },
    text: {
        en: textEn,
    },
    loginStatus: {
        ACTIVE: 10,
        IN_ACTIVE: 20
    },
    monthOrYear: {
        MONTHS: "Month(s)",
        YEARS: "Year(s)"
    },
    paymentStatus: {
        PROCESSING: 'processing',
        FAILED: 'failed',
        SUCCESS: 'success',
        EXPIRED: 'expired'
    },
    subscriptionStatus: {
        ACTIVE: 'active',
        EXPIRED: 'expired'
    },
    role: {
        ADMIN: 'ADMIN',
        
    }
};
