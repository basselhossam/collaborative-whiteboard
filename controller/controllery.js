var mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@ds161630.mlab.com:61630/rooms');

var schema = new mongoose.Schema({
  lines: []
  
});

var mongocoll = mongoose.model('rooms',schema);


module.exports = function(app){

  app.get('/', function(req,res){
    res.render('home');
  });

  app.get('/:id', function(req,res){
    mongocoll.findById(req.params.id, function(err, room) {
      if (err){
        res.render('error');
      }
      else {
        if(room == null)
          res.render('error');
        else
          res.render('draw',{"id":room._id,"lines":JSON.stringify(room.lines),"socket":app.get('port')});
      }
    });
  });

  app.post('/', function(req,res){
    var item = mongocoll({lines : []}).save(function(err, room){
      if (err) throw err;
      res.send(room._id);
    });
  });

  app.post('/addline', function(req,res){
    mongocoll.findById(req.body.id, function(err, room) {
      if (err) throw err;

      // push to the room lines
      room.lines.push(req.body.path);

      // save the room
      room.save(function(err) {
        if (err) throw err;
        console.log('room successfully updated!');
        res.send("Done")
      });

    });
  });

  app.post('/clearlines', function(req,res){
    mongocoll.findById(req.body.id, function(err, room) {
      if (err) throw err;

      // push to the room lines
      room.lines=[];

      // save the room
      room.save(function(err) {
        if (err) throw err;
        console.log('room successfully updated!');
        res.send("Done")
      });

    });
  });
}
