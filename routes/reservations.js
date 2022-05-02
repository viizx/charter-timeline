const router = require("express").Router();
const Reservation = require("../model/Reservation");
const verify = require("../utility/verifyToken");

// dobavi sve rezervacije
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.json({ message: error });
  }
});

// nadi odredenu rezervaciju
router.get("/:reservationId", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId);
    res.json(reservation);
  } catch (error) {
    res.json({ message: error });
  }
});

// izbrisi odredenu rezervaciju
router.delete("/:reservationId", verify, async (req, res) => {
  try {
    const removedReservation = await Reservation.deleteOne({
      _id: req.params.reservationId,
    });
    res.json(removedReservation);
  } catch (error) {
    res.json({ message: error });
  }
});

// stvori novu rezervaciju
router.post("/", verify, async (req, res) => {
  const reservation = new Reservation({
    x: req.body.x,
    y: req.body.y,
    fillColor: req.body.fillColor,
  });

  try {
    let savedReservation = await reservation.save();
    res.send({ reservation: savedReservation.x });
  } catch (err) {
    res.send(err);
  }
});

// edit rezervaciju
router.put("/:reservationId", async (req, res) => {
  try {
    const updatedReservation = await Reservation.updateOne(
      { _id: req.params.reservationId },
      {
        $set: {
          x: req.body.x,
          y: req.body.y,
          fillColor: req.body.fillColor,
        },
      }
    );
    res.json(updatedReservation);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
