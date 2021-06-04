function CAlertBox (oParentContainer) {
    
    var _oContainer;
    var _oParentContainer;
    var _oAlertBox;
    var _oText;
    var _iYStartContainer;
    var _oParent = this;
    var _bIsHide;
    
    this.init = function(oParentContainer){
        _bIsHide = true;
        _oParentContainer = oParentContainer;
        
        _oContainer = new createjs.Container();
        _oContainer.x = CANVAS_WIDTH/2;
        _oContainer.on("mousedown",this.onMouseDown);
        _oParentContainer.addChild(_oContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite("alert_box");
        _oAlertBox = createBitmap(oSprite,oSprite.width,oSprite.height);
        _oAlertBox.regX = (oSprite.width/2)-3;
        _oAlertBox.regY = (oSprite.height/2)-8;
        _oContainer.addChild(_oAlertBox);
        
        var iWidth = oSprite.width-50;
        var iHeight = oSprite.height-20;
        var iX = 0;
        var iY = 6;
        _oText = new CTLText(_oContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    38, "center", "#3c2200", PRIMARY_FONT, 1.1,
                    2, 2,
                    " ",
                    true, true, true,
                    false );
        
        
        _iYStartContainer = -oSprite.height/2-10;
        _oContainer.y = _iYStartContainer;
    };
    
    this.show = function(szText){
        _bIsHide = false;
       _oText.refreshText( szText );
       new createjs.Tween.get(_oContainer).to({y: CANVAS_HEIGHT/2},500,createjs.Ease.cubicOut).wait(1600).call(function(){
           if (!_bIsHide){
               _oParent.hide();
           }
       });
    };
    
    this.hide = function(){
        _bIsHide = true;
        createjs.Tween.removeTweens(_oContainer);
        new createjs.Tween.get(_oContainer).to({y: _iYStartContainer},500,createjs.Ease.cubicIn);
    };
    
    this.onMouseDown = function(){
       if (!_bIsHide){
           _oParent.hide();
       } 
    };
    
    this.init(oParentContainer);
    
}