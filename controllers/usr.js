const usr = require('../models/user')
const bcrypt = require('bcrypt')



function pruebas(req, res) {
    res.status(200).send(
        {
            message: 'Ruta de prueba'
        }
    )
};

async function create_user(req,res) {
    let params = req.body; //parametros chidos

    let ifEmailExist = await usr.exists({ email:params.email});

    if (ifEmailExist) {
        res.status(200).send({
            message: "Email in use, please choose other email or log in"
        })
    }


    if(!ifEmailExist) {

        let user = new usr();
        

        if (params.name && params.email && params.pass) {
            user.name = params.name;
            user.email = params.email;  
            user.pass = params.pass; 
        
            let pass_crypt = await bcrypt.hash(params.pass, 10);
        
            user.pass = pass_crypt;
        
            user.save((err,user_saved) => {
                if (err) {
                    res.status(500).send({
                        message: "Error"
                    })
                        
                }
                else {
                    if (user_saved) { 
                        res.status(200).send({
                            user: user_saved
                        })
                    }
        
                    else {
                        res.status(200).send({
                            message: "User not saved"
                        })
                    }
                }
            });
        }
        
        else { 
            res.status(200).send({
                message: "Params not found"
            })
        }
    }
}

async function login(req,res) {
    let params = req.body;

    if (params.email && params.pass) { 
        let finding = await usr.find({email:params.email})
        if (finding.length <= 0) {
            res.status(200).send({
                message: 'User not found'
            })
        }

        let passHash = finding[0].pass;

        let compare = bcrypt.compareSync(params.pass, passHash);

        if (compare) { 
            res.status(200).send({
                message: 'Login pass'
            
            })
        }

        else {
            res.status(200).send({
                message: 'Incorrect password'
            
            })
        }


    }
    else { 
        res.status(500).send({
            message: 'Params not found'
        })
    }
}

async function delete_acc(req,res) {
    let params = req.body;


    if (params.email && params.pass) { 
        let finding = await usr.find({email:params.email})
        if (finding.length <= 0) {
            res.status(200).send({
                message: 'User not found'
            })
        }

        let passHash = finding[0].pass;

        let compare = bcrypt.compareSync(params.pass, passHash);

        if (compare) { 
            await usr.deleteOne({ email:params.email });
            res.status(200).send({
                message: 'User deleted'
            })
        }

        else {
            res.status(200).send({
                message: 'Incorrect password'
            
            })
        }


    }
    else { 
        res.status(500).send({
            message: 'Params not found'
        })
    }

}

module.exports = {
    pruebas,
    create_user,
    login,
    delete_acc
};