var express = require('express');
var router = express.Router();
var Note = require('../model/note')


//获取所有的note
router.get('/notes', function(req, res, next) {
	let opts = {raw: true}
	if(req.session.user){
	    opts.where = {uid:req.session.user.id }
	 }
	Note.sync().then(function(){
		Note.findAll(opts).then(function(notes) {
			res.send({status: 0, data:notes});
		}).catch(function(){
			res.send({status: 1, errorMsg: 'database error'})
		})
	})
  
 
});

//创建一个note
router.post('/notes/add', function(req, res, next){
	if(!req.session.user){
	   return res.send({status: 1, errorMsg: 'login please'})
	}
	let note = req.body.note
	let uid = req.session.user.id
	Note.sync().then(function(){
		Note.create({text: note, uid: uid}).then(function(){
			console.log(arguments)
			res.send({status: 0})
		}).catch(function(){
			res.send({status: 1, errorMsg: 'database error'})
		})
	})
})

//修改一个note
router.post('/notes/edit', function(req, res, next){
	if(!req.session.user){
	   return res.send({status: 1, errorMsg: 'login please'})
	}
	let noteId = req.body.id
	let note = req.body.note
	let uid = req.session.user.id

	Note.sync().then(function(){
		Note.update({text: note}, {where:{id: noteId, uid: uid}}).then(function(list){
			if(list[0] === 0){
				return res.send({status: 1, errorMsg: 'login please'})
			}
			res.send({status: 0})
		}).catch(function(){
			res.send({status: 1, errorMsg: 'database error'})
		})
	})
	
})

//删除一个note
router.post('/notes/delete', function(req, res, next){
	if(!req.session.user){
	   return res.send({status: 1, errorMsg: 'login please'})
	}
	let noteId = req.body.id
	let uid = req.session.user.id
	Note.sync().then(function(){
		Note.destroy({where: {id: noteId, uid: uid}}).then(function(deleteLen){
			if(deleteLen === 0){
				return res.send({status: 1, errorMsg: 'login please'})
			}
			res.send({status: 0})
		}).catch(function(){
			res.send({status: 1, errorMsg: 'database error'})
		})
	})
	
})

module.exports = router;
