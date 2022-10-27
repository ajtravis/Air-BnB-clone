const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js')
const { requireAuth } = require('../../utils/auth.js');

const { restoreUser } = require("../../utils/auth.js");


router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter)



module.exports = router;
