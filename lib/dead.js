function dead(){
    player.changeAnimation("die");
    ground.velocity.x = 0;
    ground.visible = false;
    score = 17001;
}