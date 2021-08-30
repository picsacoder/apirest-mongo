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
    let user = new usr();
    let params = req.body; //parametros chidos

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

function login(req,res) {
    let email = req.body.email;
    
    if(usr.find({email:email})) {
        res.status(200).send({
            message: "Login"
        })
    }
    else { 
        res.status(500).send({
            message: "Error: No email for search"
        })       
    }
}

module.exports = {
    pruebas,
    create_user,
    login
};