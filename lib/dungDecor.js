function dungDecor(){
    //ground in level 3
        ground.velocity.x = -(1 + 1 * score/1000);
        ground.changeImage("dungeonground");
        ground.scale = 2.5;
        invisGround.position.y = height - 35;
    //light generator
    if(frameCount % 90 === 0) {
        var light = createSprite(width + 35,ground.position.y - 100,10,40);
        light.velocity.x = ground.velocity.x;
        light.addAnimation("light_1", light1);
        light.addImage("light_2", light2);
        
        //generate random light
        var rand = Math.round(random(1,2));
        switch(rand) {
          case 1: light.changeAnimation("light_1");
                  break;
          case 2: light.changeImage("light_2");
                  break;
          default: break;
        }
        
        //assign scale and life to the light        
        light.scale = 2;
        light.life = 250;
        //add each light to the group
        lightSpawner.add(light);
      }
    }