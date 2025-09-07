// server/utils/jwtConfig.js

/**
 * JWT expiration times for different roles
 * Values are strings accepted by jsonwebtoken
 * Examples: "7d" = 7 days, "1d" = 1 day, "12h" = 12 hours
 */
const jwtConfig = {
  patient: "7d",  // Patients get 7 days token
  doctor: "1d",   // Doctors get 1 day token
  admin: "1d"     // Admins get 1 day token
};

module.exports = jwtConfig;
