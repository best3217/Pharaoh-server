var CANVAS_WIDTH = 1360;
var CANVAS_HEIGHT = 840;

var EDGEBOARD_X = 120;
var EDGEBOARD_Y = 122;

var PRIMARY_FONT = "flashrogersstraight";

var FPS           = 30;
var FPS_TIME      = 1000/FPS;
var DISABLE_SOUND_MOBILE = false;


var s_b2Players;

var NUM_PIECES = 15;

var BLACK_PIECE = 0;
var WHITE_PIECE = 1;
var TRIANGLE_UP = +1;
var TRIANGLE_DOWN = -1;
var BAR_UP = 0;
var BAR_DOWN = 1;
var NUM_TRIANGLES = 24;

var FINAL_CELL_WHITE = 24;
var FINAL_CELL_BLACK = -1;

var WHITE_DICES = 0;
var RED_DICES = 1;

var X_TRIANGLE_LEFT = 290;
var X_TRIANGLE_RIGHT = 759; 
var Y_TRIANGLE_UP = 128;
var Y_TRIANGLE_DOWN = 712;
var X_OFFBOARD = 1155;
var Y_OFFBOARD_DOWN = 458;
var Y_OFFBOARD_UP = 143;
var X_INTERFACE_PLAYER = 180;
var Y_INTERFACE_PLAYER_1 = 133;
var Y_INTERFACE_PLAYER_2 = 449;
var X_INTERFACE_PLAYER_END = CANVAS_WIDTH-230;

var TIME_LOOP_WAIT = 1000;
var MIN_TIME_THINK = 700;
var MAX_TIME_THINK = 2300;
var MS_DISTRIBUTION;

var CELL_0 = 0;
var CELL_1 = 1;
var CELL_2 = 2;
var CELL_3 = 3;
var CELL_4 = 4;
var CELL_5 = 5;
var CELL_6 = 6;
var CELL_7 = 7;
var CELL_8 = 8;
var CELL_9 = 9;
var CELL_10 = 10;
var CELL_11 = 11;
var CELL_12 = 12;
var CELL_13 = 13;
var CELL_14 = 14;
var CELL_15 = 15;
var CELL_16 = 16;
var CELL_17 = 17;
var CELL_18 = 18;
var CELL_19 = 19;
var CELL_20 = 20;
var CELL_21 = 21;
var CELL_22 = 22;
var CELL_23 = 23;

var MULTIPLIER_SCORE;

var STATE_LOADING = 0;
var STATE_MENU    = 1;
var STATE_HELP    = 1;
var STATE_GAME    = 3;
var STATE_LEVEL_SELECTION = 4;

var ON_MOUSE_DOWN  = 0;
var ON_MOUSE_UP    = 1;
var ON_MOUSE_OVER  = 2;
var ON_MOUSE_OUT   = 3;
var ON_DRAG_START  = 4;
var ON_DRAG_END    = 5;

var MOVES_TYPE_FILL = "fill";
var MOVES_TYPE_ADD = "add";
var MOVES_TYPE_HIT = "hit";
var MOVES_TYPE_BEAR = "bear";
var MOVES_TYPE_EXTRABEAR = "extrabear";
var MOVES_TYPE_COLLISION = "collision";

var RULE_BROKEN_NONE = "none";
var RULE_BROKEN_HIGHER_DICE = "higher";
var RULE_BROKEN_BOTH_DICE = "bothdice";
var RULE_BROKEN_MOST_DICE = "most";

var SOUNDTRACK_VOLUME_IN_GAME = 1;
var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;