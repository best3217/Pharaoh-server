function CThinking(){
    var _bStart;
    
    var _iTimeElaps;
    
    var _oGroup;
    var _oText;
    var _oRect;
    var _oListener;
    
    this._init = function(){
        _bStart = true;
      
        _iTimeElaps=0;
      
        _oGroup = new createjs.Container();
        s_oStage.addChild(_oGroup);
        
        var graphics = new createjs.Graphics().beginFill("rgba(0,0,0,0.5)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oRect = new createjs.Shape(graphics);
        _oListener = _oRect.on("click", function(){});
        _oGroup.addChild(_oRect);
        
        _oText = new CTLText(_oGroup, 
                    CANVAS_WIDTH*0.5-400, CANVAS_HEIGHT*0.5 -100, 800, 60, 
                    60, "center", "#ffffff", PRIMARY_FONT, 1,
                    10, 0,
                    TEXT_THINKING,
                    true, true, false,
                    false );
    };
    
    this.unload = function(){
        _bStart =false;
        _oRect.off("click", _oListener);
        s_oStage.removeChild(_oGroup);
    };
    
    this.update = function(){
        if(_bStart){
            _iTimeElaps += s_iTimeElaps;
        
            if(_iTimeElaps >= 0 && _iTimeElaps < TIME_LOOP_WAIT/4){
                _oText.refreshText(TEXT_THINKING);
            } else if (_iTimeElaps >= TIME_LOOP_WAIT/4 && _iTimeElaps < TIME_LOOP_WAIT*2/4){
                _oText.refreshText(TEXT_THINKING+ ".");
            } else if (_iTimeElaps >= TIME_LOOP_WAIT*2/4 && _iTimeElaps < TIME_LOOP_WAIT*3/4){
                _oText.refreshText(TEXT_THINKING+"..");
            } else if (_iTimeElaps >= TIME_LOOP_WAIT*3/4 && _iTimeElaps < TIME_LOOP_WAIT){
                 _oText.refreshText(TEXT_THINKING+"...");
            } else {
                _iTimeElaps = 0;
            }
                
        }
        
        
    };
    
    this._init();
    
}; 
