function CRuleFilter(){
    var _iWhiteBarIndexInfo;
    var _iBlackBarIndexInfo;
    var _aDiceValue;
    
    this._init = function(){
        _iWhiteBarIndexInfo = 24;
        _iBlackBarIndexInfo = 25;
    };
    
    this.checkMovesAvailable = function(bPlayer1){
        var iPlayer = bPlayer1 ? WHITE_PIECE : BLACK_PIECE;
        
        var aBoard = this.getCurBoardStatus();
        //console.log(aBoard)
        
        _aDiceValue = new Array();
        var oDices = this.getDiceState();
        _aDiceValue[0] = oDices.dice1;
        _aDiceValue[1] = oDices.dice2;
        
        var aMoveListAvailable = new Array();
        
        if(_aDiceValue[0] === _aDiceValue[1]){
            ///-CHECK THE DOUBLE RULE OF MOST - SIMULATE 4 DICE - THIS IS A RARE CASE, AND HARD TO EXPLAIN TO PLAYERS, KEEP IT FOR THE FUTURE
            return aMoveListAvailable;
        }else {
            ///-CHECK AVAILABILITY OF MOVES WITH DICE 0 AND 1
            var aCurPlayerMovesListPerDice = new Array();
            for(var i=0; i<_aDiceValue.length; i++){
                aCurPlayerMovesListPerDice[i] = this._getMovesList(iPlayer, aBoard, _aDiceValue[i]);
                aCurPlayerMovesListPerDice[i] = this._removeAllMovesByType(MOVES_TYPE_COLLISION, aCurPlayerMovesListPerDice[i]);
            }
            ///-ALWAYS CHECK BOTH DICE WITH _checkRulePlayBothDice AND/OR _checkRuleHigherDiceValue

            //CHECK ALL MOVES, TO CHECK IF I CAN PLAY BOTH DICE. IF THERE IS AT LAST 1 MOVES THAT ALLOW ME TO PLAY BOTH THEN MARK ALL OTHER AS FORBIDDEN
            aCurPlayerMovesListPerDice = this._checkRulePlayBothDice(aCurPlayerMovesListPerDice, aBoard);

            //THEN IF CAN'T PLAY BOTH DICE
            var iNumAllowedMoves = this._countAllowedMoves(aCurPlayerMovesListPerDice[0]);
            iNumAllowedMoves += this._countAllowedMoves(aCurPlayerMovesListPerDice[1]);
            if(iNumAllowedMoves === 0){
                //RESET ALL RULE, AND CHECK WITH HIGHER RULE
                this._resetAllRule(aCurPlayerMovesListPerDice[0]);
                this._resetAllRule(aCurPlayerMovesListPerDice[1]);

                aCurPlayerMovesListPerDice = this._checkRuleHigherDiceValue(aCurPlayerMovesListPerDice, aBoard);
            }
            //FOR HIGHER VALUE RULE, I JUST NEED TO MOVE WITH THE MINOR DICE AND AFTER JUST CHECK ALL MOVES WITH THE MAJOR DICE
            //IF I CAN'T MOVE WITH THE MAJOR, THEN THE MOVE WITH THE MINOR HAS BROKEN THE RULE
            //this._checkRuleHigherDiceValue(iPlayer, _aDiceValue, aCurPlayerMovesList, aBoard); 
        }
        
        aMoveListAvailable = aCurPlayerMovesListPerDice[0].concat(aCurPlayerMovesListPerDice[1]);
        aMoveListAvailable.sort((a,b) => (a.src > b.src) ? 1 : ((b.src > a.src) ? -1 : 0)); 
        
        //SAFETY CHECK. IF THE FILTER RETURN ONLY FORBIDDEN MOVES, THEN DELETE AND CONTINUE THE GAME NORMALLY
        var iNumBrokenRules = 0;
        for(var i=0; i<aMoveListAvailable.length; i++){
            if(aMoveListAvailable[i].brokenrule !== RULE_BROKEN_NONE){
                iNumBrokenRules++;
            }
        }
        if(iNumBrokenRules === aMoveListAvailable.length){
            aMoveListAvailable = new Array();
        }
        
        //console.log("aMoveListAvailable")
        //console.log(aMoveListAvailable)
        
        return aMoveListAvailable;
    };
    
    this.reset = function(){
        
    };
    
    this._checkRulePlayBothDice = function(aCurPlayerMovesListPerDice, aBoard){
        //you must play both numbers of a roll if possible.
        for(var i=0; i<aCurPlayerMovesListPerDice.length; i++){
            var aListMoves = aCurPlayerMovesListPerDice[i];
            var iOtherDiceIndex = +!i;
            var iOtherDiceValue = _aDiceValue[iOtherDiceIndex];

            for(var j=0; j<aListMoves.length; j++){
                var oMove = aListMoves[j];
                this._checkTheMoveAndMark(oMove, aBoard, iOtherDiceValue, RULE_BROKEN_BOTH_DICE);
            }
        }
        
        return aCurPlayerMovesListPerDice;
    };
    
    this._checkRuleHigherDiceValue = function(aCurPlayerMovesListPerDice, aBoard){
        //If you can play one number but not both, then you must play the higher one. 
        
        //concerning the high value rule:
        var iMinorValueIndex = _aDiceValue[0] < _aDiceValue[1] ? 0 : 1;
        var iMajorValueIndex = _aDiceValue[0] > _aDiceValue[1] ? 0 : 1;
        
        var iMajorDiceValue = _aDiceValue[iMajorValueIndex];
        
        var aListMovesWithLessNumber = aCurPlayerMovesListPerDice[iMinorValueIndex];
        
        for(var i=0; i<aListMovesWithLessNumber.length; i++){
            var oMove = aListMovesWithLessNumber[i];
            
            this._checkTheMoveAndMark(oMove, aBoard, iMajorDiceValue, RULE_BROKEN_HIGHER_DICE);
        }

        //at this point, the function return me all the moves i can do and i can't do if i don't want break this rule. Inform the player
        //the moves of the major number (D2) should be marked always true if do not break the play both dice rule
        
        return aCurPlayerMovesListPerDice;
        
    };
   
    this._checkRuleDoubleDicePlayMost = function(){
        //In the case of doubles, when all four numbers cannot be played, the player must play as many numbers as he can. 
        
        //for game clarity avoid this rule.
    };
    
    this._checkTheMoveAndMark = function(oMove, aBoard, iDiceValue, szRuleToMark){
        var iPlayer = aBoard[oMove.src].color;

        //make a move with dice (D1) from the list of all moves. 
        var aCopiedBoard = this.getABoardCopy(aBoard);        
        this._doMove(oMove, aCopiedBoard);

        //For each move, check every move i can do with the other dice (D2)

        var aMovesList = this._getMovesList(iPlayer, aCopiedBoard, iDiceValue);
        aMovesList = this._removeAllMovesByType(MOVES_TYPE_COLLISION, aMovesList);

        if(aMovesList.length > 0){
            //if there is at last 1 move (D2), then mark the move in the list (D1) like allowed
            oMove.brokenrule = RULE_BROKEN_NONE;
        }else{
            //if not, then mark the move in the list (D1) like forbidden (not allowed)
            oMove.brokenrule = szRuleToMark;
        }
    };

    this._doMove = function(oMove, aBoard){
        var iTriangleSource = oMove.src;
        var iTriangleDestination = oMove.dst;
        
        var iColor = aBoard[iTriangleSource].color;
        
        aBoard[iTriangleSource].numpieces--;
        if(aBoard[iTriangleSource].numpieces === 0){
            aBoard[iTriangleSource].color = null;
        }
        
        switch(oMove.type){
            case MOVES_TYPE_HIT:{
                    aBoard[iTriangleDestination].color = iColor;
                    aBoard[iTriangleDestination].numpieces = 1;
                    break
            }
            case MOVES_TYPE_BEAR:{
                    //DONOTHING
                    break
            }
            case MOVES_TYPE_EXTRABEAR:{
                    //DONOTHING
                    break
            }
            default: {
                    aBoard[iTriangleDestination].color = iColor;
                    aBoard[iTriangleDestination].numpieces++;
                    break;
            }
        }        
    };
   
    
    /////////////UTILS
    this.getCurBoardStatus = function(){
        var aTriangles = s_oGame.getTriangles();
        
        
        var aBoard = new Array();
        
        
        
        for(var i=0; i<aTriangles.length; i++){
            var iColor = aTriangles[i].getColor();
            var iNumPieces = aTriangles[i].getNumPieces();
            aBoard[i] = {color: iColor, numpieces: iNumPieces};
        }
        
        aBoard[_iWhiteBarIndexInfo] = this.getPlayersPieceListOnBar(WHITE_PIECE);
        aBoard[_iBlackBarIndexInfo] = this.getPlayersPieceListOnBar(BLACK_PIECE);
        
        return aBoard;
    };
    
    this.getABoardCopy = function(aBoard){   
        var aCopiedBoard = JSON.parse(JSON.stringify(aBoard))

        return aCopiedBoard;
    };
    
    this.getPlayersPieceListPos = function(iPlayer, aBoard){
        var aPlayerPiecePos = new Array();
        for(var i=0; i<aBoard.length; i++){
            if(aBoard[i].color === iPlayer){
                aPlayerPiecePos.push(i);
            }
        }

        return aPlayerPiecePos;
    };
    
    this.getPlayersPieceListOnBar = function(iPlayer){
        var aBars = s_oGame.getBars();
        var oInfo;
        var iColor = null;
        if(iPlayer===WHITE_PIECE){
            var iNumPiece = aBars[BAR_UP].getNumPieces();
            if(iNumPiece>0){
                iColor = WHITE_PIECE;
            }
        }else {
            var iNumPiece = aBars[BAR_DOWN].getNumPieces();
            if(iNumPiece>0){
                iColor = BLACK_PIECE;
            }
        }

        oInfo = { color: iColor, numpieces: iNumPiece };
        
        return oInfo;
    };
    
    this.checkAndSetOnlyPieceFromBar = function(aPlayerPiecePos){
        var aNewList = aPlayerPiecePos;
        var iIndex = aPlayerPiecePos.indexOf(_iWhiteBarIndexInfo);
        if( iIndex !== -1 ){
            aNewList = new Array();
            aNewList.push(aPlayerPiecePos[iIndex]);
        }
        var iIndex = aPlayerPiecePos.indexOf(_iBlackBarIndexInfo);
        if( iIndex !== -1 ){
            aNewList = new Array();
            aNewList.push(aPlayerPiecePos[iIndex]);
        }
        return aNewList;
    };
    
    this._getMovesList = function(iPlayer, aBoard, iDiceValue){
        ///I JUST NEED TO CHECK 1 PIECE PER TRIANGLE
        var aPlayerPiecePos = this.getPlayersPieceListPos(iPlayer, aBoard);
        aPlayerPiecePos = this.checkAndSetOnlyPieceFromBar(aPlayerPiecePos);
        
        var bBearable = this.playerCanBear(iPlayer, aPlayerPiecePos);
        var iDirection = iPlayer === WHITE_PIECE ? 1 : -1;

        var aListMoves = new Array();
        for(var i=0; i<aPlayerPiecePos.length; i++){
            var iTriangleSource = aPlayerPiecePos[i];// < 
            var iStartPos = aPlayerPiecePos[i] < _iWhiteBarIndexInfo ? iTriangleSource : (iPlayer === WHITE_PIECE ? -1 : 24 );
            var iTriangleDestination = iStartPos +iDirection*iDiceValue;
            
            //console.log("iTriangleSource:"+iTriangleSource +"--> iTriangleDestination:"+iTriangleDestination);
            
            var szMoveType = this.getMovesType(aBoard, iTriangleDestination, iTriangleSource, bBearable);
            
            aListMoves.push( {src: iTriangleSource, dst: iTriangleDestination, type: szMoveType, brokenrule: RULE_BROKEN_NONE} );            
        }
        
        ///IF I CAN BEAR OFF, CHECK FOR FURTHER, NOT PRECISE, BEAR OFF WITH A DICE VALUE
        var iSource = this._checkExtraBearMoves(iPlayer, aPlayerPiecePos, iDiceValue, bBearable); 
        var iDest = iPlayer === WHITE_PIECE ? 24 : -1;
        if(iSource !== null){
            aListMoves.push( {src: iSource, dst: iDest, type: MOVES_TYPE_EXTRABEAR, brokenrule: RULE_BROKEN_NONE} );
        }
        
        return aListMoves;
    }; 
    
    this.getMovesType = function(aBoard, iTriangleDestination, iTriangleSource, bBearable){
        var iCurPlayer = aBoard[iTriangleSource].color;
        var iHomeBase = iCurPlayer === WHITE_PIECE ? 24 : -1;
        
        var szMoveType;
        if(iTriangleDestination >= 24 || iTriangleDestination < 0){
            if(iTriangleDestination === iHomeBase && bBearable){
                ///PRECISE BEAR OFF
                szMoveType = MOVES_TYPE_BEAR;
            }else {
                szMoveType = MOVES_TYPE_COLLISION;
            }
        }else {
            var oTriangleInfo = aBoard[iTriangleDestination];
            if(oTriangleInfo.color === iCurPlayer){
                szMoveType = MOVES_TYPE_ADD;
            }else if(oTriangleInfo.color === null){
                szMoveType = MOVES_TYPE_FILL;
            }else {
                if(oTriangleInfo.numpieces === 1){
                    szMoveType = MOVES_TYPE_HIT;
                }else{
                    szMoveType = MOVES_TYPE_COLLISION;
                }
            }
        }

        return szMoveType;
    };
    
    this._checkExtraBearMoves = function(iPlayer, aPlayerPiecePos, iDiceValue, bBearable){
        //console.log("_checkFurtherBearMoves");
        //console.log(aPlayerPiecePos);
        var iHomeBase = iPlayer === WHITE_PIECE ? 24 : -1;
        var iSource = null;
        
        if(bBearable){
            //CHECK BEAR OFF 
            var iValueToGetBearOff;
            if(iPlayer === WHITE_PIECE){
                var iRefPiecePos = Math.min(...aPlayerPiecePos);
                iValueToGetBearOff = iHomeBase - iRefPiecePos;   
            }else {
                var iRefPiecePos = Math.max(...aPlayerPiecePos);
                iValueToGetBearOff = -(iHomeBase - iRefPiecePos);
            }
            
            if(iDiceValue > iValueToGetBearOff){
                iSource = iRefPiecePos;
            }
        }

        return iSource;
    };
    
    this.playerCanBear = function(iCurPlayer, aPlayerPiecePos){
        
        if(iCurPlayer === WHITE_PIECE){
            for(var i=0; i<aPlayerPiecePos.length; i++){
                if(aPlayerPiecePos[i] < 18 || aPlayerPiecePos[i] === _iWhiteBarIndexInfo ){
                    return false;
                }
            }
        }else{
            for(var i=0; i<aPlayerPiecePos.length; i++){
                if(aPlayerPiecePos[i] > 5 || aPlayerPiecePos[i] === _iBlackBarIndexInfo ){
                    return false;
                }
            }
        }
        
        return true;
    };

    this._removeAllMovesByType = function(szType, aListMoves){
        aListMoves = aListMoves.filter(function( obj ) {
            return obj.type !== szType;
        });
        
        return aListMoves;
    };
    
    this.checkForbiddenMoveInList = function(aPossibleMove, iTriangleSource, aListMove){
        var iTriangleDestination = aPossibleMove.iFocusTriangle;
        
        var szForbiddenMove;
        var oMove = this._findMoveBySource(aListMove, iTriangleSource, iTriangleDestination);
        if(oMove === null || oMove.brokenrule === RULE_BROKEN_NONE){
            szForbiddenMove = RULE_BROKEN_NONE;
        }else {
            szForbiddenMove = oMove.brokenrule;
        }
        
        return szForbiddenMove;
    };
    
    this._findMoveBySource = function(aListMove, iTriangleSource, iTriangleDestination){
        if(iTriangleSource === -1){
            iTriangleSource = _iWhiteBarIndexInfo;
        }else if(iTriangleSource === 24){
            iTriangleSource = _iBlackBarIndexInfo;
        }
        
        var oMoveFound = null;
        for(var i=0; i<aListMove.length; i++){
            var oMove = aListMove[i];
            if(oMove.src === iTriangleSource && oMove.dst === iTriangleDestination){
                oMoveFound = oMove;
            }
        }
    
        return oMoveFound;
    };
    
    this._resetAllRule = function(aListMoves){
        for(var i=0; i<aListMoves.length; i++){  
            aListMoves[i].brokenrule = RULE_BROKEN_NONE;
        }
    };
    
    this._countAllowedMoves = function(aListMoves){
        var iCont = 0;
        for(var i=0; i<aListMoves.length; i++){
            var szBrokenRule = aListMoves[i].brokenrule;
            if(szBrokenRule === RULE_BROKEN_NONE){
                iCont++;
            }
        }
        
        return iCont;
    };
    
    this.getDiceState = function(){
        var oDiceResult = s_oGame.getDiceResult();
        
        return oDiceResult;
    };
    
    this.getOtherColor = function(iColor){
        if(iColor === BLACK_PIECE){
            iColor = WHITE_PIECE;
        }else {
            iColor = BLACK_PIECE;
        }
        
        return iColor;
    };
    ////////////////
    
    this._init();
}

