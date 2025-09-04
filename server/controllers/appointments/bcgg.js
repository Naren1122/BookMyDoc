const bookAppointment = require("./bookApp");
const getPatientAppointments = require("./getPatApp");
const getDoctorAppointments = require("./getDocApp");
const cancelAppointment = require("./cancelApp");
const confirmAppointment= require("./confirmAppointment");

module.exports = {
  bookAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  cancelAppointment,
  confirmAppointment,
};