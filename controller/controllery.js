const mongoose = require('mongoose');

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const roomSchema = new mongoose.Schema({
  lines: []
});

const roomModel = mongoose.model('rooms', roomSchema);


module.exports = function(app){
  //Home page
  app.get('/', function(req,res){
    res.render('home');
  });

  //Open Existing room
  app.get('/:id', function(req,res){
    roomModel.findById(req.params.id, function(err, room) {
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

  //Create new room
  app.post('/', function(req,res){
    roomModel({lines : []}).save(function(err, room){
      if (err) throw err;
      res.send(room._id);
    });
  });

  //Add new line to room
  app.post('/addline', function(req,res){
    roomModel.findById(req.body.id, function(err, room) {
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

  //Clear All Lines from room
  app.post('/clearlines', function(req,res){
    roomModel.findById(req.body.id, function(err, room) {
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
