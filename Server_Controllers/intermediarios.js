function senha (req, res, next){
    if(req.method==="GET" || req.query.senha === "cubos123"){
        next()
    }else{
        res.status(401);
        res.json({erro:"Favor informar a senha correta para prosseguir."})
    }
    next();
}

module.exports = {senha};