var Sequelize = require('sequelize')
var path = require('path')

var sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',

  // SQLite only
  storage: path.join(__dirname, '../database/database.sqlite')
});

/* 测试与数据库的链接是否正常*/
// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(function (err) {
//     console.log('Unable to connect to the database:', err);
//   });


var Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  }, 
  uid: {
  	type: Sequelize.STRING
  }
});



/* 测试添加数据到数据库中*/
// Note.sync().then(function(){
// 	Note.create({text: 'hello world'})  
// }).then(function(){
// 	Note.findAll({raw:true}).then(function(notes) {
// 	  console.log(notes)
// 	})
// })


/*在数据库中寻找特定id的数据
Note.findAll({raw:true, where:{id: 1}}).then(function(notes) {
	console.log(notes)
})
*/
module.exports = Note

