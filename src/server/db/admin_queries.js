var knex = require('./knex');

function Admins() {
  return knex('admins');
}

module.exports = {
  getAdmins: function(){
    return Admins().select();
  },
  getAdmins: function(id){
    return Admins().where('id', id);
  }
}