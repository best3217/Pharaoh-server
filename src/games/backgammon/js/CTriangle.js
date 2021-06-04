function CTriangle (iX,iY,oParentContainer,iCell){
    var _iX;
    var _iY;
    var _oParentContainer;
    var _oContainer;
    var _iType;
    var _oTriangle;
    var _iCell;
    var _aPieces;
    var _iColor;
    var _oListenerClick;
    var _oListenerOver;
    var _oShape;
    
   this.init = function(iX,iY,oParentContainer,iCell){
       _oContainer = new createjs.Container();
       _oParentContainer = oParentContainer;
       _oParentContainer.addChild(_oContainer);
       _iX = iX;
       _iY = iY;
       _iCell = iCell;
       _iColor = null;
       if (_iY === Y_TRIANGLE_UP){
            _iType = TRIANGLE_UP;
       }else{
           _iType = TRIANGLE_DOWN;
       }
       _aPieces = new Array();
       
       if (_iCell%2===0){
       var oSprite = s_oSpriteLibrary.getSprite("triangle_red");
       }else{
           oSprite = s_oSpriteLibrary.getSprite("triangle_white");
       }
       
       var oData = {
          images: [oSprite],
          frames: {width: 69, height: 256, regX: 34.5, regY: 0},
          animations: {idle: [0,0,"idle"], focus: [1,1,"focus"]}
       };
       
       var oSpriteSheet = new createjs.SpriteSheet(oData);
       _oTriangle = new createSprite(oSpriteSheet,"idle",34.5,0,69,256);
       
       if (_iType===TRIANGLE_DOWN){
           _oTriangle.scaleY *= -1;
       }
       
       _oTriangle.x = _iX;
       _oTriangle.y = _iY;
       
       _oContainer.addChild(_oTriangle);
       
       
        ///DEBUG
        /*
        var iTextY = iY
        if (_iType===TRIANGLE_DOWN){
           iTextY = iY + 20;
        }
        var oText = new createjs.Text(iCell, "30px " + "Arial", "#fff");
        oText.x = iX;
        oText.y = iTextY;
        oText.textBaseline = "alphabetic";
        oText.textAlign = "center";
        _oContainer.addChild(oText);
        */
        //////
   };
   
   this.reset = function(){
        _aPieces = new Array();
   };
   
   this.getX = function (){
      return _iX; 
   };
   
   this.getY = function(){
       if (_iType===TRIANGLE_UP){
           if (_aPieces.length<5){
                return (_iY+28+(53*_aPieces.length));
           }else if (_aPieces.length<9){
               return (_iY+28+30+(54*(_aPieces.length-5)));
           }else if (_aPieces.length<12){
               return (_iY+28+60+(53*(_aPieces.length-9)));
           }else if(_aPieces.length<14){
               return (_iY+28+90+(53*(_aPieces.length-12)));
           }else if(_aPieces.length===14){
               return (_iY+28+60+53);
           }
       }else{
           if (_aPieces.length<5){
               return (_iY-35-(53*_aPieces.length));
           }else if (_aPieces.length<9){
               return (_iY-35-30-(53*(_aPieces.length-5)));
           }else if (_aPieces.length<12){
               return (_iY-28-60-(53*(_aPieces.length-9)));
           }else if(_aPieces.length<14){
               return (_iY-28-90-(53*(_aPieces.length-12)));
           }else if(_aPieces.length===14){
               return (_iY-28-60-53);
           }
       }
   };
   
   this.getNumPieces = function(){
      return _aPieces.length; 
   };
   
   this.addPiece = function(oPiece){
      _aPieces.push(oPiece);
      _iColor = oPiece.getColor();
   };
   
   this.isHerePiece = function(oPiece){
       var bIsHere = false;
       for (var i=0;i<_aPieces.length;i++){
           if (oPiece===_aPieces[i]){
               bIsHere = true;
           }
       }
       return bIsHere;
   };
   
   this.getColor = function(){
       return _iColor;
   };
   
   this.getPieceByIndex = function(iIndex){
       return _aPieces[iIndex];
   };
   
   this.onFocus = function(aMove){
      _oTriangle.gotoAndStop("focus");
      this.initShape(aMove);
      
   };
   
   this.onOver = function(evt){
       if (!s_bMobile){
           evt.target.cursor = "pointer";
       } 
    };
   
   this.onIdle = function(){
      _oTriangle.gotoAndStop("idle"); 
      s_oStage.removeChild(_oShape);
   };
   
   this.getLastPiece = function(){
      return _aPieces[_aPieces.length-1]; 
   };
   
   this.getArrayPieces = function(){
       return _aPieces;
   };
   
   this.removePiece = function (){
       var oPiece = _aPieces.pop();
       
       if(_aPieces.length === 0){
           _iColor = null;
       }
       
       return oPiece;
   };
   
   this.initShape = function(aMove){
       _oShape = new createjs.Shape();
       if (_iType===TRIANGLE_UP){
            _oShape.graphics.beginFill("#000000").drawRect(iX-31,iY,62,283);
       }else{
           _oShape.graphics.beginFill("#000000").drawRect(iX-31,iY,62,-283);
       }
       _oShape.alpha = 0.01;
       
       _oListenerClick = _oShape.on("mousedown",function(){
          s_oGame.onClickedTriangle(aMove);
      });
      _oListenerOver = _oShape.on("mouseover", this.onOver);
       
       s_oStage.addChild(_oShape);
   };
   
   this.init(iX,iY,oParentContainer,iCell); 
};

