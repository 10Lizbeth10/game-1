/* global Phaser */

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, 
create: create, update: update });
var platforms;

function preload() {

game.load.image('sky', 'assets/sky.png');
game.load.image('ground', 'assets/platfrom.png')
game.load.image('star', 'assets/star.png');
game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

function create() { 

game.physics.startSystem(Phaser.Physics.ARCADE);
game.add.sprite(0, 0, 'sky');
game.add.sprite(0, 0, 'star');
platforms = game.add.group();   
platforms.enableBody = true;
var ground = platforms.create(0, game.world.height - 64, 'ground');
ground.scale.setTo(2,2);
ground.body.immovable = true;
var ledge = platforms.create(X-POSITION, Y-POSITION, 'ground');
ledge.body.immovable = true
var hitPlatfrom = game.physics.arcade.collide(player, platfroms);
player = game.add.sprite(32, game.world.height - 150, 'dude');
game.physics.arcade.enable(player);
player.body.bounce.y = BOUNCE-Value;
player.body.gravity.y = GRAVITY-Value;
player.body.collideWorldBounds = true;
player.animations.add('left', [0, 1, 2, 3], 10, true);
player.animations.add('right', [5, 6, 7, 8], 10, true);
cursors = game.input.kayboard.createCursorKeys();


}

function update() { 


}

 