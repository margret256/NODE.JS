// ensure the user is authenticated
exports.ensureauthenticated = (req,res,next)=>{
    if(req.session.user){
        return next()
    }
    res.redirect('/register')
};

// ensure user is a salesagent
exports.ensureManager = (req,res,next)=>{
    if(req.session.user && req.session.user.role ==="manager"){
        return next()
    }
    res.redirect('/')
};