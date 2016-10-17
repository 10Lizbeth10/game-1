/* global Phaser */

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, 
create: create, update: update });
var platforms;
var player;
var cursors;
var star;

function preload() {

game.load.image('sky', 'assets/sky.png');
game.load.image('ground', 'assets/platfrom.png')
game.load.image('star', 'assets/star.png');
game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

function create() { 

game.physics.startSystem(Phaser.Physics.ARCADE);
game.add.sprite(0, 0, 'sky');
game.add.sprite(150, 200, 'star');
platforms = game.add.group();   
platforms.enableBody = true;
var ground = platforms.create(0, game.world.height - 64, 'ground');
ground.scale.setTo(2,2);
ground.body.immovable = true;
var ledge = platforms.create(150, 250, 'ground');
ledge.body.immovable = true;
player = game.add.sprite(32, game.world.height - 150, 'dude');
game.physics.arcade.enable(player);
player.body.bounce.y = 0.1;
player.body.gravity.y = 100;
player.body.collideWorldBounds = true;
player.animations.add('left', [0, 1, 2, 3], 10, true);
player.animations.add('right', [5, 6, 7, 8], 10, true);
cursors = game.input.kayboard.createCursorKeys();
star = game.add.group();

star.enableBody = true;

for (var i = 0, i < 12; i++)
{
    var star = stars.create(i * 70,0, 'star');
    
    star.body.gravity.y = 6;
    
    star.body.bounce.y = 0.7 + math.random() * 0.2;
}

scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32 px', fill '#000'});

}

function update() { 
    var hitPlatfrom = game.physics.arcade.collide(player, platforms);
player.body.velocity.x = 0; 

// Rest the player velocity (movent)
if (cursors.left.isDown)
{ 
    // Move to the left
    player.body.velocity.x = 150;

    player.animations.play(left);
}

 else if (cursors.right.isDown)
{ 
    // Move to the right 
    player.body.velocity.x = 150;
    
    player.animations.play(right);
}
 
else 
{
    // Stand still
    player.animations.stop();
    
    player.frame = 4;
}
 
// Allow the player to jump if they are touching the gound
if (corsors.up.isDown && player.body.touching.down && hitPlatfrom)
{
    player.body.velocity.y = -350;
}

game.physics.arcade.collide(stars, platforms);

game.physics.arcade.overlap(player, stars, collectStars, null, this);

function collectStar (player, star) {

    star.kill();
}
}


