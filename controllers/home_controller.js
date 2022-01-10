const Org = require('../models/org');
module.exports.home = async function(req,res){
    
    let allOrgs = await Org.find();
    return res.render('home'
        ,{
        //     success:null,
        //     err:null
            orgs:allOrgs
        }
    );
}

module.exports.createOrg = async function(req,res){
    
    try{
        let org1 = await Org.findOne({Email:req.body.Email});
        let org2 = await Org.findOne({Contact:req.body.Num});
        if(!org1 && !org2){
            Org.create({
                Name:req.body.Name,
                Address:req.body.Address,
                Email: req.body.Email,
                Contact: req.body.Num
            },function(err,newOrg){
                if(err){console.log(err,"Error inside create function of Org!!");}
                console.log("*****",newOrg);
                res.redirect('/');
                // return res.render('home',{
                //     //success:"Organization added to database"
                // });
            });
        }else{
            console.log('Organization already exists in database!!');
            res.redirect('/');
            // return res.render('home',{
            //     //err:"Organization already exists in database!!"
            // });
        }
    }catch(err){
        console.log('Error in registering the organization!!',err);
        return;
    }
}

module.exports.wip = function(req,res){
    
    return res.render('wip');
}