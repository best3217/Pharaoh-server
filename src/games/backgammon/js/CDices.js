function CDices(iType) {
    var _oDiceContainer;
    var _iDiceResult1;
    var _iDiceResult2;
    var _oDice1;
    var _oDice2;
    var _oDiceLaunch;
    var _bAnimationOn = false;
    var _bFirstLaunch;
    var _iOffsetX;
    var _iType;
    var _oThis = this;
    this._init = function (iType) {
        _bFirstLaunch = true;
        
        _iOffsetX = 0;
        _oDiceContainer = new createjs.Container;
        _oDiceContainer.x = 0;
        _oDiceContainer.y = 0;
        _iType = iType;

        s_oStage.addChild(_oDiceContainer);
        
        if (_iType=== WHITE_DICES){
        
            var oData = {   
                    images: [s_oSpriteLibrary.getSprite("launch_dices_white")], 
                    framerate: 30,
                    frames: {width: 398, height: 230, regX: 0, regY: 0},
                    animations: { stop: [12,12], idle: [0, 12, "stop"] }
                };
            var oSpriteSheet = new createjs.SpriteSheet(oData);
            _oDiceLaunch = createSprite(oSpriteSheet, 0, 0, 0, 398, 230);
            _oDiceLaunch.x = CANVAS_WIDTH-398;
            _oDiceLaunch.y = CANVAS_HEIGHT-230;
            _oDiceLaunch.visible = false;
            _oDiceContainer.addChild(_oDiceLaunch);

            // Dice1 animations
            var oData = {
                    images: [s_oSpriteLibrary.getSprite("dice_white_a_1"),
                                s_oSpriteLibrary.getSprite("dice_white_a_2"),
                                s_oSpriteLibrary.getSprite("dice_white_a_3"),
                                s_oSpriteLibrary.getSprite("dice_white_a_4"),
                                s_oSpriteLibrary.getSprite("dice_white_a_5"),
                                s_oSpriteLibrary.getSprite("dice_white_a_6")],
                    framerate: 30,
                    frames: {width: 240, height: 302, regX: 0, regY: 0},
                    animations: { stop1:[10,10], idle1: [ 0, 10, "stop1"],
                                  stop2:[22,22], idle2: [12, 22, "stop2"],
                                  stop3:[34,34], idle3: [24, 34, "stop3"],
                                  stop4:[46,46], idle4: [36, 46, "stop4"],
                                  stop5:[58,58], idle5: [48, 58, "stop5"],
                                  stop6:[70,70], idle6: [60, 70, "stop6"]} 
                };
            var oSpriteSheet = new createjs.SpriteSheet(oData);
            _oDice1 = createSprite(oSpriteSheet, 0, 0, 0, 240, 302);
            // DICE 1 START POSITION (WITH OFFSET)
            _oDice1.x = 798;//815;
            _oDice1.y = 383;
            _oDice1.visible = false;
            _oDiceContainer.addChild(_oDice1);

            // Dice2 animations
            var oData = {
                    images: [s_oSpriteLibrary.getSprite("dice_white_b_1"),
                                s_oSpriteLibrary.getSprite("dice_white_b_2"),
                                s_oSpriteLibrary.getSprite("dice_white_b_3"),
                                s_oSpriteLibrary.getSprite("dice_white_b_4"),
                                s_oSpriteLibrary.getSprite("dice_white_b_5"),
                             s_oSpriteLibrary.getSprite("dice_white_b_6")],
                    framerate: 30,
                    frames: {width: 246, height: 394, regX: 0, regY: 0},
                    animations: { stop1:[ 15, 15], idle1: [ 0,  15, "stop1"],
                                  stop2:[ 31, 31], idle2: [16,  31, "stop2"],
                                  stop3:[ 47, 47], idle3: [32,  47, "stop3"],
                                  stop4:[ 63, 63], idle4: [48,  63, "stop4"],
                                  stop5:[ 79, 79], idle5: [64,  79, "stop5"],
                                  stop6:[95,95], idle6: [80, 95, "stop6"]} 
                };
            var oSpriteSheet = new createjs.SpriteSheet(oData);

            _oDice2 = createSprite(oSpriteSheet, 0, 0, 0, 246, 394);
            // DICE 2 START POSITION (WITH OFFSET)
            _oDice2.x = 975;
            _oDice2.y = 369;
            _oDice2.visible = false;
            _oDiceContainer.addChild(_oDice2);
            
    }else{
        
            var oData = {   
                    images: [s_oSpriteLibrary.getSprite("launch_dices_red")], 
                    framerate: 24,
                    frames: {width: 332, height: 370},
                    animations: { stop: [10,10], idle: [0, 10, "stop"] }
                };
                var oSpriteSheet = new createjs.SpriteSheet(oData);
            _oDiceLaunch = createSprite(oSpriteSheet, 0, 0, 0, 332, 370);
            _oDiceLaunch.x = 0;
            _oDiceLaunch.y = 0;
            _oDiceLaunch.visible = false;
            _oDiceContainer.addChild(_oDiceLaunch);

            // Dice1 animations
            var oData = {
                    images: [s_oSpriteLibrary.getSprite("dice_red_a_1"),
                             s_oSpriteLibrary.getSprite("dice_red_a_2"),
                             s_oSpriteLibrary.getSprite("dice_red_a_3"),
                             s_oSpriteLibrary.getSprite("dice_red_a_4"),
                             s_oSpriteLibrary.getSprite("dice_red_a_5"),
                             s_oSpriteLibrary.getSprite("dice_red_a_6")],
                    framerate: 24,
                    frames: {width: 242, height: 208},
                    animations: { stop1:[8,8], idle1: [ 0, 8, "stop1"],
                                  stop2:[17,17], idle2: [9, 17, "stop2"],
                                  stop3:[26,26], idle3: [18, 26, "stop3"],
                                  stop4:[35,35], idle4: [27, 35, "stop4"],
                                  stop5:[44,44], idle5: [36, 44, "stop5"],
                                  stop6:[53,53], idle6: [45, 53, "stop6"]} 
                };
            var oSpriteSheet = new createjs.SpriteSheet(oData);
            _oDice1 = createSprite(oSpriteSheet, 0, 0, 0, 242, 208);
            // DICE 1 START POSITION (WITH OFFSET)
            _oDice1.x = 187;//815;
            _oDice1.y = 274;
            _oDice1.visible = false;
            _oDiceContainer.addChild(_oDice1);

            // Dice2 animations
            var oData = {
                    images: [s_oSpriteLibrary.getSprite("dice_red_b_1"),
                             s_oSpriteLibrary.getSprite("dice_red_b_2"),
                             s_oSpriteLibrary.getSprite("dice_red_b_3"),
                             s_oSpriteLibrary.getSprite("dice_red_b_4"),
                             s_oSpriteLibrary.getSprite("dice_red_b_5"),
                             s_oSpriteLibrary.getSprite("dice_red_b_6")],
                    framerate: 30,
                    frames: {width: 324, height: 228, regX: 0, regY: 0},
                    animations: { stop1:[ 13, 13], idle1: [ 0,  13, "stop1"],
                                  stop2:[ 27, 27], idle2: [14,  27, "stop2"],
                                  stop3:[ 41, 41], idle3: [28,  41, "stop3"],
                                  stop4:[ 55, 55], idle4: [42,  55, "stop4"],
                                  stop5:[ 69, 69], idle5: [56,  69, "stop5"],
                                  stop6:[83,83], idle6: [70,83, "stop6"]} 
                };
            var oSpriteSheet = new createjs.SpriteSheet(oData);

            _oDice2 = createSprite(oSpriteSheet, 0, 0, 0, 324, 228);
            // DICE 2 START POSITION (WITH OFFSET)
            _oDice2.x = 258;
            _oDice2.y = 242;
            _oDice2.visible = false;
            _oDiceContainer.addChild(_oDice2);
    
        }
    };

    this.isAnimationOn = function() {
        return _bAnimationOn;
    };
    
    this.show = function() {
        _oDice1.visible = _oDice2.visible = false;

        //s_oGame.setTurnReady(false);
        
        // GENERATE RANDOM RESULTS FOR EACH DICE (1 TO 6)
        _iDiceResult1 = Math.floor((Math.random() * 6) + 1);
        _iDiceResult2 = Math.floor((Math.random() * 6) + 1);

        _bAnimationOn = true;
        
        playSound("dices",1,false);

        // START THE ANIMATION FOR DICES LAUNCH
        _oDiceLaunch.visible = true;
        _oDiceLaunch.gotoAndPlay('idle');
        _oDiceLaunch.on("animationend", function() {
            if (_oDiceLaunch.visible) {
                _oThis.secondAnimation();
            };
        });
    };

    this.secondAnimation = function() {
        _oDiceLaunch.visible = false;
        _oDice1.alpha = _oDice2.alpha = 1;
        _oDice1.visible = _oDice2.visible = true;
        // START THE ANIMATION FOR EACH DICE, ACCORDING TO THE RESULT WE NEED
        _oDice1.gotoAndPlay('idle'+_iDiceResult1);
        _oDice2.gotoAndPlay('idle'+_iDiceResult2);
        
        //s_oGame.getDiceResult1(_iDiceResult1);
        //s_oGame.getDiceResult2(_iDiceResult2);
        _bAnimationOn = false;
        s_oGame.afterRollDice(_iDiceResult1,_iDiceResult2);
    };

    this.movePlayer = function() {
        if (_bAnimationOn === false) {
            _bAnimationOn = true;
            // AFTER THE ANIMATION IS OVER, MOVE THE PLAYER OF THE NEEDED SQUARES
            s_oGame.movePlayer( _iDiceResult1+_iDiceResult2 );
        };
    };

    this.fadeOutTween = function() {
        createjs.Tween.get(_oDice1, {loop: false})
                .to({alpha: 0}, 200);
        createjs.Tween.get(_oDice2, {loop: false})
                .to({alpha: 0}, 200)
                .call(this.hide);
    };

    this.returnDiceResult1 = function() {
        return _iDiceResult1;
    };

    this.returnDiceResult2 = function() {
        return _iDiceResult2;
    };

    this.hide = function() {
        _oDice1.visible = _oDice2.visible = false;
    };

    this.unload = function () {
        s_oDices = null;
    };

    this.isFirstLaunch = function(){
        return _bFirstLaunch;
    };

    this.setFirstLaunch = function(value){
        _bFirstLaunch = value;
    };

    s_oDices = this;

    this._init(iType);
}

