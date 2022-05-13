const Reservation = require("../model/Reservation");

module.exports = async function deleteOld() {
  const reservations = await Reservation.deleteMany({
    "y.1": { $lt: new Date().getTime() },
  });
  try {
    console.log(reservations);
  } catch (error) {
    console.log(error);
  }
};
