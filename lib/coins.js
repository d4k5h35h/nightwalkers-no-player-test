function coins(){
    if(frameCount % 60 === 0) {
        var coin = createSprite(width + 35,height / 3,10,40);
        coin.addImage(coinImg);
        coin.velocity.x = ground.velocity.x;
    
        //assign scale and life to the coins          
        coin.scale = 1.25;
        coin.life = 250;
        //add each coin to the group
        coinSpawner.add(coin);
      }
    }