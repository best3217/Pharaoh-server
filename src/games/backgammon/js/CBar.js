function CBar (iX,iY,iType,oParentContainer){
    var _iX;
    var _iY;
    var _oParentContainer;
    var _oContainer;
    var _iType;
    var _aPieces;
    var _iColor;
    var _oShape;
    
   this.init = function(iX,iY,iType,oParentContainer){
       _oContainer = new createjs.Container();
       _oParentContainer = oParentContainer;
       _oParentContainer.addChild(_oContainer);
       _iX = iX;
       _iY = iY;
       _iColor = null;
       _aPieces = new Array();
       _iType = iType;
       
       _oShape = new createjs.Shape();
       _oShape.graphics.beginFill("#000000").drawRect(iX,iY,62,253);
       _oShape.regX = 31;
       
       if (_iType === BAR_DOWN){
           _oShape.regY = 253;
       }
       
       _oShape.alpha = 0.01;
       
       _oContainer.addChild(_oShape);
   };
   
   this.getX = function (){
      return _iX; 
   };
   
   this.getY = function(){
       if (_iType===BAR_UP){
           if (_aPieces.length<5){
                return (_iY+28+(56*_aPieces.length));
           }else if (_aPieces.length<9){
               return (_iY+28+30+(56*(_aPieces.length-5)));
           }else if (_aPieces.length<12){
               return (_iY+28+60+(56*(_aPieces.length-9)));
           }else if(_aPieces.length<14){
               return (_iY+28+90+(56*(_aPieces.length-12)));
           }else if(_aPieces.length===14){
               return (_iY+28+60+56);
           }
       }else{
           if (_aPieces.length<5){
               return (_iY-35-(56*_aPieces.length));
           }else if (_aPieces.length<9){
               return (_iY-35-30-(56*(_aPieces.length-5)));
           }else if (_aPieces.length<12){
               return (_iY-28-60-(56*(_aPieces.length-9)));
           }else if(_aPieces.length<14){
               return (_iY-28-90-(56*(_aPieces.length-12)));
           }else if(_aPieces.length===14){
               return (_iY-28-60-56);
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
   
   this.onOver = function(evt){
       if (!s_bMobile){
           evt.target.cursor = "pointer";
       } 
    };
   
   this.getLastPiece = function(){
      return _aPieces[_aPieces.length-1]; 
   };
   
   this.getArrayPieces = function(){
       return _aPieces;
   };
   
   this.removePiece = function (){
       return _aPieces.pop();
   };
   
   
   this.init(iX,iY,iType,oParentContainer); 
};




