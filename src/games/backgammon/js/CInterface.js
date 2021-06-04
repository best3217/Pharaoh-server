function CInterface(){
    var _oAudioToggle;
    var _oButExit;
    var _oContainer;
    var _oButFullscreen;
    var _oHelpPanel=null;
    var _bMobileInitialized;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosFullscreen;
    var _oButUpP1;
    var _oButDownP1;
    var _oButUpP2;
    var _oButDownP2;
    var _pStartPosButUpP1;
    var _pStartPosButDownP1;
    var _pStartPosButUpP2;
    var _pStartPosButDownP2;
    var _oScoreTextBlue;
    var _oScoreTextRed;
    var _pStartPosDice;
    var _oButDice;
    var _oTurnP1;
    var _oTurnP2;
    var _oLightTurn;
    var _bFirstTurn;
    var _oParent = this;
    
    this._init = function(){  
        _bFirstTurn = true;
        _oContainer = new createjs.Container();
        _bMobileInitialized = false;
        s_oStage.addChild(_oContainer);
        var oExitX; 
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.width/2)- 10, y: (oSprite.height/2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite,_oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        oExitX = CANVAS_WIDTH - (oSprite.width/2) - 140;
       
        
        _pStartPosAudio = {x: _pStartPosExit.x-(oSprite.width)-5,y: (oSprite.height/2) + 10};
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive, _oContainer);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        }

        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen");
            _pStartPosFullscreen = {x:oSprite.width/4 + 10,y:oSprite.height/2+10};
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,_oContainer);
            _oButFullscreen.addEventListener(ON_MOUSE_UP,this._onFullscreen,this);
        }
        
        oSprite = s_oSpriteLibrary.getSprite("light_turn");
        _oLightTurn = createBitmap(oSprite,oSprite.width,oSprite.height);
        _oLightTurn.regX = 11;
        _oLightTurn.regY = 12;
        _oLightTurn.x = X_INTERFACE_PLAYER+3;
        _oLightTurn.y = Y_INTERFACE_PLAYER_1;
        _oLightTurn.alpha = 0;
        _oContainer.addChild(_oLightTurn);
        
        oSprite = s_oSpriteLibrary.getSprite("turn_p1");
        _oTurnP1 = createBitmap(oSprite,oSprite.width,oSprite.height);
        _oTurnP1.x = X_INTERFACE_PLAYER;
        _oTurnP1.y = Y_INTERFACE_PLAYER_1;
        _oContainer.addChild(_oTurnP1);
        
        if (s_b2Players){
            oSprite = s_oSpriteLibrary.getSprite("turn_p2");
        }else{
            oSprite = s_oSpriteLibrary.getSprite("turn_cpu");
        }
        
        _oTurnP2 = createBitmap(oSprite,oSprite.width,oSprite.height);
        _oTurnP2.x = X_INTERFACE_PLAYER;
        _oTurnP2.y = Y_INTERFACE_PLAYER_2;
        _oContainer.addChild(_oTurnP2);
        
        
        _pStartPosDice = {x: CANVAS_WIDTH-200, y: CANVAS_HEIGHT/2};
        oSprite = s_oSpriteLibrary.getSprite("but_dice");
        _oButDice = new CGfxButton(CANVAS_WIDTH+200,_pStartPosDice.y,oSprite,_oContainer);
        _oButDice.addEventListener(ON_MOUSE_UP,s_oGame.rollDice,this);
        _oButDice.pulseAnimation();
       this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        _oButExit.unload();
        
        s_oStage.removeChild(_oContainer);
        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.unload();
        }        

        s_oInterface = null;
        
    };
    
    this.refreshPlayersScore = function (iScoreP1,iScoreP2){
       _oScoreTextBlue.text =  iScoreP1;
       _oScoreTextRed.text = iScoreP2;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        //_oContainerScore.y = _pStartPosContainerScore.y +iNewY;
        
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX, _pStartPosFullscreen.y + iNewY);
        }
        
        if (s_bMobile){
            if (_bMobileInitialized){
                if (!s_b2Players){
                    _oButUpP1.setPosition(_pStartPosButUpP1.x+iNewX,_pStartPosButUpP1.y-iNewY);
                    _oButDownP1.setPosition(_pStartPosButDownP1.x+iNewX,_pStartPosButDownP1.y-iNewY);
                }else{
                    _oButUpP1.setPosition(_pStartPosButUpP1.x+iNewX,_pStartPosButUpP1.y-iNewY);
                    _oButDownP1.setPosition(_pStartPosButDownP1.x+iNewX,_pStartPosButDownP1.y-iNewY);
                    _oButUpP2.setPosition(_pStartPosButUpP2.x-iNewX,_pStartPosButUpP2.y-iNewY);
                    _oButDownP2.setPosition(_pStartPosButDownP2.x-iNewX,_pStartPosButDownP2.y-iNewY);
                }
            }
        }
    };
    
    this.onFocusTurn = function (bTurnPlayer1){
        if (_bFirstTurn){
            _bFirstTurn = false;
            _oParent.tweenFocusTurn();
        }
       if (bTurnPlayer1){
           _oLightTurn.y = Y_INTERFACE_PLAYER_1;
       } else{
           _oLightTurn.y = Y_INTERFACE_PLAYER_2;
       }
    };
    
    this.tweenFocusTurn = function(){
       new createjs.Tween.get(_oLightTurn).to({alpha: 1},700).to({alpha: 0},700).call(_oParent.tweenFocusTurn);
    };

    this.setOnTop = function(){
       s_oStage.addChildAt(_oContainer,s_oStage.numChildren); 
    };
    
    this.setVisibleButDice = function(bVal){
        if (bVal===false){
            _oButDice.setClickable(false);
            new createjs.Tween.get(_oButDice.getButtonImage()).to({x: CANVAS_WIDTH + 200},300,createjs.Ease.cubicIn);
        }else if (bVal===true){
            _oButDice.setClickable(true);
            new createjs.Tween.get(_oButDice.getButtonImage()).to({x: _pStartPosDice.x},300,createjs.Ease.cubicOut);
        }
    };

    this.refreshScore = function(iValue){
        //_oScoreNum.alpha=1;
        //_oScoreNum.text = iValue;
    };

    this._onButHelpRelease = function(){
        _oHelpPanel = new CHelpPanel();
    };
    
    
    this.onExitFromHelp = function(){
        _oHelpPanel.unload();
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onExit = function(){
        new CAreYouSurePanel(s_oGame.onExit);
    };
    
    this.resetFullscreenBut = function(){
	_oButFullscreen.setActive(s_bFullscreen);
    };

    this._onFullscreen = function(){
        if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };
    
    s_oInterface = this;
    
    this._init();
    
    return this;
}

var s_oInterface = null;