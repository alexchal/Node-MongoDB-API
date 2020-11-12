const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    const response = {
        users: 'Alexandros'
    }
    res.status(200).json(response);
});


module.exports = router;
