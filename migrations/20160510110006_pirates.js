exports.up = function(knex, Promise) {
  return knex.schema.createTable('pirates', function(table){
    table.increments();
    table.string('name');
    table.string('poison');
    table.string('accessory')
    table.string('image_url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pirates')

};
