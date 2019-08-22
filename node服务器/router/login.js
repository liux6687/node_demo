const express = require('express');
let router = express.Router();

router.get('/api/user/login', function(req, res) {
    console.log("接受请求")
    res.send({
        user: "dfhjfh"
    })
})

module.exports = router;