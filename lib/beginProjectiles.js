function beginProjectiles(){
    //blade spawner
    if(frameCount % 350 === 0) {
        var blade = createSprite(width + 35,50,10,40);
        blade.addImage(bladeImg);
        blade.velocity.x = ground.velocity.x;
        blade.scale = 0.3;
        blade.life = 250;
        //add each blade to the group
        bladeSpawner.add(blade);
      }
    }