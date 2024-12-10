"use strict";
module.exports = function (mongoose) {
    const Schema = mongoose.Schema;

    let UserProfilesSchema = new Schema(
        {
            _id: { 
              type: Schema.Types.ObjectId
            },
            user_id: 
            {
                type: Schema.Types.ObjectId,
                ref: "user"
            },
            password: {
              type: String,
            },
            whatsapp_no: {
              type: String,
            },
            mailId: {
              type: String,
              unique: true,
              required: true,
            },
            fullName: {
              type: String,
              required: true,
            },
            userName: {
              type: String
            },
            isPaid: {
              type: Boolean,
              default: false
            },
            role: {
              type: String,
              default: 'USER',
            },
            city: {
              type: String,
            },
            state: {
              type: String,
            },
            country: {
              type: String,
            },
            address: {
              type: String,
            },
            pincode: {
              type: String,
            },
          },
          {
            timestamps: true,
            versionKey: false,
          }
    );

    return mongoose.model("user_profiles", UserProfilesSchema);
};
