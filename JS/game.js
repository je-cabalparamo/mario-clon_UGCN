// import { createAnimations } from "./animations";
const preload = () => {
  console.log('preload')
  this.load.image(
    'cloud1',
    'assets/scenery/overwold/cloud1.png'
  )

  this.load.image(
    'floorbricks',
    'assets/scenery/overwold/floorbricks.png'
  )

  this.load.spritesheet(
    'mario',
    'assets/entities/mario.png',
    { frameWidth: 18, frameHeight: 16 }
  )

  this.load.audio(
    'gameover',
    'assets/sound/music/gameover.mp3'
  )
}

const create = () => {
  console.log('create')
  this.add.image(100, 50, 'cloud1')
    .setOrigin(0,0)
    .setScale(0.15)

  this.floor = this.physics.add.staticGroup()

  this.floor
    .create(0, config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody()

  this.mario = this.physics.add.sprite(50, 100, 'mario')
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)
    .setGravity(300)

  this.physics.world.setBounds(0, 0, 2000, config.height)
  this.physics.world.add.collider(this.mario, this.floor)
  this.cameras.main.setBounds(0, 0, 2000, config.height)
  this.cameras.main.startFollow(this.mario)

  createAnimations(this)
   this.keys = this.input.keyboard.createCursorKeys()
}

const update = () => {
  console.log('update')

  if (this.mario.isDead) return

  if (this.keys.left.isDown) {
    this.mario.anims.play('mario-walk', true)
    this.mario.x -= 2
    this.mario.flipX = true
  }
}

const config = {
  type: Phaser.AUTO,
  width: 256,
  height: 244,
  backgroundColor: '#049cd8',
  parent: 'game',
  physics : {
    default : 'arcade',
    arcade: {
      gravity : { y: 300 },
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
}

new Phaser.Game(config)
