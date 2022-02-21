let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

//helper function for guard purposes
function requireAuth(req, res, next)
{
    //check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


//connect to our BusinessContact Model
let BusinessContacts = require('../models/businessContacts');

/* GET route for the BusinessContact List page - READ operation */ 
router.get('/', requireAuth, (req, res, next) => {
    BusinessContacts.find((err, businessContactsList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            // console.log(businessContactsList);

            res.render('businessContacts/list', 
            {title: 'Business Contacts', 
            BusinessContactsList: businessContactsList, 
            displayName: req.user ? req.user.displayName :''});
        }
    });

});


/* GET route for the displaying the Add page - CREATE operation */ 
router.get('/add', requireAuth, (req,res,next) => {
    res.render('businessContacts/add', {title: 'Add Business Contacts'})

});

/* POST route for the processing the Add page - CREATE operation */ 
router.post('/add', requireAuth, (req,res,next) => {
    let newBusinessContacts = BusinessContacts({
        "ContactName": req.body.ContactName,
        "ContactNumber": req.body.ContactNumber,
        "Email": req.body.Email,

    });

    BusinessContacts.create(newBusinessContacts, (err, BusinessContacts) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the businessContacts list
            res.redirect('/businessContacts-list');

        }
    });

});

/* GET route for the displaying the Edit page - UPDATE operation */ 
router.get('/edit/:id', requireAuth, (req,res,next) => {
    let id = req.params.id;

    BusinessContacts.findById(id, (err, businessContactsToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('businessContacts/edit', {title: 'Edit BusinessContacts', businessContacts: businessContactsToEdit,
            displayName: req.user ? req.user.displayName :''})
        }

    });

});

/* POST route for the processing the Edit page - UPDATE operation */ 
router.post('/edit/:id', requireAuth, (req,res,next) => {
    let id = req.params.id;

    let updatedBusinessContacts = BusinessContacts({
        "_id": id,
        "ContactName": req.body.ContactName,
        "ContactNumber": req.body.ContactNumber,
        "Email": req.body.Email,

    });

    BusinessContacts.updateOne({_id: id}, updatedBusinessContacts, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the businessContacts list
            res.redirect('/businessContacts-list');
        }
    });

});

/* GET to perform deletion - DELETE operation */ 
router.get('/delete/:id', requireAuth, (req,res,next) => {
    let id = req.params.id;

    BusinessContacts.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the businessContacts list
            res.redirect('/businessContacts-list');
        }

    });

});

module.exports = router;