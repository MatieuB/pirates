
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('pirates').del(),

    // Inserts seed entries
    knex('pirates')
    .insert({
      name: 'BlackBeard',
      poison:'cocaine',
      accessory:'flaming beard',
      image_url:'http://www.psu.com/media/articles/image/blackbeard.jpg' }),
    knex('pirates')
      .insert({
        name: 'Anne Bonney',
        poison:'Rum',
        accessory:'hot temper',
        image_url:'http://2.bp.blogspot.com/-WSKMEi_MH5U/U-AdUnMNuvI/AAAAAAAABI8/fv0BXLICx8c/s1600/Anne_Bonny_color.jpg' }),
    knex('pirates')
    .insert({
      name: 'Don Mateo el Guapo',
      poison: 'mari-jauna',
      accessory: 'bow & arrow',
      image_url: 'https://scontent.fsnc1-1.fna.fbcdn.net/v/t1.0-9/1551479_10101116111670358_2382442207399503862_n.jpg?oh=c350559156608f495ebd2ccb97ee927c&oe=57AA3CC2' })

  );
};
