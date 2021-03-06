// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
    //KeyboardInputManager
    //HTMLActuator


    var player = new GamePlayer();

    player.watch = true;
    player.watchMode = true;
    player.watchDelay = 10;
   
    player.depth = 4; // won with 3, never with 2
    player.sampleSize = -1; // forever
    //player.sampleSize = 5;

    function MemoryStorageManager(){
        this.bestScore = 0;
    };

    MemoryStorageManager.prototype.getGameState = _.noop;
    MemoryStorageManager.prototype.getBestScore = function(){ return(this.bestScore); };
    MemoryStorageManager.prototype.setBestScore = function(score){ this.bestScore = score; };
    MemoryStorageManager.prototype.clearGameState = _.noop;
    MemoryStorageManager.prototype.setGameState = _.noop;

    var storageManager = new MemoryStorageManager();
    // var storageManager = new LocalStorageManager();

    var manager = new GameManager(4, player, player, storageManager);
    
    player.manager = manager;

    manager.start();
    player.start();

    $(".start-button").click(function(){
        if(player.running){
            player.stop();
            $(".start-button").html("Start");
        }else{
            player.start();
            $(".start-button").html("Stop");
        }
    });

    $(".watch-button").click(function(){ 
        player.watchMode = true;
    });
    $(".really-slow-button").click(function(){ 
        player.watchDelay = 1000;
        player.watchMode = false;
    });
    $(".slow-button").click(function(){ 
        player.watchDelay = 500;
        player.watchMode = false;
    });
    $(".medium-button").click(function(){ 
        player.watchDelay = 100;
        player.watchMode = false;
    });
    $(".fast-button").click(function(){ 
        player.watchDelay = 10;
        player.watchMode = false;
    });

});
