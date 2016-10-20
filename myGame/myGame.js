/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update
});
var platforms;
var player;
var cursors;
var stars;
var ledge;
var ground;
var hitPlatform;
var score = 0;
var scoreText;

function preload() {
   game.load.image('flower', 'assets/flower.jpg');
   game.load.image('ground', 'assets/pupleground.jpg')
   game.load.image('platform', 'assets/puple.jpg')
   game.load.image('star', 'assets/star.png');
   game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}



function create() {
   game.physics.startSystem(Phaser.Physics.ARCADE);
   
   //a simple backround for my game
   game.add.sprite(0, 0, 'flower');
   // game.add.sprite(0, 0, 'star');
   platforms = game.add.group();
   platforms.enableBody = true;
   var ground = platforms.create(0, game.world.height - 64, 'ground');
   ground.scale.setTo(2, 2);
   ground.body.immovable = true;
   var ledge = platforms.create(200, 500, 'platform');
   ledge.body.immovable = true;
   var ledge = platforms.create(300, 400, 'platform');
   ledge.body.immovable = true;
   player = game.add.sprite(32, game.world.height - 150, 'dude');
   game.physics.arcade.enable(player);
   player.body.bounce.y = 0.5;
   player.body.gravity.y = 50;
   player.body.collideWorldBounds = true;
   player.animations.add('left', [0, 1, 2, 3], 10, true);
   player.animations.add('right', [5, 6, 7, 8], 10, true);
   cursors = game.input.keyboard.createCursorKeys();
   
   stars = game.add.group();
   stars.enableBody = true;
   game.physics.arcade.enable(stars);
   
   //here create 12 of them evenly spaced apart
   for (var i = 0; i < 12; i++)
   {
       console.log("making a star");
       //create a star inside of the 'stars' group
       var star = stars.create(i * 70, 0, 'star');
       // let gravity do its thing 
       star.body.gravity.y = 100;
       //this just gives each star a slightly random bounce value
       star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#999'});
}

function update() {
   var hitPlatform = game.physics.arcade.collide(player, platforms);
   
   player.body.velocity.x = 0;
   
   if (cursors.left.isDown)