// main.js
//

var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

var gameProperties = {
    screenWidth: windowWidth,
    screenHeight: windowHeight,
};

var states = {
    theCore: "The Core",
};

var graphicAssets = {
    ship:{URL:'assets/ship.png', name:'ship'},
    bullet:{URL:'assets/bullet.png', name:'bullet'},

    asteroidLarge:{URL:'assets/asteroidLarge.png', name:'asteroidLarge'},
    asteroidMedium:{URL:'assets/asteroidMedium.png', name:'asteroidMedium'},
    asteroidSmall:{URL:'assets/asteroidSmall.png', name:'asteroidSmall'},
};

var shipProperties = {
    startX: 5000,
    startY: 5000,
    acceleration: 300,
    drag: 50,
    maxVelocity: 300,
    angularVelocity: 200
};

function shipControl(game) {
    this.shipSprite;

    this.key_left;
    this.key_right;
    this.key_thrust;
};

function initGraphics(game) {
    this.game.world.setBounds(0, 0, this.w, this.h);
    this.shipSprite = game.add.sprite(shipProperties.startX, shipProperties.startY, graphicAssets.ship.name);
    this.shipSprite.angle = -90;
    this.shipSprite.anchor.set(0.5, 0.5);
    this.game.camera.follow(this.shipSprite);
};

function initPhysics(game) {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.enable(this.shipSprite, Phaser.Physics.ARCADE);
    this.shipSprite.body.drag.set(shipProperties.drag);
    this.shipSprite.body.maxVelocity.set(shipProperties.maxVelocity);
};

function initKeyboard(game) {
    this.key_left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT) || game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.key_right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.key_thrust = game.input.keyboard.addKey(Phaser.Keyboard.UP);
};

function checkPlayerInput(game) {
    if (this.key_left.isDown) {
        this.shipSprite.body.angularVelocity = -shipProperties.angularVelocity;
    } else if (this.key_right.isDown) {
        this.shipSprite.body.angularVelocity = shipProperties.angularVelocity;
    } else {
        this.shipSprite.body.angularVelocity = 0;
    }

    if (this.key_thrust.isDown) {
        game.physics.arcade.accelerationFromRotation(this.shipSprite.rotation, shipProperties.acceleration, this.shipSprite.body.acceleration);
    } else {
        this.shipSprite.body.acceleration.set(0);
    }
};
