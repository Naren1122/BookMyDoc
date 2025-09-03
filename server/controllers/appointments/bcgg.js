const bookAppointment = require("./bookApp");
const getPatientAppointments = require("./getPatApp");
const getDoctorAppointments = require("./getDocApp");
const cancelAppointment = require("./cancelApp");

module.exports = {
  bookAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  cancelAppointment,
};