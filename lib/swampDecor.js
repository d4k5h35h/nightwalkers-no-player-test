function swampDecor(){
    //ground in level 2    
        ground.velocity.x = -(2.25 + 2.25 * score/750);
        ground.changeImage("swampground");
        ground.scale = 3;
        invisGround.position.y = height - 40;
    //willow generator
    if(frameCount % 90 === 0) {
        var willow = createSprite(width + 35,ground.position.y - 150,10,40);
        willow.velocity.x = ground.velocity.x;
        
        //generate random willow
        var rand = Math.round(random(1,6));
        switch(rand) {
          case 1: willow.addImage(willow1);
                  willow.position.y = ground.position.y - 125;
                  break;
          case 2: willow.addImage(willow2);
                  willow.position.y = ground.position.y - 145;
                  break;
          case 3: willow.addImage(willow3);
                  willow.position.y = ground.position.y - 150;
                  break;
          case 4: willow.addImage(willow4);
                  willow.position.y = ground.position.y - 145;
                  break;
          case 5: willow.addImage(willow5);
                  willow.position.y = ground.position.y - 165;
                  break;
          case 6: willow.addImage(willow6);
                  willow.position.y = ground.position.y - 185;
                  break;
          default: break;
        }
        
        //assign scale and life to the willow and trees          
        willow.scale = 1.5;
        willow.life = 250;
        //add each willow and tree to the group
        willowSpawner.add(willow);
      }
    }