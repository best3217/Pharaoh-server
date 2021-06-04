function CMessage(iCurPlayer, szText, oParentContainer){
    
    var _iStartX;
    var _iStartY;
    var _iEndY;
    
    var _oMessage;
    var _oParent;
    
    this._init = function(iCurPlayer, szText, oParentContainer){
        
        if(iCurPlayer === WHITE){
            _iStartX = -306;
            _iStartY = 1000;
            _iEndY = 516;
        } else {
            _iStartX = 306;
            _iStartY = -1000;
            _iEndY = -506;
        }
        
        _oMessage = new createjs.Container();
        _oMessage.x = _iStartX;
        _oMessage.y = _iStartY;
        if(s_bMobile && iCurPlayer === BLACK && s_iGameType === MODE_HUMAN){
            _oMessage.rotation = 180;
        }
        oParentContainer.addChild(_oMessage);
        
        var oSprite = s_oSpriteLibrary.getSprite('message');
        var oBg = createBitmap(oSprite);
        oBg.regX = oSprite.width/2;
        oBg.regY = oSprite.height/2;
        _oMessage.addChild(oBg)
        
        var iWidth = oSprite.width-30;
        var iHeight = 50;
        var iX = 0;
        var iY = 0;
        var oText = new CTLText(_oMessage, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    40, "center", "#ffffff", PRIMARY_FONT, 1,
                    2, 2,
                    szText,
                    true, true, false,
                    false );

        
        createjs.Tween.get(_oMessage).to({y:_iEndY}, 750, createjs.Ease.cubicOut);
        
    };
    
    this.unload = function(){
        oParentContainer.removeChild(_oMessage);
    };
    
    this.removeAnimated = function(){
        if(_oMessage.x > CANVAS_WIDTH/2){
            createjs.Tween.get(_oMessage).to({x:CANVAS_WIDTH + 200}, 500, createjs.Ease.cubicOut).call(function(){
                _oParent.unload();
            });
        } else {
            createjs.Tween.get(_oMessage).to({x:-200}, 500, createjs.Ease.cubicOut).call(function(){
                _oParent.unload();
            });
        }
        
    };
    
    _oParent = this;
    this._init(iCurPlayer, szText, oParentContainer);
    
}