function CGame(oData){
    var _bStartGame;
    var _bPieceMoving;
    var _iScore;
    var _oInterface;
    var _oEndPanel = null;
    var _oParent;
    var _bPieceClicked;
    var _oTriangleContainer;
    var _aTriangle;
    var _oPieceContainer;
    var _iCounterDistribution;
    var _aPosDistribution;
    var _bTurnPlayer1;
    var _oInterface;
    var _iDice1;
    var _iDice2;
    var _bDice1;
    var _bDice2;
    var _bDoubleDice;
    var _iPlayerDice;
    var _aTmpPieces;
    var _oCurrentPiece;
    var _oContainerBar;
    var _aBar;
    var _oEndRectWhite;
    var _oEndRectBlack;
    var _oWhiteDices;
    var _oRedDices;
    var _bCpuTurned;
    var _iBearOffWhite;
    var _iBearOffBlack;
    var _oAlertBox;
    var _oThinking = null;
    var _bFastDistribution;
    var _oFastDistributionBut;

    var _oRuleFilter;
    var _aRuleToCheck;

    this._init = function(){
        
        MS_DISTRIBUTION = 300;
        _bFastDistribution = false;
        _iBearOffWhite = 0;
        _iBearOffBlack = 0;
        _bPieceClicked = false;
        _bStartGame=true;
        _iScore=0;
        _iCounterDistribution = 0;
        _iPlayerDice = 0;
        _aTmpPieces = new Array();
        _bCpuTurned = false;
        _bPieceMoving = false;
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(oBg); //Draws on canvas
        
        _iDice1 = 0;
        _iDice2 = 0;
        _bDice1 = false;
        _bDice2 = false;
        _bDoubleDice = false;
        
        _oTriangleContainer = new createjs.Container();
        s_oStage.addChild(_oTriangleContainer);
        
        _aBar = new Array();
        
        _oContainerBar = new createjs.Container();
        
        s_oStage.addChild(_oContainerBar);
        
        _aBar.push(new CBar(CANVAS_WIDTH/2,CANVAS_HEIGHT/2-265,BAR_UP,_oContainerBar));
        
        _aBar.push(new CBar(CANVAS_WIDTH/2,CANVAS_HEIGHT/2+265,BAR_DOWN,_oContainerBar));
        
        _aTriangle = new Array();
        
        _aTriangle.push(new CTriangle(X_TRIANGLE_RIGHT+(62*5),Y_TRIANGLE_UP,_oTriangleContainer,CELL_0));
        _aTriangle.push(new CTriangle(X_TRIANGLE_RIGHT+(62*4),Y_TRIANGLE_UP,_oTriangleContainer,CELL_1));
        _aTriangle.push(new CTriangle(X_TRIANGLE_RIGHT+(62*3),Y_TRIANGLE_UP,_oTriangleContainer,CELL_2));
        _aTriangle.push(new CTriangle(X_TRIANGLE_RIGHT+(62*2),Y_TRIANGLE_UP,_oTriangleContainer,CELL_3));
        _aTriangle.push(new CTriangle(X_TRIANGLE_RIGHT+62,Y_TRIANGLE_UP,_oTriangleContainer,CELL_4));
        _aTriangle.push(new CTriangle(X_TRIANGLE_RIGHT,Y_TRIANGLE_UP,_oTriangleContainer,CELL_5));
        _aTriangle.push(new CTriangle(X_TRIANGLE_LEFT+(62*5),Y_TRIANGLE_UP,_oTriangleContainer,CELL_6));
        _aTriangle.push(new CTriangle(X_TRIANGLE_LEFT+(62*4),Y_TRIANGLE_UP,_oTriangleContainer,CELL_7));
        _aTriangle.push(new CTriangle(X_TRIANGLE_LEFT+(62*3),Y_TRIANGLE_UP,_oTriangleContainer,CELL_8));
        _aTriangle.push(new CTriangle(X_TRIANGLE_LEFT+(62*2),Y_TRIANGLE_UP,_oTriangleContainer,CELL_9));
        _aTriangle.push(new CTriangle(X_TRIANGLE_LEFT+62,Y_TRIANGLE_UP,_oTriangleContainer,CELL_10));
        _aTriangle.push(new CTriangle(X_TRIANGLE_LEFT,Y_TRIANGLE_UP,_oTriangleContainer,CELL_11));
        _aTriangle.push(new CTriangle(X_TRIANGLE_LEFT,Y_TRIANGLE_DOWN,_oTriangleContainer,CELL_12));
        _aTriangle.push(new CTriangle(X_TRIANGLE_LEFT+62,Y_TRIANGLE_DOWN,_oTriangleContainer,CELL_13));
        _aTriangle.push(new CTriangle(X_TRIANGLE_LEFT+(62*2),Y_TRIANGLE_DOWN,_oTriangleContainer,CELL_14));
        _aTriangle.push(new CTriangle(X_TRIANGLE_LEFT+(62*3),Y_TRIANGLE_DOWN,_oTriangleContainer,CELL_15));
        _aTriangle.push(new CTriangle(X_TRIANGLE_LEFT+(62*4),Y_TRIANGLE_DOWN,_oTriangleContainer,CELL_16));
        _aTriangle.push(new CTriangle(X_TRIANGLE_LEFT+(62*5),Y_TRIANGLE_DOWN,_oTriangleContainer,CELL_17));
        _aTriangle.push(new CTriangle(X_TRIANGLE_RIGHT,Y_TRIANGLE_DOWN,_oTriangleContainer,CELL_18));
        _aTriangle.push(new CTriangle(X_TRIANGLE_RIGHT+62,Y_TRIANGLE_DOWN,_oTriangleContainer,CELL_19));
        _aTriangle.push(new CTriangle(X_TRIANGLE_RIGHT+(62*2),Y_TRIANGLE_DOWN,_oTriangleContainer,CELL_20));
        _aTriangle.push(new CTriangle(X_TRIANGLE_RIGHT+(62*3),Y_TRIANGLE_DOWN,_oTriangleContainer,CELL_21));
        _aTriangle.push(new CTriangle(X_TRIANGLE_RIGHT+(62*4),Y_TRIANGLE_DOWN,_oTriangleContainer,CELL_22));
        _aTriangle.push(new CTriangle(X_TRIANGLE_RIGHT+(62*5),Y_TRIANGLE_DOWN,_oTriangleContainer,CELL_23));
        
        _oPieceContainer = new createjs.Container();
        s_oStage.addChild(_oPieceContainer);
        
        _aPosDistribution = [
            0,0,11,11,11,11,11,16,16,16,18,18,18,18,18,                         ///WHITE
            23,23,12,12,12,12,12,7,7,7,5,5,5,5,5                                ///RED
        ];
        
        for (var i=0;i<NUM_PIECES;i++){
            _aTmpPieces.push(new CPiece(X_OFFBOARD,Y_OFFBOARD_DOWN+(17*i),WHITE_PIECE,_oPieceContainer,i));
        }
        
        for (var i=0;i<NUM_PIECES;i++){
            _aTmpPieces.push(new CPiece(X_OFFBOARD,Y_OFFBOARD_UP+(17*i),BLACK_PIECE,_oPieceContainer,i+NUM_PIECES));
        }
        
        _oWhiteDices = new CDices(0);
        _oRedDices = new CDices(1);
        
        _oAlertBox = new CAlertBox(s_oStage);
        
        var oSprite = s_oSpriteLibrary.getSprite("but_speed");
        _oFastDistributionBut = new CGfxButton(CANVAS_WIDTH-200,CANVAS_HEIGHT/2,oSprite,s_oStage);
        _oFastDistributionBut.addEventListener(ON_MOUSE_DOWN,this.onFastDistribution);
        
        _oInterface = new CInterface();
        this.initDistribution();

        _oRuleFilter = new CRuleFilter();

    };
    
    this.onFastDistribution = function(){
       _bFastDistribution = true;
       new createjs.Tween.get(_oFastDistributionBut.getButtonImage()).to({x: CANVAS_WIDTH+200},300).call(_oFastDistributionBut.unload);
    };
    
    this.initDistribution = function(){
        var oThisPiece;
        var iIndexTriangle;
        if (_bFastDistribution){
            MS_DISTRIBUTION = 0;
        }
        if (_iCounterDistribution<NUM_PIECES*2){
            oThisPiece = _aTmpPieces[_iCounterDistribution];
            iIndexTriangle = _aPosDistribution[_iCounterDistribution];
            _oPieceContainer.addChildAt(oThisPiece.getPiece(),_oPieceContainer.numChildren);
            oThisPiece.movePieceDistribution(_aTriangle[iIndexTriangle].getX(),_aTriangle[iIndexTriangle].getY());
            oThisPiece.setTriangle(iIndexTriangle);
            _aTriangle[iIndexTriangle].addPiece(oThisPiece);
            _iCounterDistribution ++;
        }else{
            
            if (randomFloatBetween(1,100)>50){
                _bTurnPlayer1 = true;
            }else{
                _bTurnPlayer1 = false;
            }
           
            if (!_bFastDistribution){
                _oParent.onFastDistribution();
            }
            
            _oInterface.onFocusTurn(_bTurnPlayer1);
            
            if (s_b2Players||_bTurnPlayer1){
                _oInterface.setVisibleButDice(true);
            }
            
            _oParent.updateInput();
        }
    };
    
    this.onClickedPiece = function(oPieceIstance){
        if(_bPieceMoving){
            return;
        }
        playSound("click_cell",1,false);
        
        var iCurrentBar;
        
        if (oPieceIstance.getTriangle()!==-1&&oPieceIstance.getTriangle()!==24){
            _oCurrentPiece = _aTriangle[oPieceIstance.getTriangle()].getLastPiece();
        }else{
            if (oPieceIstance.getColor()===WHITE_PIECE){
                _oCurrentPiece = _aBar[BAR_UP].getLastPiece();
            }else{
                _oCurrentPiece = _aBar[BAR_DOWN].getLastPiece();
            }
        }
        
        if (_oCurrentPiece.getColor()===WHITE_PIECE){
            iCurrentBar = BAR_UP;
        }else{
            iCurrentBar = BAR_DOWN;
        }
        
        var aPieces;
        
        var aPossibleMove;
        
        if (_iPlayerDice>0){
            
            _oCurrentPiece.setOnTop();
            
           if (_bPieceClicked===false){
               
               if (this.isPossibleMove(_oCurrentPiece)){
                    
                    _oCurrentPiece.setClicked(true);
                    _bPieceClicked = true;
                    aPossibleMove = this.isPossibleMove(_oCurrentPiece);
                    if (_bDoubleDice){

                            if (aPossibleMove[0].length>0){
                                _aTriangle[aPossibleMove[0][0].iFocusTriangle].onFocus(aPossibleMove[0][0]);
                            }
                            if (aPossibleMove[0].length>1&&_aBar[iCurrentBar].getNumPieces()<2){
                                _aTriangle[aPossibleMove[0][1].iFocusTriangle].onFocus(aPossibleMove[0][1]);
                            }
                            if (aPossibleMove[0].length>2&&_aBar[iCurrentBar].getNumPieces()<2){
                                _aTriangle[aPossibleMove[0][2].iFocusTriangle].onFocus(aPossibleMove[0][2]);
                            }
                            if (aPossibleMove[0].length>3&&_aBar[iCurrentBar].getNumPieces()<2){
                                _aTriangle[aPossibleMove[0][3].iFocusTriangle].onFocus(aPossibleMove[0][3]);
                            }
                            }else{

                            if (aPossibleMove[0].length>0){
                                _aTriangle[aPossibleMove[0][0].iFocusTriangle].onFocus(aPossibleMove[0][0]);
                            }
                            if (aPossibleMove[1].length>0){
                                _aTriangle[aPossibleMove[1][0].iFocusTriangle].onFocus(aPossibleMove[1][0]);
                            }
                            if (aPossibleMove[2].length>0&&_aBar[iCurrentBar].getNumPieces()<2){
                                _aTriangle[aPossibleMove[2][0].iFocusTriangle].onFocus(aPossibleMove[2][0]);
                            }
                    }
                    
                    if (aPossibleMove[3].length>0){
                            if (aPossibleMove[3][0].iFocusTriangle===FINAL_CELL_WHITE){
                                var oSprite = s_oSpriteLibrary.getSprite("light_turn");
                                _oEndRectWhite = createBitmap(oSprite,oSprite.width,oSprite.height);
                                _oEndRectWhite.regX = 11;
                                _oEndRectWhite.regY = 12;
                                _oEndRectWhite.x = X_INTERFACE_PLAYER_END;
                                _oEndRectWhite.y = Y_INTERFACE_PLAYER_2;
                                _oEndRectWhite.on("mousedown",function(){_oParent.onClickedTriangle(aPossibleMove[3][0]);});
                                _oEndRectWhite.on("rollover", function(evt){
                                    if (!s_bMobile){
                                        evt.target.cursor = "pointer";
                                    }
                                });
                                _oEndRectWhite.on("rollout", function(evt){
                                    if (!s_bMobile){
                                        evt.target.cursor = "default";
                                    }
                                });
                                s_oStage.addChild(_oEndRectWhite);
                            }else{
                                var oSprite = s_oSpriteLibrary.getSprite("light_turn");
                                _oEndRectBlack = createBitmap(oSprite,oSprite.width,oSprite.height);
                                _oEndRectBlack.regX = 11;
                                _oEndRectBlack.regY = 12;
                                _oEndRectBlack.x = X_INTERFACE_PLAYER_END;
                                _oEndRectBlack.y = Y_INTERFACE_PLAYER_1;
                                _oEndRectBlack.on("mousedown",function(){_oParent.onClickedTriangle(aPossibleMove[3][0]);});
                                _oEndRectBlack.on("rollover", function(evt){
                                    if (!s_bMobile){
                                        evt.target.cursor = "pointer";
                                    }
                                });
                                _oEndRectBlack.on("rollout", function(evt){
                                    if (!s_bMobile){
                                        evt.target.cursor = "default";
                                    }
                                });
                                s_oStage.addChild(_oEndRectBlack);
                            }
                        
                        
                    }
                    
                    
                }
           }else{
               if (_oCurrentPiece.getStateClick()===true){
                   _oCurrentPiece.setClicked(false);
                   _bPieceClicked = false;
                   s_oStage.removeChild(_oEndRectWhite);
                   s_oStage.removeChild(_oEndRectBlack);
                   for (var i=0;i<_aTriangle.length;i++){
                        _aTriangle[i].onIdle();
                   }
               }else{
                   s_oStage.removeChild(_oEndRectWhite);
                   s_oStage.removeChild(_oEndRectBlack);
                   for (var i=0;i<_aTriangle.length;i++){
                       _aTriangle[i].onIdle();
                       if (_aTriangle[i].getNumPieces()>0){
                            aPieces = _aTriangle[i].getArrayPieces();
                            for (var j=0;j<aPieces.length;j++){
                                aPieces[j].setClicked(false);
                            }
                       }
                   }
                   _bPieceClicked = false;
                   this.onClickedPiece(oPieceIstance);
               }
           }
           
       }
    };
    
    this.isPossibleMove = function(oPiece){
        
        var iPieceColor = oPiece.getColor();
        var iPieceTriangle = oPiece.getTriangle();
        var iPosNeg;
        var iBestTriangle;
        var iFinalCell;
        
        if (iPieceColor===WHITE_PIECE){
            iPosNeg = 1;
            iFinalCell = FINAL_CELL_WHITE;
        }else{
            iPosNeg = -1;
            iFinalCell = FINAL_CELL_BLACK;
        }
        
        var aMove = new Array();
        
        aMove[0] = new Array();
        aMove[1] = new Array();
        aMove[2] = new Array();
        aMove[3] = new Array();
        
        var oTmpTriangle;
        
        if (_bDoubleDice){
            
            oTmpTriangle = _aTriangle[iPieceTriangle+(_iDice1*iPosNeg)];
            if (oTmpTriangle){
                if(oTmpTriangle.getNumPieces()<=1||oTmpTriangle.getColor()===iPieceColor){
                    aMove[0].push({iFocusTriangle: iPieceTriangle+(_iDice1*iPosNeg), cost: 1, 
                    aMoveTriangle: [iPieceTriangle+(_iDice1*iPosNeg)]});
                }
            }else if(this.checkBearOff()){
                if (iPieceTriangle+(_iDice1*iPosNeg)===iFinalCell||this.checkPieceBefore(iPieceColor,iPieceTriangle)){
                    aMove[3].push({iFocusTriangle: iFinalCell, cost: 1, 
                    aMoveTriangle: [iFinalCell]});
                }
            }
            
            if (aMove[0].length>0&&_iPlayerDice>1){
                oTmpTriangle = _aTriangle[iPieceTriangle+(_iDice1*2*iPosNeg)];
                if (oTmpTriangle){
                    if(oTmpTriangle.getNumPieces()<=1||oTmpTriangle.getColor()===iPieceColor){
                        aMove[0].push({iFocusTriangle: iPieceTriangle+(_iDice1*2*iPosNeg), cost: 2, 
                        aMoveTriangle: [iPieceTriangle+(_iDice1*iPosNeg),iPieceTriangle+(_iDice1*2*iPosNeg)]});
                    }
                }else if(this.checkBearOff()){
                    if (iPieceTriangle+(_iDice1*2*iPosNeg)===iFinalCell||this.checkPieceBefore(iPieceColor,iPieceTriangle+(_iDice1*iPosNeg))){
                    aMove[3].push({iFocusTriangle: iFinalCell, cost: 2, 
                    aMoveTriangle: [iPieceTriangle+(_iDice1*iPosNeg),iFinalCell]});
                }
            }
            }
            
            if (aMove[0].length>1&&_iPlayerDice>2){
                oTmpTriangle = _aTriangle[iPieceTriangle+(_iDice1*3*iPosNeg)];
                if (oTmpTriangle){
                    if(oTmpTriangle.getNumPieces()<=1||oTmpTriangle.getColor()===iPieceColor){
                        aMove[0].push({iFocusTriangle: iPieceTriangle+(_iDice1*3*iPosNeg), cost: 3,
                        aMoveTriangle: [iPieceTriangle+(_iDice1*iPosNeg),iPieceTriangle+(_iDice1*2*iPosNeg),iPieceTriangle+(_iDice1*3*iPosNeg)]});
                    }
                }else if(this.checkBearOff()){  
                    if (iPieceTriangle+(_iDice1*3*iPosNeg)===iFinalCell||this.checkPieceBefore(iPieceColor,iPieceTriangle+(_iDice1*2*iPosNeg))){
                    aMove[3].push({iFocusTriangle: iFinalCell, cost: 3, 
                    aMoveTriangle: [iPieceTriangle+(_iDice1*iPosNeg),iPieceTriangle+(_iDice1*2*iPosNeg),iFinalCell]});
                    }
                }
            }
            
            if (aMove[0].length>2&&_iPlayerDice>3){
                oTmpTriangle = _aTriangle[iPieceTriangle+(_iDice1*4*iPosNeg)];
                if (oTmpTriangle){
                    if(oTmpTriangle.getNumPieces()<=1||oTmpTriangle.getColor()===iPieceColor){
                        aMove[0].push({iFocusTriangle: iPieceTriangle+(_iDice1*4*iPosNeg), cost: 4,
                        aMoveTriangle: [iPieceTriangle+(_iDice1*iPosNeg),iPieceTriangle+(_iDice1*2*iPosNeg),iPieceTriangle+(_iDice1*3*iPosNeg),iPieceTriangle+(_iDice1*4*iPosNeg)]});
                    }
                }else if(this.checkBearOff()){  
                    if (iPieceTriangle+(_iDice1*4*iPosNeg)===iFinalCell||this.checkPieceBefore(iPieceColor,iPieceTriangle+(_iDice1*3*iPosNeg))){
                    aMove[3].push({iFocusTriangle: iFinalCell, cost: 4, 
                    aMoveTriangle: [iPieceTriangle+(_iDice1*iPosNeg),iPieceTriangle+(_iDice1*2*iPosNeg),iPieceTriangle+(_iDice1*2*iPosNeg),iFinalCell]});
                    }
                }
            }
        }else{
            oTmpTriangle = _aTriangle[iPieceTriangle+(_iDice1*iPosNeg)];
            
             if (oTmpTriangle){
                 if(_bDice1&&(oTmpTriangle.getNumPieces()<=1||oTmpTriangle.getColor()===iPieceColor)){
                        aMove[0].push({iFocusTriangle: iPieceTriangle+(_iDice1*iPosNeg), cost: 1,
                        aMoveTriangle: [iPieceTriangle+(_iDice1*iPosNeg)], iDiceDisable: 0});
                }
            }else if(_bDice1&&this.checkBearOff()){  
                    if (iPieceTriangle+(_iDice1*iPosNeg)===iFinalCell||this.checkPieceBefore(iPieceColor,iPieceTriangle)){
                    aMove[3].push({iFocusTriangle: iFinalCell, cost: 1, iDiceDisable: 0,
                    aMoveTriangle: [iFinalCell]});
                    }
             }
            
            oTmpTriangle = _aTriangle[iPieceTriangle+(_iDice2*iPosNeg)];
            
            if (oTmpTriangle){
                if(_bDice2&&(oTmpTriangle.getNumPieces()<=1||oTmpTriangle.getColor()===iPieceColor)){
                    aMove[1].push({iFocusTriangle: iPieceTriangle+(_iDice2*iPosNeg), cost: 1,
                    aMoveTriangle: [iPieceTriangle+(_iDice2*iPosNeg)], iDiceDisable: 1});
                }
            }else if(_bDice2&&this.checkBearOff()){  
                    if (iPieceTriangle+(_iDice2*iPosNeg)===iFinalCell||this.checkPieceBefore(iPieceColor,iPieceTriangle)){
                    aMove[3].push({iFocusTriangle: iFinalCell, cost: 1, iDiceDisable: 1,
                    aMoveTriangle: [iFinalCell]});
                }
            }
            
            if (aMove[0].length>0||aMove[1].length>0){
                
                if (aMove[0].length>0){
                    iBestTriangle = aMove[0][0].iFocusTriangle;
                }else{
                    iBestTriangle = aMove[1][0].iFocusTriangle;
                }
                
                if (aMove[0].length>0&&_aTriangle[aMove[0][0].iFocusTriangle].getNumPieces()===1){
                    iBestTriangle = aMove[0][0].iFocusTriangle;
                }
                
                if (aMove[1].length>0&&_aTriangle[aMove[1][0].iFocusTriangle].getNumPieces()===1){
                    iBestTriangle = aMove[1][0].iFocusTriangle;
                }
                
                oTmpTriangle = _aTriangle[iPieceTriangle+((_iDice1+_iDice2)*iPosNeg)];
                
                if (oTmpTriangle){
                    if(_bDice1&&_bDice2&&(oTmpTriangle.getNumPieces()<=1||oTmpTriangle.getColor()===iPieceColor)){
                        aMove[2].push({iFocusTriangle: iPieceTriangle+((_iDice1+_iDice2)*iPosNeg), cost: 2,
                            aMoveTriangle: [iBestTriangle,iPieceTriangle+((_iDice1+_iDice2)*iPosNeg)], iDiceDisable: 2});
                    }
                 }else if(_bDice1&&_bDice2&&this.checkBearOff()){  
                    if (iPieceTriangle+((_iDice1+_iDice2)*iPosNeg)===iFinalCell||this.checkPieceBefore(iPieceColor,iBestTriangle)){
                    aMove[3].push({iFocusTriangle: iFinalCell, cost: 2, iDiceDisable: 2,
                    aMoveTriangle: [iBestTriangle,iFinalCell]});
                }
           }
            
        }
        
    }
        
        if (aMove[0].length>0||aMove[1].length>0||aMove[3].length>0){
            return aMove;
        }else{
            return null;
        }
        
        
    };
    
    this.checkPieceBefore = function(iColor,iPieceTriangle){
        var bNoPieceBefore = true;
        var aPieces;
        
        if (iColor === WHITE_PIECE){
            for (var i=0;i<iPieceTriangle;i++){
                for (var j=0;j<_aTriangle[i].getArrayPieces().length;j++){
                    aPieces = _aTriangle[i].getArrayPieces();
                    if(aPieces[j].getColor()===WHITE_PIECE){
                        bNoPieceBefore = false;
                        break;
                    }
                }
            }
        }else{
            for (var i=23;i>iPieceTriangle;i--){
                for (var j=0;j<_aTriangle[i].getArrayPieces().length;j++){
                    aPieces = _aTriangle[i].getArrayPieces();
                    if(aPieces[j].getColor()===BLACK_PIECE){
                        bNoPieceBefore = false;
                        break;
                    }
                }
            }
        }
        
        return bNoPieceBefore;
        
    };
    
    this.checkBearOff = function(){
        
        var bBearOffAvaiable = true;
        var aPieces;
        
       if (_bTurnPlayer1){
           for (var i=0;i<_aTriangle.length;i++){
               aPieces = _aTriangle[i].getArrayPieces();
               for (var j=0;j<aPieces.length;j++){
                   if (aPieces[j].getColor()===WHITE_PIECE&&(aPieces[j].isOnBar()===true||aPieces[j].getTriangle()<18)){
                       bBearOffAvaiable = false;
                       break;
                   }
               }
           }
       }else{
           for (var i=0;i<_aTriangle.length;i++){
               aPieces = _aTriangle[i].getArrayPieces();
               for (var j=0;j<aPieces.length;j++){
                   if (aPieces[j].getColor()===BLACK_PIECE&&(aPieces[j].isOnBar()===true||aPieces[j].getTriangle()>5)){
                       bBearOffAvaiable = false;
                       break;
                   }
               }
           }
       }
       
       return bBearOffAvaiable;
       
    };
    
    this.checkAvaiableMove = function(){
        
        var bAvailableMove = false;
        var aPieces;
        var iColor;
        var iBar;
        if (_bTurnPlayer1){
            iColor = WHITE_PIECE;
            iBar = BAR_UP;
        }else{
            iColor = BLACK_PIECE;
            iBar = BAR_DOWN;
        }
            for (var i=0;i<_aTriangle.length;i++){
                aPieces = _aTriangle[i].getArrayPieces();
                for (var j=0;j<aPieces.length;j++){
                    if (aPieces[j].getColor()===iColor&&aPieces[j].getStateListener()===true&&this.isPossibleMove(aPieces[j])){
                        bAvailableMove = true;
                        break;
                    }
                }
            }
            
            aPieces = _aBar[iBar].getArrayPieces();
            
            for (var i=0;i<_aBar[iBar].getNumPieces();i++){
                if (this.isPossibleMove(aPieces[i])){
                    bAvailableMove = true;
                    break;
                }
            }
            
        return bAvailableMove;
        
    };
    
   this.updateInput = function(){
       var aPieces;
       
       for (var i=0;i<_aTriangle.length;i++){
                if (_aTriangle[i].getNumPieces()>0){
                    
                    aPieces = _aTriangle[i].getArrayPieces();
                    
                    for (var j=0;j<aPieces.length;j++){
                        aPieces[j].unloadListeners();
                    }
                    
                }
      }
      
      for (var i=0;i<_aBar.length;i++){
          if (_aBar[i].getNumPieces()>0){
              aPieces = _aBar[i].getArrayPieces();
              
              for (var j=0;j<aPieces.length;j++){
                  aPieces[j].unloadListeners();
              }
          }
      }
      
      if (s_b2Players){
          if (_bTurnPlayer1){
              if (_aBar[BAR_UP].getNumPieces()===0){
                    for (var i=0;i<_aTriangle.length;i++){

                        if (_aTriangle[i].getNumPieces()>0){

                            aPieces = _aTriangle[i].getArrayPieces();

                              if (_aTriangle[i].getColor()===WHITE_PIECE){

                                  for (var j=0;j<aPieces.length;j++){
                                      aPieces[j].initListeners();
                                  }

                              }
                      }
                    }
            }else{
                for (var i=0;i<_aBar[0].getArrayPieces().length;i++){
                    _aBar[BAR_UP].getArrayPieces()[i].initListeners();
                }
            }
          }else{ 
              if (_aBar[BAR_DOWN].getNumPieces()===0){
                    for (var i=0;i<_aTriangle.length;i++){

                        if (_aTriangle[i].getNumPieces()>0){

                            aPieces = _aTriangle[i].getArrayPieces();

                             if (_aTriangle[i].getColor()===BLACK_PIECE){

                                 for (var j=0;j<aPieces.length;j++){
                                     aPieces[j].initListeners();
                                 }
                            }
                        }
                   }
               }else{
                   for (var i=0;i<_aBar[1].getArrayPieces().length;i++){
                    _aBar[BAR_DOWN].getArrayPieces()[i].initListeners();
                }
               }
          }
      }else{
          if (_bTurnPlayer1){
              if (_aBar[BAR_UP].getNumPieces()===0){
                    for (var i=0;i<_aTriangle.length;i++){

                        if (_aTriangle[i].getNumPieces()>0){

                            aPieces = _aTriangle[i].getArrayPieces();

                              if (_aTriangle[i].getColor()===WHITE_PIECE){

                                  for (var j=0;j<aPieces.length;j++){
                                      aPieces[j].initListeners();
                                  }

                              }
                      }
                    }
            }else{
                for (var i=0;i<_aBar[0].getArrayPieces().length;i++){
                    _aBar[BAR_UP].getArrayPieces()[i].initListeners();
                }
            }
          }else{
              if (_aBar[BAR_DOWN].getNumPieces()===0){
                    for (var i=0;i<_aTriangle.length;i++){

                        if (_aTriangle[i].getNumPieces()>0){

                            aPieces = _aTriangle[i].getArrayPieces();

                             if (_aTriangle[i].getColor()===BLACK_PIECE){

                                 for (var j=0;j<aPieces.length;j++){
                                     aPieces[j].cpuInit();
                                 }
                            }
                        }
                   }
               }else{
                   for (var i=0;i<_aBar[1].getArrayPieces().length;i++){
                    _aBar[BAR_DOWN].getArrayPieces()[i].cpuInit();
                }
               }
               if (_bCpuTurned===false){
                   _bCpuTurned = true;
                    this.rollDice();
               }
          }
      }
       
   };
   
   this.onClickedTriangle = function(aPossibleMove){
        playSound("click_cell",1,false);
       
        var iTriangleSource = _oCurrentPiece.getTriangle();
        var szBrokenRule = _oRuleFilter.checkForbiddenMoveInList(aPossibleMove, iTriangleSource, _aRuleToCheck);

        ///SWITCH RULE, IF HIT SOME RULE SHOW PLAYER MESSAGE AND RETURN, THEN CONTINUE TO MOVE
        switch(szBrokenRule){
            case RULE_BROKEN_BOTH_DICE:{
                    _oAlertBox.show(TEXT_RULEBROKEN_BOTH);
                    return;
                    break;
            }
            case RULE_BROKEN_HIGHER_DICE:{
                    _oAlertBox.show(TEXT_RULEBROKEN_HIGHER);
                    return;
                    break;
            }
            default:{
                    ///DO NOTHING
                    break;
            }
        }
       
       var iCell;
       var bFinalMove = false;
       var iCounterBearOff;
       
       if (_oCurrentPiece.getColor()===WHITE_PIECE){
           iCounterBearOff = _iBearOffWhite;
       }else{
           iCounterBearOff = _iBearOffBlack;
       }
       
       for (var i=0; i<_aTriangle.length;i++){
           _aTriangle[i].onIdle();
       }
       s_oStage.removeChild(_oEndRectWhite);
       s_oStage.removeChild(_oEndRectBlack);
       
       if (s_b2Players||_bTurnPlayer1){
            _oCurrentPiece.setClicked(false);
            //_oCurrentPiece.unloadListeners();
            _bPieceClicked = false;
       }
       
       if (aPossibleMove.iFocusTriangle===-1||aPossibleMove.iFocusTriangle===24){
           bFinalMove = true;
            if (aPossibleMove.aMoveTriangle.length>1){
                iCell =  aPossibleMove.aMoveTriangle[0];
            }
        }else{
            iCell =  aPossibleMove.aMoveTriangle[0];
        }
       if (_aTriangle[iCell]){
            _bPieceMoving = true;
            if (_aTriangle[iCell].getColor()!==_oCurrentPiece.getColor()&&_aTriangle[iCell].getNumPieces()===1){
                if (_aTriangle[iCell].getLastPiece().getColor()===WHITE_PIECE){
                    _aTriangle[iCell].getLastPiece().movePiece(_aBar[BAR_UP].getX(),_aBar[BAR_UP].getY());
                    _aTriangle[iCell].getLastPiece().setTriangle(-1);
                    _aTriangle[iCell].getLastPiece().setBar(true);
                    _aBar[BAR_UP].addPiece(_aTriangle[iCell].removePiece());
                }else{
                    _aTriangle[iCell].getLastPiece().movePiece(_aBar[BAR_DOWN].getX(),_aBar[BAR_DOWN].getY());
                    _aTriangle[iCell].getLastPiece().setTriangle(24);
                    _aTriangle[iCell].getLastPiece().setBar(true);
                    _aBar[BAR_DOWN].addPiece(_aTriangle[iCell].removePiece());
                }
            }
        }else if(aPossibleMove.iFocusTriangle===-1||aPossibleMove.iFocusTriangle===24){
            _oCurrentPiece.takeOutAnimation();
            new createjs.Tween.get(_oCurrentPiece.getPiece()).to({x: _oCurrentPiece.getXOut(), y: _oCurrentPiece.getYOut(iCounterBearOff)},300, createjs.Ease.cubicOut);
            if (_oCurrentPiece.getColor()===WHITE_PIECE){
               _iBearOffWhite++;
            }else{
               _iBearOffBlack++;
            }
            _aTriangle[_oCurrentPiece.getTriangle()].removePiece();
            _oCurrentPiece.setTriangle(null);
            _oCurrentPiece.unloadListeners();
        }
        
        aPossibleMove.aMoveTriangle.shift();
        
        if (aPossibleMove.aMoveTriangle.length>0){
            new createjs.Tween.get(_oCurrentPiece.getPiece()).to({x: _aTriangle[iCell].getX(),y: _aTriangle[iCell].getY()},700,createjs.Ease.cubicOut)
                    .call(function(){_oParent.onClickedTriangle(aPossibleMove);});
        }else{
            if (!_bTurnPlayer1&&!s_b2Players){
                _bCpuTurned = true;
            }
            
            _iPlayerDice-=aPossibleMove.cost;
            if (!_bDoubleDice){
                if (aPossibleMove.iDiceDisable===0){
                    _bDice1 = false;
                }else if (aPossibleMove.iDiceDisable===1){
                    _bDice2 = false;
                }else{
                    _bDice1 = false;
                    _bDice2 = false;
                }
            }
            if (!bFinalMove){
                _oCurrentPiece.movePieceOnBoard(_aTriangle[iCell].getX(),_aTriangle[iCell].getY());
            }else{
                this.afterMove();
            }
        }
        
        
        if (!_oCurrentPiece.isOnBar()){
            if (!bFinalMove){
                _aTriangle[iCell].addPiece(_aTriangle[_oCurrentPiece.getTriangle()].removePiece());
            }
        }else{
            if (_oCurrentPiece.getColor()===WHITE_PIECE){
                _aBar[BAR_UP].getLastPiece().setBar(false);
                _aTriangle[iCell].addPiece(_aBar[BAR_UP].removePiece());
            }else{
                _aBar[BAR_DOWN].getLastPiece().setBar(false);
                _aTriangle[iCell].addPiece(_aBar[BAR_DOWN].removePiece());
            }
        }
        if (!bFinalMove){
            _oCurrentPiece.setTriangle(iCell);
        }
   };
   
   this.afterMove = function(){
       _bPieceMoving = false;
       
       _oParent.checkGameOver();
       if (_iPlayerDice>0){
           if (_oParent.checkAvaiableMove()===true){
                _oParent.updateInput();
                if (!s_b2Players&&!_bTurnPlayer1){
                    _oParent.cpuThinkBeforeChoice();
                }
           }else{
               _oAlertBox.show(TEXT_NO_MOVES_AVAILABLE);
               playSound("negative_beep",1,false);
               _oWhiteDices.fadeOutTween();
               _oRedDices.fadeOutTween();
               _iPlayerDice = 0;
               _bDoubleDice = false;
               _bDice1 = false;
               _bDice2 = false;
               _oParent.changeTurn();
               if (s_b2Players||_bTurnPlayer1){
                    _oInterface.setVisibleButDice(true);
               }else{
                   _bCpuTurned = false;
               }
               _oParent.updateInput();
           }
       }else{
           _bDoubleDice = false;
           _oWhiteDices.fadeOutTween();
           _oParent.checkGameOver();
           _oParent.changeTurn();
           if (s_b2Players||_bTurnPlayer1){
                _oInterface.setVisibleButDice(true);
           }else{
               _bCpuTurned = false;
           }
           _oParent.updateInput();
       }
       
   };
   
   this.changeTurn = function(){
      if (_bTurnPlayer1){
          _bTurnPlayer1 = false;
      } else{
          _bTurnPlayer1 = true;
      }
      _oInterface.onFocusTurn(_bTurnPlayer1);
   };
   
   this.rollDice = function(){
            _oWhiteDices.fadeOutTween();
            _oRedDices.fadeOutTween();
            if (_bTurnPlayer1){
                 _oWhiteDices.show();
            }else{
                if (_bStartGame){
                _oRedDices.show();
                }
            }
            _oInterface.setVisibleButDice(false);
       };
   
   this.afterRollDice = function(){
        if (_bTurnPlayer1){
            _iDice1 = _oWhiteDices.returnDiceResult1();
            _iDice2 = _oWhiteDices.returnDiceResult2();
        }else{
            _iDice1 = _oRedDices.returnDiceResult1();
            _iDice2 = _oRedDices.returnDiceResult2();
        }
        _bDice1 = true;
        _bDice2 = true;
        if (_iDice1!==_iDice2){
            _iPlayerDice = 2;
        }else{
            _iPlayerDice = 4;
            _oAlertBox.show(TEXT_DOUBLE_DICES);
            playSound("positive_beep",1,false);
            _bDoubleDice = true;
        }
      
        _aRuleToCheck = _oRuleFilter.checkMovesAvailable(_bTurnPlayer1);
      
        if (_oParent.checkAvaiableMove()===false){
            _bDice1 = false;
            _bDice2 = false;
            _bDoubleDice = false;
            _iPlayerDice = 0;
            _oParent.changeTurn();
            _oParent.updateInput();
            if (!s_b2Players&&_bTurnPlayer1){
                _oInterface.setVisibleButDice(true);
            }
            if (!s_b2Players&&!_bTurnPlayer1){
                _oInterface.setVisibleButDice(false);
                setTimeout(_oParent.rollDice,1000);
            }
            if (s_b2Players){
                _oInterface.setVisibleButDice(true);
            }
            _oAlertBox.show(TEXT_NO_MOVES_AVAILABLE);
            playSound("negative_beep",1,false);
        }else{
            _oInterface.setVisibleButDice(false);
            if (!s_b2Players&&_bTurnPlayer1===false){
                new createjs.Tween.get(_oParent).to({},1500).call(_oParent.cpuThinkBeforeChoice);
            }
        } 
   };
    
    this.debug = function(){
        for (var i=0;i<_aTriangle.length;i++){
            if (_aTriangle[i].getNumPieces()>0){
                _aTriangle[i].getLastPiece().unloadListeners();
            }
        }
    };
    
    this.unload = function(){
        _bStartGame = false;
        
        _oInterface.unload();
        if(_oEndPanel !== null){
            _oEndPanel.unload();
        }
        
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();

           
    };
 
    this.onExit = function(){
        $(s_oMain).trigger("end_session");
        
        s_oGame.unload();
        s_oMain.gotoMenu();
    };
    
    this.gameOver = function(iWinner){
        _oEndPanel = new CEndPanel(s_oSpriteLibrary.getSprite('msg_box'),iWinner);
        var iNumPieces = 0;
        for (var i=0;i<_aTriangle.length;i++){
            iNumPieces +=_aTriangle[i].getNumPieces();
        }
        for (var i=0;i<_aBar.length;i++){
            iNumPieces += _aBar[i].getNumPieces();
        }
        _iScore = iNumPieces * MULTIPLIER_SCORE;
        _oEndPanel.show(_iScore,iWinner);
    };
    
    this.checkGameOver = function(){
        var aPieces;
        var iWhitePieces = 0;
        var iBlackPieces = 0;
        
       for (var i=0;i<_aTriangle.length;i++){
           aPieces = _aTriangle[i].getArrayPieces();
           for (var j=0;j<aPieces.length;j++){
               if (aPieces[j].getColor()===WHITE_PIECE){
                   iWhitePieces++;
               }else{
                   iBlackPieces++;
               }
           }
           iWhitePieces+=_aBar[BAR_UP].getNumPieces();
           iBlackPieces+=_aBar[BAR_DOWN].getNumPieces();
       }
       
       if (iWhitePieces===0){
           _bStartGame = false;
           this.gameOver(0);
       }else if (iBlackPieces===0){
           _bStartGame = false;
           this.gameOver(1);
       }
        
        
    };
    
    
    this.cpuThinkBeforeChoice = function () {
        
        _oThinking = new CThinking();
        var iTimeThink = randomIntBetween(MIN_TIME_THINK,MAX_TIME_THINK);
        setTimeout(function(){ _oThinking.unload(); _oThinking = null; _oParent.cpuChoicePiece();},iTimeThink);
        
    };


    this.cpuChoicePiece = function(){
        
        var oPiece;
        var aMoves;
        var aPossibleChoices = new Array();
        var iPointsChoice = 0;
        

        if (_aBar[BAR_DOWN].getNumPieces() > 0) {
            oPiece = _aBar[BAR_DOWN].getLastPiece();
            aMoves = _oParent.isPossibleMove(oPiece);

            if (aMoves) {
                for (var i = 0; i < aMoves.length - 1; i++) {
                    for (var j = 0; j < aMoves[i].length; j++) {
                        iPointsChoice = 0;

                        if (_aTriangle[aMoves[i][j].iFocusTriangle].getNumPieces() === 1 && _aTriangle[aMoves[i][j].iFocusTriangle].getColor() === BLACK_PIECE) {
                            iPointsChoice++;
                        }
                        if (aMoves[i][j].iFocusTriangle < 13) {
                            iPointsChoice++;
                        }
                        if (aMoves[i][j].iFocusTriangle > 13 && _aTriangle[aMoves[i][j].iFocusTriangle].getNumPieces() === 1) {
                            iPointsChoice++;
                        }
                        if (aMoves[i][j].iFocusTriangle < 13 && _aTriangle[aMoves[i][j].iFocusTriangle].getNumPieces() === 1) {
                            iPointsChoice--;
                        }
                        if (_aTriangle[aMoves[i][j].iFocusTriangle].getNumPieces() === 1 && aMoves[i][j].iFocusTriangle < 13) {
                            iPointsChoice++;
                        }
                        aPossibleChoices.push({oMove: aMoves[i][j], iPoints: iPointsChoice, oCurrentPiece: oPiece});
                    }
                }
            }
        } else {

            for (var i = 0; i < _aTriangle.length; i++) {
                if (_aTriangle[i].getNumPieces() > 0) {
                    oPiece = _aTriangle[i].getLastPiece();
                    if (oPiece.getColor() === BLACK_PIECE && oPiece.getStateListener()) {
                        aMoves = _oParent.isPossibleMove(oPiece);
                        if (aMoves) {
                            for (var k = 0; k < aMoves.length - 1; k++) {
                                for (var j = 0; j < aMoves[k].length; j++) {
                                    iPointsChoice = 0;

                                    if (_aTriangle[oPiece.getTriangle()].getNumPieces() < 3) {
                                        iPointsChoice-=3;
                                    }
                                    if (_aTriangle[aMoves[k][j].iFocusTriangle].getNumPieces() === 1 && _aTriangle[aMoves[k][j].iFocusTriangle].getColor() === BLACK_PIECE) {
                                        iPointsChoice+=3;
                                    }
                                    if (_aTriangle[aMoves[k][j].iFocusTriangle].getNumPieces() === 1 && _aTriangle[aMoves[k][j].iFocusTriangle].getColor() === WHITE_PIECE) {
                                        iPointsChoice+=5;
                                    }
                                    if (aMoves[k][j].iFocusTriangle < 13) {
                                        iPointsChoice++;
                                    }
                                    if (aMoves[k][j].iFocusTriangle > 13) {
                                        iPointsChoice--;
                                    }
                                    if (aMoves[k][j].iFocusTriangle > 11 && _aTriangle[aMoves[k][j].iFocusTriangle].getNumPieces() === 1&&_aTriangle[aMoves[k][j].iFocusTriangle].getColor()===WHITE_PIECE) {
                                        iPointsChoice+=4;
                                    }
                                    if (aMoves[k][j].iFocusTriangle < 11 && _aTriangle[aMoves[k][j].iFocusTriangle].getNumPieces() === 1&&_aTriangle[aMoves[k][j].iFocusTriangle].getColor()===WHITE_PIECE) {
                                        iPointsChoice--;
                                    }
                                    if (_aTriangle[oPiece.getTriangle()].getNumPieces() === 1) {
                                        iPointsChoice++;
                                    }
                                    if (_aTriangle[aMoves[k][j].iFocusTriangle].getNumPieces() === 1 && aMoves[k][j].iFocusTriangle < 13) {
                                        iPointsChoice++;
                                    }
                                    if (oPiece.getTriangle()>5&&aMoves[k][j].iFocusTriangle<=5){
                                        iPointsChoice+=5;
                                    }
                                    if (oPiece.getTriangle()<=5&&_aTriangle[oPiece.getTriangle()].getNumPieces()<3){
                                        iPointsChoice-=10;
                                    }
                                    if (aMoves[k][j].iFocusTriangle<6&&_aTriangle[aMoves[k][j].iFocusTriangle].getNumPieces()===0){
                                        iPointsChoice-=5;
                                    }
                                    
                                    if (oPiece.getTriangle()<=5){
                                        iPointsChoice -=4;
                                    }
                                    
                                    aPossibleChoices.push({oMove: aMoves[k][j], iPoints: iPointsChoice, oCurrentPiece: oPiece});
                                }
                            }
                                for (var j=0;j<aMoves[3].length;j++){
                                    aPossibleChoices.push({oMove: aMoves[3][j], iPoints: 50, oCurrentPiece: oPiece});
                                }
                        }

                    }

                }
            }
        };

        aPossibleChoices.sort(function (a, b) {
            return parseFloat(b.iPoints) - parseFloat(a.iPoints);
        });

        aPossibleChoices = this.cpuRemoveNotAllowedMoves(aPossibleChoices);

        _oCurrentPiece = aPossibleChoices[0].oCurrentPiece;
        _oCurrentPiece.setOnTop();
        _oParent.onClickedTriangle(aPossibleChoices[0].oMove);


    };
    
    this.cpuRemoveNotAllowedMoves = function(aPossibleChoices){
        ////REMOVE NOT ALLOWED MOVES
        var aFilteredList = new Array();

        for(var i=0; i<aPossibleChoices.length; i++){
            var iTriangleSource = aPossibleChoices[i].oCurrentPiece.getTriangle();
            var oMove = aPossibleChoices[i].oMove;
            var szBrokenRule = _oRuleFilter.checkForbiddenMoveInList(oMove, iTriangleSource, _aRuleToCheck);

            if(szBrokenRule === RULE_BROKEN_NONE){
                aFilteredList.push(aPossibleChoices[i]);
            }
        };

        return aFilteredList;
    };
    
    this.update = function(){
        if (_oThinking!==null){
            _oThinking.update();
        }
    };

    this.getTriangles = function(){
        return _aTriangle;
    };

    this.getBars = function(){
        return _aBar;
    };

    this.getDiceResult = function(){
        return {dice1: _iDice1, dice2: _iDice2};
    };

    s_oGame=this;
    
    _oParent=this;
    this._init();
}

var s_oGame;
