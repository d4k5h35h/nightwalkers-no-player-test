function beginDecor(){
    //ground in level 1    
        ground.velocity.x = -(3 + 3 * score/500);
        ground.changeImage("beginground");
        ground.scale = 0.375;
        invisGround.position.y = height - 75;
    //flora generator
    if(frameCount % 90 === 0) {
        var flora = createSprite(width + 35,ground.position.y - 275,10,40);
        flora.velocity.x = ground.velocity.x;
        
        //generate random flora
        var rand = Math.round(random(1,6));
        switch(rand) {
          case 1: flora.addImage(flora1);
                  flora.position.y = ground.position.y - 140;
                  break;
          case 2: flora.addImage(flora2);
                  flora.position.y = ground.position.y - 140;
                  break;
          case 3: flora.addImage(flora3);
                  flora.position.y = ground.position.y - 129;
                  break;
          case 4: flora.addImage(flora4);      
                  break;
          case 5: flora.addImage(flora5);
                  flora.position.y = ground.position.y - 290;
                  break;
          case 6: flora.addImage(flora6);
                  flora.position.y = ground.position.y - 198;
                  break;
          default: break;
        }
        
        //assign scale and life to the flora           
        flora.scale = 0.5;
        flora.life = 250;
        //add each flora to the group
        floraSpawner.add(flora);
      }
    }