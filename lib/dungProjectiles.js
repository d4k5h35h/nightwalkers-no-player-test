function dungProjectiles(){
    //stalactite spawner
    if(frameCount % 295 === 0) {
        var stalactite = createSprite(width + 35 + 10,30,10,40);
        stalactite.addImage(stalactiteImg);
        stalactite.velocity.x = ground.velocity.x;
        stalactite.velocity.y = (1 + 1 * score/1000) * 0.475;
        stalactite.scale = 2;
        stalactite.life = 250;
        //add each stalactite to the group
        stalactiteSpawner.add(stalactite);
      }
    //trap spawner
    if(frameCount % 370 === 0) {
        var trap = createSprite(width + 35,ground.position.y - 20,10,40);
        // trap.addAnimation("traps", trapAnimation);
        trap.addImage("trapimage", trapImg);
        trap.velocity.x = ground.velocity.x;
        trap.scale = 1.5;
        trap.life = 250;
        //add each trap to the group
        trapSpawner.add(trap);
      }
    }