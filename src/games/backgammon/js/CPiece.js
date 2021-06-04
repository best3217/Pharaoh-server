function CPiece (iX,iY,iColor,oParentContainer,iPiece){
    var _iX;
    var _iY;
    var _iColor;
    var _oContainer;
    var _oPiece;
    var _oLightPiece;
    var _bSelected;
    var _oParent;
    var _bClicked;
    var _oParentContainer;
    var _iPiece;
    var _oListenerMD;
    var _oListenerOver;
    var _oListenerOut;
    var _iTriangle;
    var _bOnBar;
    var _bListenerActive;
    
    this.init = function(iX,iY,iColor,oParentContainer,iPiece){
        var oSprite;
        _oContainer = new createjs.Container();
        _iX = iX;
        _iY = iY;
        _iColor = iColor;
        _bSelected = false;
        _oParentContainer = oParentContainer;
        
        _oParentContainer.addChild(_oContainer);
        
        _oContainer.x = _iX;
        _oContainer.y = _iY;
        _oParent = this;
        _iPiece = iPiece;
        _iTriangle = null;
        _bOnBar = false;
        _bListenerActive = false;
        
        if (_iColor === BLACK_PIECE){
            oSprite = s_oSpriteLibrary.getSprite("red_piece");
        }else{
            oSprite = s_oSpriteLibrary.getSprite("white_piece");
        }
        
        var oData = {
            images: [oSprite],
            framerate: 30,
            frames: {width: 66, height: 58, regX: 31, regY: 29},
            animations: {out: {frames: [4], next: "out"}, 
                              idle: {frames: [0], next: "idle"},
                              takeIn: {frames: [4,3,2,1], next: "idle"},
                              takeOut: {frames: [1,2,3,4], next: "out"}}
        };
        
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oPiece =  createSprite(oSpriteSheet,"out",31,29,66,58);
        oSprite = s_oSpriteLibrary.getSprite("highlight");
        _oLightPiece = createBitmap(oSprite,oSprite.width,oSprite.height);
        _oLightPiece.regX = oSprite.width/2;
        _oLightPiece.regY = oSprite.height/2;
        _oLightPiece.alpha = 0;
        _bClicked = false;
        
        _oContainer.addChild(_oPiece,_oLightPiece);
    };
    
    this.onOver = function(evt){
       if (!s_bMobile){
           evt.target.cursor = "pointer";
       } 
    };
    
    this.setClicked = function(bVal){
        if (bVal===true){
            _oLightPiece.alpha = 1;
            _bClicked = true;
        }else{
            _oLightPiece.alpha = 0;
            _bClicked = false;
        }
    };
    
    this.getStateClick = function(){
        return _bClicked;
    };
    
    this.getColor = function(){
       return _iColor; 
    };
    
    
    this.getPiece = function(){
       return _oContainer; 
    };
    
    this.getIndex = function(){
       return _iPiece; 
    };
    
    this.getXOut = function(){
       return _iX-2; 
    };
    
    this.getYOut = function(iCounterBearOff){
        if (_iColor === WHITE_PIECE){
            return Y_OFFBOARD_DOWN+238-(17*iCounterBearOff); 
        }else{
            return Y_OFFBOARD_UP+(17*iCounterBearOff); 
        }
    };
    
    
    this.takeInAnimation = function(){
       _oPiece.gotoAndPlay("takeIn"); 
    };
    
     this.takeOutAnimation = function(){
       _oPiece.gotoAndPlay("takeOut"); 
    };
    
    this.setTriangle = function(iTriangle){
       _iTriangle = iTriangle; 
    };
    
    this.getTriangle = function(){
       return _iTriangle; 
    };
    
    this.setOnTop = function(){
       _oParentContainer.addChild(_oContainer); 
    };
    
    this.setBar = function(bVal){
        _bOnBar = bVal;
    };
    
    this.isOnBar = function(){
       return _bOnBar; 
    };
    
    this.movePieceDistribution = function(iX,iY){
        this.takeInAnimation();
        playSound("click_cell",1,false);
        new createjs.Tween.get(_oContainer).to({x: iX, y:iY},MS_DISTRIBUTION, createjs.Ease.cubicOut).call(s_oGame.initDistribution);
    };
    
    this.movePieceOnBoard = function(iX,iY){
        new createjs.Tween.get(_oContainer).to({x: iX, y: iY},700, createjs.Ease.cubicOut).call(function(){s_oGame.updateInput();s_oGame.afterMove();});
    };
    
    this.movePiece = function(iX,iY){
        new createjs.Tween.get(_oContainer).to({x: iX, y: iY},700, createjs.Ease.cubicOut);
    };
    
   this.initListeners = function(){
      _oListenerMD = _oContainer.on("mousedown",function(){
          s_oGame.onClickedPiece(_oParent);});
      _oListenerOver = _oContainer.on("rollover",this.onOver);
      _oListenerOut = _oContainer.on("rollout", this.onMouseOut);
      _bListenerActive = true;
      
   };
    
    this.unloadListeners = function(){
        //_oContainer.cursor = null;
            _oContainer.off("mousedown",_oListenerMD);
            _oContainer.off("rollover",_oListenerOver);
            _oContainer.off("rollout",_oListenerOut);
            _bListenerActive = false;
            //_oPiece.cursor = "default";
            
    };
    
    this.cpuInit = function(){
        _bListenerActive = true;
    };
    
    this.cpuUnload = function(){
        _bListenerActive = false;
    };
    
    this.getStateListener = function(){
       return _bListenerActive; 
    };
    
    this.onMouseOut = function(evt){
        if (!s_bMobile){
            evt.target.cursor = "default";
        }
    };
    
    this.init(iX,iY,iColor,oParentContainer,iPiece);
}