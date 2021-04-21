function CEndPanel(oSpriteBg){
    
    var _oBg;
    var _oGroup;
    var _oBlackPanel;
    var _oWhitePanel;

    var _oMsgText;
    var _oMsgTextUnder;
    var _oFade;

    var _oHome;
    var _oCheckBoard;
    var _oRestart;
    var _oListener;
    
    this._init = function(oSpriteBg){
        
        s_oGame.pauseGame(true);
        
        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        s_oStage.addChild(_oGroup);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 0.7;
        _oGroup.addChild(_oFade);
        
        _oBg = createBitmap(oSpriteBg);
        _oBg.regX = oSpriteBg.width/2;
        _oBg.regY = oSpriteBg.height/2;
        _oBg.x = CANVAS_WIDTH/2;
        _oBg.y = CANVAS_HEIGHT/2;
        _oGroup.addChild(_oBg);

        var iWidth = oSpriteBg.width-120;
        var iHeight = 100;
        var iX = CANVAS_WIDTH/2;
        var iY = CANVAS_HEIGHT/2 - 300;
        _oMsgText = new CTLText(_oGroup, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    90, "center", "#ffffff", PRIMARY_FONT, 1,
                    2, 2,
                    "",
                    true, true, false,
                    false );
        
        var iWidth = oSpriteBg.width-320;
        var iHeight = 50;
        var iX = CANVAS_WIDTH/2;
        var iY = CANVAS_HEIGHT/2 - 230;
        _oMsgTextUnder = new CTLText(_oGroup, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    40, "center", "#ffffff", PRIMARY_FONT, 1,
                    2, 2,
                    "",
                    true, true, false,
                    false );

        _oBlackPanel = new CInfoTurn(CANVAS_WIDTH/2,1000,BLACK, _oGroup);
        _oBlackPanel.setBgVisible(false);
        _oBlackPanel.invert();
        _oWhitePanel = new CInfoTurn(CANVAS_WIDTH/2,850,WHITE, _oGroup);
        _oWhitePanel.setBgVisible(false);
        _oWhitePanel.invert();

        var oSprite = s_oSpriteLibrary.getSprite('but_restart');
        _oRestart = new CGfxButton(CANVAS_WIDTH/2 - 180, CANVAS_HEIGHT/2 + 250, oSprite, _oGroup);
        _oRestart.addEventListener(ON_MOUSE_UP, this._onRestart, this);

        var oSprite = s_oSpriteLibrary.getSprite('but_home');
        _oHome = new CGfxButton(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 250, oSprite, _oGroup);
        _oHome.addEventListener(ON_MOUSE_UP, this._onExit, this);

        var oSprite = s_oSpriteLibrary.getSprite('but_show');
        _oCheckBoard = new CGfxButton(CANVAS_WIDTH/2 + 180, CANVAS_HEIGHT/2 + 250, oSprite, _oGroup);
        _oCheckBoard.addEventListener(ON_MOUSE_UP, this._onShow, this);

    };
    
    this.unload = function(){
        _oGroup.off("mousedown",_oListener);
    };
    
    this._initListener = function(){
        _oListener = _oGroup.on("mousedown",this._onExit);
    };
    
    this.show = function(iWinner, iBlackTime, iWhiteTime, iBlackScore, iWhiteScore){
        
        _oBlackPanel.refreshTime(formatTime(iBlackTime));
        _oWhitePanel.refreshTime(formatTime(iWhiteTime));
        
        
        if(iWinner === WHITE){
            playSound("win",1,false); 
            
            _oMsgText.refreshText( TEXT_CHECKMATE );
            _oMsgTextUnder.refreshText( sprintf(TEXT_WINS, TEXT_WHITE) );
        } else if(iWinner === BLACK) {
            if(s_iGameType === MODE_HUMAN){
                playSound("win",1,false); 
            } else {
                playSound("game_over",1,false);
            }            
            _oMsgText.refreshText( TEXT_CHECKMATE );
            _oMsgTextUnder.refreshText( sprintf(TEXT_WINS, TEXT_BLACK) );
        } else if(iWinner === DRAW){
            playSound("game_over",1,false);
            _oMsgText.refreshText( TEXT_STALEMATE );
            _oMsgTextUnder.refreshText( TEXT_DRAW );
        }
       
        _oGroup.visible = true;
        
        var oParent = this;
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500);
               
        $(s_oMain).trigger("save_score", [iWinner, iBlackTime, iWhiteTime, s_iGameType, iWhiteScore, iBlackScore]);
        $(s_oMain).trigger("share_event", [iWhiteScore, s_iGameType, iWinner] ); 
    };
    
    this._onRestart = function(){
        s_oGame.restartGame();
    };
    
    this._onExit = function(){
        _oGroup.off("mousedown",_oListener);
        _oBlackPanel.unload();
        _oWhitePanel.unload();
        s_oStage.removeChild(_oGroup);
        
        _oHome.unload();
        _oCheckBoard.unload();
        
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("show_interlevel_ad");
        
        s_oGame.onExit();
    };
    
    this._onShow = function(){
        _oGroup.visible = false;
        
        $(s_oMain).trigger("end_session");
    };
    
    this._init(oSpriteBg);
    
    return this;
}
