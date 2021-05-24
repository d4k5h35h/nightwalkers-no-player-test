function swampProjectiles(){
    //thorn spawner
    if(frameCount % 550 === 0) {
        var thorns = createSprite(width + 35,ground.position.y - 67.5,10,40);
        thorns.addImage(thornImg);
        thorns.velocity.x = ground.velocity.x;
        thorns.scale = 0.375;
        thorns.life = 250;
        //add each thorn to the group
        thornSpawner.add(thorns);
      }
    }