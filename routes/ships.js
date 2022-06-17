const router = require("express").Router();
const Ship = require("../model/Ship");
const verify = require("../utility/verifyToken");

// dobavi sve brodove
router.get("/", async (req, res) => {
  try {
    const ships = await Ship.find();
    res.json(ships);
  } catch (error) {
    res.json({ message: error });
  }
});

// nadi odredeni brod
router.get("/:shipId", async (req, res) => {
  try {
    const ship = await Ship.findById(req.params.shipId);
    res.json(ship);
  } catch (error) {
    res.json({ message: error });
  }
});

// izbrisi odredeni brod
router.delete("/:shipId", async (req, res) => {
  try {
    const removedShip = await Ship.deleteOne({
      _id: req.params.shipId,
    });
    res.json(removedShip);
  } catch (error) {
    res.json({ message: error });
  }
});

// dodaj novi brod
router.post("/", async (req, res) => {
  const ship = new Ship({
    name: req.body.name,
    length: req.body.length,
    width: req.body.width,
    capacity: req.body.capacity,
    crew: req.body.crew,
  });

  try {
    let savedShip = await ship.save();
    res.send({ ship: savedShip });
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

// edit brod
router.put("/:shipId", async (req, res) => {
  try {
    const updatedShip = await Ship.updateOne(
      { _id: req.params.shipId },
      {
        $set: {
          name: req.body.name,
          length: req.body.length,
          width: req.body.width,
          capacity: req.body.capacity,
          crew: req.body.crew,
        },
      }
    );
    res.json(updatedShip);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
