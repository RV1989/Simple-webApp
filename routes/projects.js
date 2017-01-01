var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://rv1989:rv1989@ds149278.mlab.com:49278/projects', ['Projects']);

// Get All Tasks
router.get('/projects', function(req, res, next){
    db.Projects.find(function(err, projects){
        if(err){
            res.send(err);
        }
        res.json(projects);
    });
});

// Get Single Task
router.get('/project/:id', function(req, res, next){
    db.Projects.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, project){
        if(err){
            res.send(err);
        }
        res.json(project);
    });
});


router.put('/project/:id/:name',function(req, res,next) {
    var conveyor = req.body;
        // use our bear model to find the bear we want
        console.log("***** Updating Request ****" + req.body);
        db.Projects.update( {_id:  mongojs.ObjectId(req.params.id) , "Conveyors.name" : req.params.name } ,
                {$set : {"Conveyors.$.lastMaintenance" : conveyor.lastMaintenance } } ,function(err, result) {
                  if (err){
                  console.log(err);
                  return res.send(err);
                }
                console.log(conveyor);
                return res.json({message: 'conveyor updated!' });

                });


              });

router.put('/project/save/:id/:name',function(req, res,next) {
    var conveyor = req.body;
    // use our bear model to find the bear we want
    console.log("***** Updating Request *****" + req.body);
    db.Projects.update( {_id:  mongojs.ObjectId(req.params.id) , "Conveyors.name" : req.params.name } ,
    {$set : {"Conveyors.$" : conveyor } } ,function(err, result) {
      if (err){
        console.log(err);
        return res.send(err);
      }
      console.log(conveyor);
      return res.json({message: 'conveyor updated!' } );
      });

      });



module.exports = router;
