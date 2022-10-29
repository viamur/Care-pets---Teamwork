const { Router } = require("express");
const { getOurFriends } = require("../service");

const router = Router();

router.get("/", async function (req, res, next) {
  try {
    const ourFriends = await getOurFriends();

    res.json(ourFriends);
  } catch (error) {
    next(error);
  }
});

module.exports = router;