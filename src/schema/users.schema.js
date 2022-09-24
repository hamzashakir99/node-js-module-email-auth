const usersSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
      default: null,
    },
    last_name: {
      type: String,
      trim: true,
      default: null,
    },
    user_name: {
      type: String,
      trim: true,
      default: null,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      default: null,
      required: true
    },
    jwt_token: [
      {
        token: {
          type: String,
          default: null
        },
        device_info: {
          type: Object,
          default: {
            device_type: null,
            device_vendor: null,
            os: null,
            os_version: null,
            browser: null,
            browser_version: null,
          }
        },
        login_date: {
          type: Date,
          default: new Date()
        },
        notification_token: {
          type: String,
          default: null
        }
      }
    ],
    email_verify: {
      type: Boolean,
      default: false
    },
    stripe_customer_id: {
      type: String,
      default: null,
    },
    user_type: {
      type: String,
      default: 'user',
      enum: ['user', 'admin', 'super-admin']
    },
    verification_code: {
      type: String,
      default: null
    },
    expire_date: {
      type: Date,
      trim: true,
      default: null,
    },
    profile_image: {
      type: String,
      default: null
    },
    bio: {
      type: String,
      default: null
    },
    phone: {
      type: String,
      trim: true,
    },
    is_phone_verify: {
      type: Boolean,
      default: false
    },
    google_details: {
        is_google_connected: {
          type: Boolean,
          default: false
        },
        email: {
          type: String,
          default: null
        },
        access_token: {
          type: String,
          default: null
        },
        id: {
          type: String,
          default: null
        },
        email_verified: {
          type: Boolean,
          default: false
        }
    },
    notification: [
      {
        date: {
          type: Date
        },
        status: {
          type: Boolean,
          default: false
        },
        data: {
          type: Object
        },
        title: {
          type: String,
        },
        body: {
          type: String,
        },
        send_by: {
          type: String
        }
      }
    ],
    is_two_factor: {
      type: Boolean,
      default: true
    },
    two_factor_verify: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Users", usersSchema);