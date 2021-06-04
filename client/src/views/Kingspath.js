import { Fragment, useEffect, useState } from 'react'
import * as PIXI from 'pixi.js'
import { TimelineLite, Power0, TweenLite } from "gsap"
import { DropShadowFilter } from '@pixi/filter-drop-shadow'
import jwtDefaultConfig from '../@core/auth/jwt/jwtDefaultConfig'
import StationModal from '../component/StationModel'

const inintoverviewData = {current:{level:"1", missions:[]}, friends:[], wheel:null, config:{wheel:{sequence:{repeat_level:2, parity:"odd"}}}}

const Kingspath = () => {
  const [state, setstate] = useState({
    counter: "",
    missions: [],
    isWheelActive: false,
    expired: false,
    canvas: null,
    destroyApp: false,
    unsubscribeEvents: [],
    testGoRight: false,
    testShowOvertake: false,
    overviewData: inintoverviewData,
    intervalId: null,
    currentFriendsData: null
  })
  const [IsOpenModal, setIsOpenModal] = useState(false)

  useEffect(() => {
  /*eslint-disable */
    const pixiContainer = document.getElementById("pixi-container");
      if (!pixiContainer) {
        console.log("no container. close");
        return;
      }

      const this_canvas = pixiContainer.getElementsByTagName("canvas")[0];
      if (this_canvas) {
        console.log("map already created. close");
        return;
      }

      PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

      //globals
      const maxKingspathLevel = 100;
      let xPositonLastIcon = 0;
      let fetching = true;
      let api_current_Kingspath;
      let currentKingspathLevel = 1;
      let missions=[
        {
           "id": 43618,
           "user_id": 16516,
           "mission_id": 9,
           "game_id": 67,
           "modifier_id": 1,
           "value": 0,
           "target": 3200000,
           "status": "ACTIVE",
           "timeout_at": "2021-04-30T10:36:13.000000Z",
           "created_at": "2021-04-27T10:36:14.000000Z",
           "progress": {
              "value": 0,
              "target": 3200000,
              "percentage": 50
           },
           "difficulty": "NORMAL",
           "game_details": {
              "id": 67,
              "title": "Coins of Egypt",
              "thumbnail": "http://h2931731.stratoserver.net/game-6.jpg"
           },
           "mission": {
              "id": 9,
              "level": 3,
              "type": "WIN_TOTAL",
              "value": 4000000,
              "game_id": null,
              "created_at": "2021-01-05T11:57:47.000000Z"
           }
        }
     ]
      let wheel;
      let friends;
      let is_active_mission;
      let is_active_wheel;
      let icon_arr = [];
      let path_arr = [];
      let bg_arr = [];
      let cached = false;
      let friends_arr = [];
      const space = 300; 
      const beginAt = 650; 
      let currentPosition = 0;
      const mapScrollMoveSpeed = 80;
      let wheel_sequence = 10;
      let activeMoveMap = false;
      let overtakeTestBegin_x;
      let overtakeTestBegin_y;
      let overtakeTarget_x;
      let overtakeTarget_y;
      let currentMapPosition;
      let last_icon_position_x;
      let last_icon_position_y;
      let parchment_timer;
      let lights = [];
      let timelinePuls;

      //Sprites
      let map_bg;
      let parchment, parchment_headline, parchment_text;

      const url_map_side = `${jwtDefaultConfig.Domain}/path/kleinekrone-kp-scrolls-sides.png`
      const url_map_side_arrow = `${jwtDefaultConfig.Domain}/path/left.png`
      const url_map_bg = `${jwtDefaultConfig.Domain}/path/kleinekrone-kp-main-bg-web.png`
      const url_land_begin = `${jwtDefaultConfig.Domain}/path/element-24-6-x@3x.png`
      const url_fels1 = `${jwtDefaultConfig.Domain}/path/element-25-6-x@3x.png`
      const url_baum4 = `${jwtDefaultConfig.Domain}/path/element-26-6-x@3x.png`
      const url_baum5 = `${jwtDefaultConfig.Domain}/path/element-27-6-x@3x.png`
      const url_baum7 = `${jwtDefaultConfig.Domain}/path/element-28-6-x@3x.png`
      const url_building1 = `${jwtDefaultConfig.Domain}/path/element-29-6-x@3x.png`
      const url_baum3 = `${jwtDefaultConfig.Domain}/path/element-30-6-x@3x.png`
      const url_baum1 = `${jwtDefaultConfig.Domain}/path/element-31-6-x@3x.png`
      const url_building4 = `${jwtDefaultConfig.Domain}/path/element-32-6-x@3x.png`
      const url_building3 = `${jwtDefaultConfig.Domain}/path/element-33-6-x@3x.png`
      const url_baum2 = `${jwtDefaultConfig.Domain}/path/element-34-6-x@3x.png`
      const url_baum6 = `${jwtDefaultConfig.Domain}/path/element-35-6-x@3x.png`
      const url_fels2 = `${jwtDefaultConfig.Domain}/path/element-36-6-x@3x.png`
      const url_fels3 = `${jwtDefaultConfig.Domain}/path/element-37-6-x@3x.png`
      const url_fels4 = `${jwtDefaultConfig.Domain}/path/element-38-6-x@3x.png`
      const url_building2 = `${jwtDefaultConfig.Domain}/path/element-39-6-x@3x.png`
      const url_progress_bar = `${jwtDefaultConfig.Domain}/path/kleinekrone-kingspath-ic-slotstation-progress-outer.png`
      const url_icon_past = `${jwtDefaultConfig.Domain}/path/kleinekrone-kingspath-ic-lvl-complete@2x.png`
      const url_icon_future = `${jwtDefaultConfig.Domain}/path/kleinekrone-kingspath-ic-lvl-locked@2x.png`
      const url_icon_wheel_locked = `${jwtDefaultConfig.Domain}/path/kleinekrone-kingspath-ic-wheel-locked@2x.png`
      const url_icon_wheel_open = `${jwtDefaultConfig.Domain}/path/kleinekrone-kingspath-ic-wheel-unlocked@2x.png`
      const url_icon_choose_mission = `${jwtDefaultConfig.Domain}/path/kleinekrone-kingspath-ic-ownstate-and-cards-main-back@2x.png`
      const url_icon_active_mission = `${jwtDefaultConfig.Domain}/path/kleinekrone-kingspath-ic-slotstation-mainframe@2x.png`
      const url_button_position = `${jwtDefaultConfig.Domain}/path/btn-own-position-out.png`
      const url_button_position_hover = `${jwtDefaultConfig.Domain}/path/btn-own-position-hover.png`
      const url_headline = `${jwtDefaultConfig.Domain}/path/kleinekrone-kp-hl-background.png`
      const url_headline_text = `${jwtDefaultConfig.Domain}/path/kleinekrone-kp-hl-en.png`
      const url_parchment = `${jwtDefaultConfig.Domain}/path/kleinekrone-kp-small-parchement.png`
      const url_icon_friend = `${jwtDefaultConfig.Domain}/path/kleinekrone-kingspath-ic-ownstate-friends.png`
      const url_icon_amount_friend = `${jwtDefaultConfig.Domain}/path/kleinekrone-kingspath-ic-ownstate-counterfriends.png`

      let urls = [
        url_map_side,
        url_map_side_arrow,
        url_map_bg,
        url_land_begin,
        url_fels1,
        url_fels2,
        url_fels3,
        url_fels4,
        url_progress_bar,
        url_baum1,
        url_baum2,
        url_baum3,
        url_baum4,
        url_baum5,
        url_baum6,
        url_baum7,
        url_building1,
        url_building2,
        url_building3,
        url_building4,
        url_icon_past,
        url_icon_future,
        url_icon_wheel_locked,
        url_icon_wheel_open,
        url_icon_choose_mission,
        url_icon_active_mission,
        url_button_position,
        url_button_position_hover,
        url_headline,
        url_headline_text,
        url_parchment,
        url_icon_friend,
        url_icon_amount_friend
      ];

      const random_pos = [
        300,
        150,
        320,
        100,
        320,
        430,
        450,
        250,
        150,
        220,
        70,
        380,
        260,
        250,
        170,
        320,
        400,
        380,
        150,
        350
      ];

      const random_icons = [
        url_baum2,
        url_baum1,
        url_fels2,
        url_building1,
        url_fels2,
        url_baum3,
        url_building2,
        url_baum1,
        url_fels3,
        url_baum4,
        url_building3,
        url_fels3,
        url_baum1,
        url_fels4,
        url_baum5,
        url_fels2,
        url_baum7,
        url_fels1,
        url_fels4,
        url_baum5,
        url_fels1,
        url_building4,
        url_baum6,
        url_fels3,
        url_building2,
        url_baum1,
        url_fels2
      ];

      //containers
      let stageContainer = new PIXI.Container();
      stageContainer.x = 0;
      stageContainer.y = 0;
      stageContainer.vx = 0;
      stageContainer.vy = 0;

      let mapBgContainer = new PIXI.Container();
      mapBgContainer.x = 0;
      mapBgContainer.y = 0;
      mapBgContainer.vx = 0;
      mapBgContainer.vy = 0;

      const WIDTH = 1279;
      const HEIGHT = 710;

      //reset loader and textures
      let loader = PIXI.Loader.shared;
      loader.reset();
      PIXI.utils.clearTextureCache();

      //Aliases
      let Application = PIXI.Application, 
        resources = loader.resources,
        Sprite = PIXI.Sprite;

      //Create a Pixi Application
      let app = new Application({
        width: WIDTH,
        height: HEIGHT,
        antialias: true,
        transparent: true,
        autoResize: true
      });
      app.view.id = "pixi-kingspath-canvas";

      const container = document.getElementById("pixi-container");
      container.appendChild(app.view);

      const loaderOptions = {
        loadType: PIXI.LoaderResource.LOAD_TYPE.IMAGE,
        xhrType: PIXI.LoaderResource.XHR_RESPONSE_TYPE.BLOB
      };

      for (let i = 0; i < urls.length; i++) {
        loader.add(urls[i], urls[i], loaderOptions);
      }
      loader.load(() => {
        setup();
      });

      const setup = () => {
        fetchData();
        createSprites();
        kingspathMapResize();

        window.addEventListener("resize", kingspathMapResize);
        // Detach event listeners
        state.unsubscribeEvents.push(() => {
          window.removeEventListener("resize", kingspathMapResize);
        });
        // Start the game loop
        app.ticker.fps = 60;
        app.ticker.add(delta => gameLoop(delta));
      };

      const restart = () => {
        timelinePuls.kill();

        //clear timer
        clearInterval(state.intervalId);

        //reset position
        currentPosition = 0;

        //remove icon and paths
        while (stageContainer.children[0]) {
          stageContainer.children[0].destroy(false);
        }
        
        //reset icon arrays
        bg_arr = [];
        path_arr = [];
        icon_arr = [];
        friends_arr = [];
        fetchData();
      };

      const destroyAll = () => {
        state.destroyApp = false;

        // destroy app contexts
        while (app.stage.children[0]) {
          // app.stage.removeChild(app.stage.children[0]);
          app.stage.children[0].destroy(true);
        }

        while (stageContainer.children[0]) {
          // stageContainer.removeChild(stageContainer.children[0]);
          stageContainer.children[0].destroy(true);
        }

        app.loader.reset();
        app.loader.destroy(true);
        loader.reset();
        loader.destroy(true);

        //destroy canvas context
        const contextIds = ["bitmaprenderer", "2d", "webgl", "webg2"];
        for (let i = 0; i < contextIds.length; i++) {
          let gl = app.view.getContext(contextIds[i]);
          if (gl) {
            const buf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            const numAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
            for (let attrib = 0; attrib < numAttributes; ++attrib) {
              gl.vertexAttribPointer(attrib, 1, gl.FLOAT, false, 0, 0);
            }

            const numTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
            for (let unit = 0; unit < numTextureUnits; ++unit) {
              gl.activeTexture(gl.TEXTURE0 + unit);
              gl.bindTexture(gl.TEXTURE_2D, null);
              gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
            }

            gl.canvas.width = 1;
            gl.canvas.height = 1;

            let ext = gl.getExtension("WEBGL_lose_context");
            if (ext) {
              ext.loseContext();
            }
          }
        }

        app.destroy(true);

        PIXI.utils.clearTextureCache();
        PIXI.utils.destroyTextureCache();

        //destroy event listeners
        for (let i = 0; i < unsubscribeEvents.length; i++) {
          unsubscribeEvents[i]();
        }
      };

      const moveMapAnimation = () => {
        if (stageContainer == null) {
          return;
        }

        // //left end reached
        if (stageContainer.x + stageContainer.vx > -100) {
          return;
        }

        //right end reached
        if (
          Math.abs(stageContainer.x + stageContainer.vx + -WIDTH / 3) >
          stageContainer.width
        ) {
          return;
        }

        //move background. repeat background
        mapBgContainer.x += stageContainer.vx;
        mapBgContainer.vx += stageContainer.vx;
        if (mapBgContainer.vx <= -2312 || mapBgContainer.vx >= 0) {
          mapBgContainer.x = -1156 - (mapBgContainer.vx % 1156);
          mapBgContainer.vx = -1156;
        }

        //move stage (icons)
        stageContainer.x += stageContainer.vx;
      };

      const gameLoop = () => {
        //end
        if (state.destroyApp === true) {
          destroyAll();
        }

        //on update
        // if (state.handleNeedsUpdate()) {
        //   // state.$store.commit("kingspath/setKingspathNeedUpdate", false);
        //   restart();
        // }

        if (activeMoveMap) {
          moveMapAnimation();
        }

        //TEST FUNKTIONS
        if (state.testGoRight) {
          stageContainer.x = -stageContainer.width + WIDTH / 3;
          state.testGoRight = false;
        }

        if (state.testShowOvertake) {
          state.testShowOvertake = false;
          // avatar.x = overtakeTestBegin_x;
          // avatar.y = overtakeTestBegin_y;
          // const test_json = JSON.parse(
          //   '{"mission_id":8,"progress":{"value":15,"target":15,"percentage":100},"status":"FINISHED","level":2,"rewards":[{"id":235159,"card_id":38,"amount":1,"card":{"id":38,"title":"insignien.2","description":"Prinzen Krone (Insignien)","payload":{"type":"card","set":"insignien","number":2,"target":"scrapbook"},"type":"App\\\\Models\\\\Asset\\\\Card","set":"insignien","number":2,"image_urls":{"backgrounds":{"collected_url":"https://mk-dev-storage.s3.eu-central-1.amazonaws.com/card/background/bg-250.png","empty_url":"https://mk-dev-storage.s3.eu-central-1.amazonaws.com/card/background/fallback/bg-empty-250.png"},"image_url":"https://mk-dev-storage.s3.eu-central-1.amazonaws.com/uploads/assets/f041c3f442_insignien2250.png"},"probability":{"id":38,"probability":250,"card_id":38}},"created_at":"2020-07-30T05:51:37.000000Z","updated_at":"2020-07-30T05:51:37.000000Z"},{"overtakeBonus":{"amount":100000,"friend":{"id":1253,"name":"OjiSama3","locale":"en_EN","avatar_url":"https://mk-dev-storage.s3.eu-central-1.amazonaws.com/avatar/prince%403x.png"}}}]}'
          // );
          // state.$store.commit(
          //   "kingspath/setKingspathRewardsCompleted",
          //   test_json.rewards
          // );
          animationOvertake();
        }
      };

      const animationOvertake = () => {
        //TODO: New overtake animation
        state.mapApiJsonKingspathComplete(state.completedRewards);
      };
      const animationCurrentIconPuls = icon => {
        timelinePuls = new TimelineLite();
        timelinePuls.fromTo(
          icon.scale,
          0.2,
          { x: 1.2, y: 1.2 },
          {
            x: 1.4,
            y: 1.4,
            onComplete: function() {
              timelinePuls.reversed(!timelinePuls.reversed());
            },
            onReverseComplete: function() {
              timelinePuls.restart();
            }
          },
          1
        );
        for (let i = 0; i < lights.length; i++) {
          timelinePuls.fromTo(
            lights[i],
            0.2,
            { alpha: 0 },
            {
              alpha: 0.5
            },
            1
          );
        }
      };
      
      const fetchData = () => {
        fetching = true;
        // state.handlefetchKingspath().then(res => {
        //   state.isWheelActive = res.wheel != null;

        //   api_current_Kingspath = res;
        //   fetching = false;

        //   currentKingspathLevel = parseInt(api_current_Kingspath.current.level);
        //   missions = api_current_Kingspath.current.missions;
        //   wheel = api_current_Kingspath.wheel;
        //   wheel_sequence =
        //     api_current_Kingspath.config.wheel.sequence.repeat_level;
        //   is_active_mission = missions.length;
        //   is_active_wheel = wheel !== null;
        //   parseFriends(api_current_Kingspath.friends).then(result => {
            // friends = result;
            generateMap();
        //   });
        // });
      };

      const parseFriends = friends => {
        return new Promise(resolve => {
          let result = [];
          const maxFriendsPerLevel = 3;

          friends.forEach(friend => {
            //add friends avatar to loader
            let loaderFile;
            let avatarUrl = friend.user.avatar;
            if (avatarUrl.indexOf("facebook") !== -1) {
              loaderFile = avatarUrl.split("?")[0];
            } else {
              loaderFile = avatarUrl + "?crossorigin";
            }
            if (!resources[loaderFile]) {
              loader.add(loaderFile, loaderFile, loaderOptions);
            }

            //add friend to array in the right posiotion (index===display level))
            let friendKingLevel = parseInt(friend.user.kingspath.level) + 1;
            if (!result[friendKingLevel]) {
              result[friendKingLevel] = [];
            }

            //max friends per level
            if (result[friendKingLevel].length < maxFriendsPerLevel) {
              result[friendKingLevel].push(friend.user);
            }
          });

          // loader.reset();
          loader.load(() => {
            resolve(result);
          });
        });
      };

      const calcAmountIconsIncludedWheel = maxLevel => {
        return maxLevel + Math.round(maxLevel / wheel_sequence);
      };

      const generateImportantIcons = () => {
        let sprite_obj;

        //Sprite land begin
        sprite_obj = new Sprite(resources[url_land_begin].texture);
        sprite_obj.name = "land_begin";
        sprite_obj.height = 680;
        sprite_obj.width = 430;
        sprite_obj.height *= 1.2;
        sprite_obj.width *= 1.2;
        sprite_obj.x = 350;
        sprite_obj.y = 100;
        sprite_obj.zIndex = 20;
        sprite_obj.keep = true;
        stageContainer.addChild(sprite_obj);
      };

      const generateMap = () => {
        generateImportantIcons();

        //calculate values
        const amountIconsPast = currentKingspathLevel;
        const amountIconsCurrent = 1;
        let amountIconsFuture =
          calcAmountIconsIncludedWheel(maxKingspathLevel) -
          Math.round(currentKingspathLevel / wheel_sequence);
        if (is_active_wheel) {
          amountIconsFuture++;
        }
        let amountIconsAll = Math.round(
          amountIconsPast + amountIconsCurrent + amountIconsFuture
        );
        const firstWheelActive = amountIconsPast === 1 && is_active_wheel;

        let displayLevel = 1; //state level is shown on the map
        for (let i = 0; i < amountIconsAll; i++) {
          //hotfix: prevent round issues. do not exceed max level
          if (displayLevel > maxKingspathLevel) {
            break;
          }

          //special case: first kingspath wheel. appears after very first level
          if (firstWheelActive && i === 0) {
            generateIconPast(i, displayLevel);
            i++;
            generateIconWheel(i, displayLevel, true);
            setCurrentMapPosition();
            displayLevel++;
            continue;
          }

          //generate past icons
          if (i < amountIconsPast) {
            generateIconPast(i, displayLevel);
            displayLevel++;
            continue;
          }

          //generate current mission/choose icon or wheel
          if (i === currentKingspathLevel) {
            if (is_active_wheel) {
              generateIconWheel(i, displayLevel, true);
              setCurrentMapPosition();
              i++;
              generateIconFuture(i, displayLevel);
            } else {
              //wheel is NOT active. Current level is not completed.
              generateIconCurrent(i);
              setCurrentMapPosition();
              if ((displayLevel - 1) % wheel_sequence === 0) {
                i++;
                generateIconWheel(i, displayLevel + 1);
              }
            }
            displayLevel++;

            continue;
          }

          // //generate unknown future icon or wheel
          if (i < amountIconsFuture) {
            if ((displayLevel - 1) % wheel_sequence === 0) {
              //state level has a kingswheel. show future icon and kingswheel
              generateIconFuture(i, displayLevel);
              i++;
              generateIconWheel(i, displayLevel + 1);
              displayLevel++;
            } else {
              //no kingswheel in state level. just show future icon
              generateIconFuture(i, displayLevel);
              displayLevel++;
            }
          }
        }

        // generateIconsFuture();
        fillContainer();
        showMap();
      };

      const generateIconWheel = (position, displayLevel, is_active) => {
        let current_url = url_icon_wheel_open;
        if (!is_active) {
          current_url = url_icon_wheel_locked;
        }

        //icon
        let icon_position_y = random_pos[position % random_pos.length];
        let sprite = new Sprite(resources[current_url].texture);
        sprite.x = beginAt + space * position + 50;
        sprite.y = icon_position_y + 70;
        sprite.zIndex = 20;
        sprite.width = 95;
        sprite.height = 102;
        sprite.anchor.set(0.5, 0.5);

        //text
        let textSprite = new PIXI.Text('SPIN',
          {
            fontSize: 15,
            fill: "#ffffff",
            align: "center",
            fontWeight: "bold"
          }
        );
        textSprite.resolution = 10;
        textSprite.anchor.set(0.5, 0.5);
        textSprite.x = 0;
        textSprite.y = 5;
        sprite.addChild(textSprite);


        if (is_active) {
          sprite.interactive = true;
          sprite.buttonMode = true;
          sprite.on("mousedown", () =>
            console.log(`state.handleOpenModal("modal-kingswheel")`)
          );
          sprite.on("touchstart", () =>
            console.log(`state.handleOpenModal("modal-kingswheel")`)
          );
          sprite.filters = lights;
          animationCurrentIconPuls(sprite);

          //overtake settings
          overtakeTarget_x = sprite.x + 10;
          overtakeTarget_y = sprite.y + 10;

          //parchment headline
          parchment_headline.text = "kingspath.info.spin_kingswheel.title"
          parchment_headline.y = 110;
          parchment_headline.style.wordWrapWidth = 230;

          //parchment text
          parchment_text.text = "kingspath.info.spin_kingswheel.message";
          parchment_text.y = 210;
          parchment_text.style.wordWrapWidth = 230;
        }

        //push icon and path to array
        icon_arr.push(sprite);

        //generate background icons
        generateIconBackground(position, sprite);
        generatePath(position, sprite.x, sprite.y);

        //set last positions
        last_icon_position_x = sprite.x;
        last_icon_position_y = sprite.y;

        return sprite;
      };

      const generateIconPast = (position, displayLevel) => {
        //icon
        let icon_position_y = random_pos[position % random_pos.length];
        let sprite = new Sprite(resources[url_icon_past].texture);
        sprite.x = beginAt + space * position;
        sprite.y = icon_position_y;
        sprite.width = 102;
        sprite.height = 137;
        sprite.zIndex = 20;

        //text level number
        const text = new PIXI.Text(displayLevel, {
          fill:'#fff',
          fontSize: 20,
          align: "center"
        });
        text.anchor.set(0.5);
        text.x = 50;
        text.y = 88;
        sprite.addChild(text);

        //generate background icons
        generateIconBackground(position, sprite);
        generatePath(position, sprite.x + 50, sprite.y + 100);

        //set last positions
        last_icon_position_x = sprite.x;
        last_icon_position_y = sprite.y + 100;

        //push icon and path to array
        icon_arr.push(sprite);

        //generate friends icon
        generateIconFriend(
          beginAt + space * position,
          icon_position_y + 50,
          displayLevel
        );

        if (displayLevel === currentKingspathLevel) {
          overtakeTestBegin_x = sprite.x - 50;
          overtakeTestBegin_y = sprite.y + 10;
        }

        return sprite;
      };

      //background map icon
      const generateIconBackground = (index, sprite) => {
        function fitInMap(sprite) {
          return (
            sprite.y + sprite.height < 600 && sprite.y + sprite.height > 200
          );
        }

        //first icon
        let bg_pos_x, bg_pos_y;
        bg_pos_x = beginAt + space * index;
        bg_pos_y = sprite.y - 150;
        let current_icon_url = random_icons[index % random_icons.length];
        let bg_sprite = new Sprite(resources[current_icon_url].texture);
        bg_sprite.width *= 1.2;
        bg_sprite.height *= 1.2;
        bg_sprite.x = bg_pos_x;
        bg_sprite.y = bg_pos_y;
        bg_sprite.zIndex = 21;
        if (fitInMap(bg_sprite)) {
          bg_arr.push(bg_sprite);
        }

        //second icon
        bg_pos_x = beginAt + space * index;
        bg_pos_y = sprite.y + 200;
        current_icon_url = random_icons[(index + 1) % random_icons.length];
        bg_sprite = new Sprite(resources[current_icon_url].texture);
        bg_sprite.width *= 1.2;
        bg_sprite.height *= 1.2;
        bg_sprite.x = bg_pos_x;
        bg_sprite.y = bg_pos_y;
        bg_sprite.zIndex = 21;
        if (fitInMap(bg_sprite)) {
          bg_arr.push(bg_sprite);
        }

        //third icon
        bg_pos_x = beginAt + space * index;
        bg_pos_y = sprite.y + 250;
        current_icon_url = random_icons[(index + 2) % random_icons.length];
        bg_sprite = new Sprite(resources[current_icon_url].texture);
        bg_sprite.width *= 1.2;
        bg_sprite.height *= 1.2;
        bg_sprite.x = bg_pos_x;
        bg_sprite.y = bg_pos_y;
        bg_sprite.zIndex = 21;
        if (fitInMap(bg_sprite)) {
          bg_arr.push(bg_sprite);
        }

        //fourth icon
        bg_pos_x = beginAt + space * index;
        bg_pos_y = sprite.y - 250;
        current_icon_url = random_icons[(index + 3) % random_icons.length];
        bg_sprite = new Sprite(resources[current_icon_url].texture);
        bg_sprite.width *= 1.2;
        bg_sprite.height *= 1.2;
        bg_sprite.x = bg_pos_x;
        bg_sprite.y = bg_pos_y;
        bg_sprite.zIndex = 21;
        if (fitInMap(bg_sprite)) {
          bg_arr.push(bg_sprite);
        }
      };

      //generate path from current position to last position (x/y)
      const generatePath = (position, x, y) => {
        if (position === 0) {
          return;
        }

        //path
        const last_calc_position_y = last_icon_position_y - y;
        let path_line = new PIXI.Graphics();
        path_line.x = x;
        path_line.y = y;
        path_line.zIndex = 10;
        path_line.lineStyle(5, 0xf8ec);
        // path_line.moveTo(width_icon / 2, height_icon / 2);

        let curve_space = 50;
        const line_amount = 20;
        for (let i = 1; i < line_amount; i++) {
          let percent = (100 / line_amount / 100) * i;
          let percent2 = (100 / line_amount / 100) * i + 0.02;

          //add a curve
          let increase = Math.PI / line_amount;
          let index = increase * i;
          if (y < last_icon_position_y) {
            index *= -1;
          }
          let curve_add = curve_space * Math.sin(index);

          path_line
            .lineTo(
              -space * percent,
              last_calc_position_y * percent + curve_add
            )
            .moveTo(
              -space * percent2,
              last_calc_position_y * percent2 + curve_add
            );
        }

        path_arr.push(path_line);
      };

      const generateIconFuture = (position, displayLevel) => {
        // finished icon
        let icon_position_y = random_pos[position % random_pos.length];
        let sprite = new Sprite(resources[url_icon_future].texture);
        sprite.x = beginAt + space * position;
        sprite.y = icon_position_y;
        sprite.width = 95;
        sprite.height = 102;
        sprite.zIndex = 20;

        //text 2
        const text = new PIXI.Text(displayLevel, {
          fontSize: 20,
          fill:'#fff',
          align: "center"
        });
        text.anchor.set(0.5);
        text.x = 48;
        text.y = 53;
        sprite.addChild(text);

        //push icon and path to array
        icon_arr.push(sprite);

        //generate friends icon
        generateIconFriend(
          beginAt + space * position,
          icon_position_y,
          displayLevel
        );

        //generate background icons
        generateIconBackground(position, sprite);
        generatePath(position, sprite.x + 50, sprite.y + 50);

        //set last positions
        last_icon_position_x = sprite.x;
        last_icon_position_y = sprite.y + 20;

        //set position of state icon
        xPositonLastIcon = sprite.x;

        return sprite;
      };

      const generateIconStart = position => {
        //icon
        let icon_position_y = random_pos[position % random_pos.length];
        let sprite = new Sprite(resources[url_icon_choose_mission].texture);
        sprite.x = beginAt + space * position + 50;
        sprite.y = icon_position_y + 80;
        sprite.width = 128;
        sprite.height = 124;
        sprite.zIndex = 20;
        sprite.anchor.set(0.5, 0.5);
        sprite.interactive = true;
        sprite.buttonMode = true;
        sprite.on("mousedown", () =>
          console.log(`state.handleOpenModal("modal-kingspath-choose-mission")`)
        );
        sprite.on("touchstart", () =>
          console.log(`state.handleOpenModal("modal-kingspath-choose-mission")`)
        );
        sprite.filters = lights;
        animationCurrentIconPuls(sprite);

        //text 1
        // const icon_text1 = new PIXI.Text(
        //   "station",
        //   {
        //     fill: '#fff',
        //     fontSize: 13,
        //     align: "center"
        //   }
        // );
        // icon_text1.anchor.set(0.5, 0.5);
        // icon_text1.resolution = 4;
        // icon_text1.x = 0;
        // icon_text1.y = -16;
        // sprite.addChild(icon_text1);

        //text 2
        // const icon_text2 = new PIXI.Text(
        //   "10",
        //   {
        //     fill: 0xffffff,
        //     fontSize: 12,
        //     align: "center"
        //   }
        // );
        // icon_text2.anchor.set(0.5, 0.5);
        // icon_text2.resolution = 4;
        // icon_text2.x = 0;
        // icon_text2.y = 9;
        // sprite.addChild(icon_text2);

        //text 3
        let icon_text3 = new PIXI.Text(currentKingspathLevel + 1, {
          fontSize: 20,
          fill: '#fff',
          align: "center",
          lineHeight: 30
        });
        icon_text3.anchor.set(0.5, 0.5);
        icon_text3.resolution = 4;
        icon_text3.x = 0;
        icon_text3.y = 36;
        sprite.addChild(icon_text3);

        //push icon and path to array
        icon_arr.push(sprite);

        //generate background icons
        generateIconBackground(position, sprite);
        generatePath(position, sprite.x, sprite.y);

        //set last positions
        last_icon_position_x = sprite.x;
        last_icon_position_y = sprite.y;

        //different anchor point
        let anchor = {};
        anchor.x = sprite.x;
        anchor.y = sprite.y;
        anchor.x -= 50;
        anchor.y -= 50;

        return anchor;
      };

      const generateIconMission = (index, activeMission) => {
        let icon_position_y = random_pos[index % random_pos.length];

        //container
        let missionContainer = new PIXI.Container();
        missionContainer.x = beginAt + space * index + 60;
        missionContainer.y = icon_position_y + 100;
        missionContainer.filters = lights;
        animationCurrentIconPuls(missionContainer);

        //mission thumbnail
        // const thumb_url =
        //   getThumbnailByGameId(activeMission.game_details.id) + "?crossorigin";
        let thumbnail = PIXI.Sprite.from('http://h2931731.stratoserver.net/game-6.jpg');
        thumbnail.width = 140;
        thumbnail.height = 90;
        thumbnail.x = 0;
        thumbnail.y = -10;
        thumbnail.zIndex = 12;
        thumbnail.anchor.set(0.5, 0.5);
        missionContainer.addChild(thumbnail);

        //icon
        let sprite = new Sprite(resources[url_icon_active_mission].texture);
        sprite.x = 0;
        sprite.y = 0;
        sprite.zIndex = 20;
        sprite.width = 146;
        sprite.height = 112;
        sprite.interactive = true;
        sprite.buttonMode = true;
        sprite.anchor.set(0.5, 0.5);
        sprite.on("mousedown", () =>setIsOpenModal(true));
        sprite.on("touchstart", () =>console.log(`state.handleOpenModal("modal-kingspath-choose-mission")`));
        missionContainer.addChild(sprite);

        //icon text 1
        const icon_text = new PIXI.Text(
          10,
          {
            fontSize: 11,
            fill:'#fff',
            align: "center"
          }
        );
        icon_text.anchor.set(0.5, 0.5);
        icon_text.resolution = 4;
        icon_text.x = 0;
        icon_text.y = 17;
        sprite.addChild(icon_text);

        //icon text 2
        const icon_text2 = new PIXI.Text(currentKingspathLevel + 1,
          {
            fontSize: 21,
            fill:'#fff',
            align: "center"
          }
        );
        icon_text2.anchor.set(0.5, 0.5);
        icon_text2.resolution = 4;
        icon_text2.x = 0;
        icon_text2.y = 39;
        sprite.addChild(icon_text2);

        //mission progress
        const currentProgress = activeMission.progress.percentage;
        let progress_bar = new Sprite(resources[url_progress_bar].texture);
        progress_bar.x = -73;
        progress_bar.y = -80;
        progress_bar.width = 146;
        progress_bar.height = 20;
        progress_bar.anchor.set(0, 0);
        missionContainer.addChild(progress_bar);

        // //mission progress mask
        let progress_bar_mask = new PIXI.Graphics();
        progress_bar_mask.beginFill(0xffff00);
        progress_bar_mask.drawRoundedRect(-69, -77, 138, 14, 20);
        missionContainer.addChild(progress_bar_mask);

        // //mission progress filler
        const progressWidth = (138 / 100) * currentProgress;
        let progress = new PIXI.Graphics();
        progress.beginFill(0x4de5ff);
        progress.drawRoundedRect(-69, -77, progressWidth, 14, 0);
        progress.endFill();
        progress.mask = progress_bar_mask;
        missionContainer.addChild(progress);

        //mission progress text
        let progress_text = new PIXI.Text(
          Math.round(currentProgress) + "%",
          {
            fontSize: 14,
            fill: 0xffffff,
            align: "center",
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowDistance: 1,
            fontWeight: "bold",
            lineHeight: 30
          }
        );
        progress_text.anchor.set(0.5, 0.5);
        progress_text.x = 50;
        progress_text.y = -70;
        progress_text.resolution = 3;
        missionContainer.addChild(progress_text);

        //parchment headline
        // parchment_headline.text = state.$t(
        //   "kingspath.info.active_mission.title"
        // ).toUpperCase();
        // parchment_headline.y = 110;

        //parchment countdown
        countdown();

        //parchment text
        // parchment_text.text = state.$t("kingspath.info.active_mission.message");
        // parchment_text.y = 230;
        // parchment_text.style.wordWrapWidth = 200;

        //push icon and path to array
        icon_arr.push(missionContainer);

        //generate friends icon
        generateIconFriend(
          beginAt + space * index + 25,
          icon_position_y - 15,
          index + 1
        );

        //generate background icons
        generateIconBackground(index, sprite);
        generatePath(index, missionContainer.x, missionContainer.y);

        //set last positions
        last_icon_position_x = missionContainer.x;
        last_icon_position_y = missionContainer.y;

        //different anchor point
        let anchor = {};
        anchor.x = missionContainer.x;
        anchor.y = missionContainer.y;
        anchor.x -= 50;
        anchor.y -= 50;

        return anchor;
      };

      const generateIconFriend = (x, y, currentDisplayLevel) => {
      //   if (!friends[currentDisplayLevel]) {
      //     return;
      //   }

      //   //friend in state level
      //   const friendArr = friends[currentDisplayLevel];

      //   //sprite friends avatar
        let avatar_friend = new Sprite(resources[url_icon_friend].texture);
        avatar_friend.height = 58;
        avatar_friend.width = 58;
        avatar_friend.x = x + 120;
        avatar_friend.y = y - 20;
        avatar_friend.anchor.set(0.5, 0.5);
        avatar_friend.zIndex = 50;
        avatar_friend.interactive = true;
        avatar_friend.buttonMode = true;
        avatar_friend.on("mousedown", () => {
          state.currentFriendsData = friendArr;
          state.handleOpenModal("modal-kingspath-friends");
        });
        avatar_friend.on("touchstart", () => {
          state.currentFriendsData = friendArr;
          state.handleOpenModal("modal-kingspath-friends");
        });

      //   //container counter
        let avatar_container_counter = new Sprite(
          resources[url_icon_amount_friend].texture
        );
        avatar_container_counter.height = 29;
        avatar_container_counter.width = 29;
        avatar_container_counter.x = -25;
        avatar_container_counter.y = -20;
        avatar_container_counter.anchor.set(0.5, 0.5);
        avatar_container_counter.zIndex = 50;
        avatar_friend.addChild(avatar_container_counter);

      //   //text counter
        const text = new PIXI.Text('friendArr.length.toString()', {
          fontSize: 14,
          align: "center"
        });
        text.anchor.set(0.5);
        text.zIndex = 16;
        text.x = -1;
        text.y = 0;
        avatar_container_counter.addChild(text);

      //   icon_arr.push(avatar_friend);
      };

      const generateIconCurrent = position => {
        // if (is_active_mission) {
        //   let mission;
        //   for (let i = 0; i < missions.length; i++) {
        //     if (missions[i].status === "ACTIVE") {
        //       mission = missions[i];
        //       break;
        //     }
        //   }
        //   if (mission === undefined) {
        //     mission = missions[0];
        //   }
          generateIconMission(position, missions[0]);
        // } else {
        //   generateIconStart(position);
        // }
      };

      //find and set map default position to state icon
      const setCurrentMapPosition = () => {
        if (!last_icon_position_x || last_icon_position_x < 0) {
          last_icon_position_x = -50;
        }
        currentMapPosition = -last_icon_position_x + 600;
        toDefaultPosition();
      };

      //set mao back to position
      const toDefaultPosition = () => {
        stageContainer.x = currentMapPosition;
      };

      const fillContainer = () => {
        const scaleRatio = 1.25;

        //add bg to container
        for (let i = 0; i < bg_arr.length; i++) {
          stageContainer.addChild(bg_arr[i]);
        }

        //add path to container
        for (let i = 0; i < path_arr.length; i++) {
          stageContainer.addChild(path_arr[i]);
        }

        //add icons to container
        for (let i = 0; i < icon_arr.length; i++) {
          icon_arr[i].width *= scaleRatio;
          icon_arr[i].height *= scaleRatio;
          stageContainer.addChild(icon_arr[i]);
        }

        for (let i = 0; i < friends_arr.length; i++) {
          stageContainer.addChild(friends_arr[i]);
        }
      };
      const createSprites = () => {
        let sprite_obj;

        stageContainer.zIndex = 20;
        app.stage.addChild(stageContainer);
        app.stage.y = 50;

         //Sprite Map Mask to remove overlow objects
         let bg_mask = new PIXI.Graphics();
         bg_mask.beginFill(0xffff00);
         bg_mask.drawRoundedRect(50, -10, 1156, 676, 20);
         bg_mask.zIndex = 50;
         app.stage.addChild(bg_mask);
         stageContainer.mask = bg_mask;
 

        //Sprite Map Background. repeatable background
        mapBgContainer.x = -1156;
        mapBgContainer.vx = -1156;
        mapBgContainer.y = 10;
        mapBgContainer.zIndex = 10;
        mapBgContainer.mask = bg_mask;
        app.stage.addChild(mapBgContainer);
        for (let i = 0; i < 3; i++) {
          sprite_obj = new Sprite(resources[url_map_bg].texture);
          sprite_obj.name = "";
          sprite_obj.height = 626;
          sprite_obj.width = 1156;
          sprite_obj.x = i * 1156;
          sprite_obj.y = 0;
          sprite_obj.zIndex = 10;
          // sprite_obj.mask = bg_mask;
          mapBgContainer.addChild(sprite_obj);
        }


        //Sprite Map Left
        sprite_obj = new Sprite(resources[url_map_side].texture);
        sprite_obj.name = "map_left";
        sprite_obj.height = 653;
        sprite_obj.width = 292;
        sprite_obj.x = 10;
        sprite_obj.y = 0;
        sprite_obj.vx = 0;
        sprite_obj.vy = 0;
        sprite_obj.zIndex = 30;
        app.stage.addChild(sprite_obj);

        //Sprite Arrow Left
        sprite_obj = new Sprite(resources[url_map_side_arrow].texture);
        sprite_obj.name = "map_arrow_left";
        sprite_obj.interactive = true;
        sprite_obj.buttonMode = true;
        sprite_obj.on("mousedown", () => moveLeftPress());
        sprite_obj.on("touchstart", () => moveLeftPress());
        sprite_obj.on("mouseup", () => moveLeftRelease());
        sprite_obj.on("touchend", () => moveLeftRelease());
        sprite_obj.height = 104;
        sprite_obj.width = 50;
        sprite_obj.x = 45;
        sprite_obj.y = 270;
        sprite_obj.vx = 0;
        sprite_obj.vy = 0;
        sprite_obj.zIndex = 35;
        app.stage.addChild(sprite_obj);

        //Sprite Map Right
        sprite_obj = new Sprite(resources[url_map_side].texture);
        sprite_obj.name = "map_right";
        sprite_obj.height = 653;
        sprite_obj.width = 292;
        sprite_obj.x = WIDTH - 10;
        sprite_obj.y = 0;
        sprite_obj.scale.x *= -1;
        sprite_obj.zIndex = 30;
        app.stage.addChild(sprite_obj);

        //Sprite Arrow Right
        sprite_obj = new Sprite(resources[url_map_side_arrow].texture);
        sprite_obj.name = "map_arrow_right";
        sprite_obj.interactive = true;
        sprite_obj.buttonMode = true;
        sprite_obj.on("mousedown", () => moveRightPress());
        sprite_obj.on("touchstart", () => moveRightPress());
        sprite_obj.on("mouseup", () => moveRightRelease());
        sprite_obj.on("touchend", () => moveRightRelease());
        sprite_obj.height = 104;
        sprite_obj.width = 50;
        sprite_obj.x = WIDTH - 45;
        sprite_obj.y = 270;
        sprite_obj.scale.x *= -1;
        sprite_obj.zIndex = 35;
        app.stage.addChild(sprite_obj);

       
        
        //Parchment
        sprite_obj = new Sprite(resources[url_parchment].texture);
        sprite_obj.name = "parchment";
        sprite_obj.height = 260;
        sprite_obj.width = 350;
        sprite_obj.x = 90;
        sprite_obj.y = 400;
        sprite_obj.zIndex = 30;
        parchment = sprite_obj;
        app.stage.addChild(sprite_obj);

        //Parchment countdown
        // parchment_timer = new PIXI.Text("123123", {
        //   fontSize: 36,
        //   fill: "#ff0000",
        //   align: "center"
        // });
        // parchment_timer.x = 155;
        // parchment_timer.y = 170;
        // parchment_timer.angle = 6;
        // parchment_timer.anchor.set(0.5, 0.5);
        // parchment_timer.resolution = 2;
        // parchment.addChild(parchment_timer);

        // //parchment headline
        parchment_headline = new PIXI.Text("SELETE MISSION", {
          fontSize: 31,
          fill: "#a73000",
          align: "center",
          lineHeight: 40,
          wordWrap: true,
          wordWrapWidth: 150
        });
        parchment_headline.x = 110;
        parchment_headline.y = 130;
        parchment_headline.angle = 6;
        parchment_headline.anchor.set(0.5, 0.5);
        parchment_headline.resolution = 2;
        parchment.addChild(parchment_headline);

        // //parchment text
        parchment_text = new PIXI.Text("Turn over a card & takes on another mission on the pyramid path", {
          fontSize: 22,
          fill: "#720d02",
          align: "center",
          lineHeight: 25,
          wordWrapWidth: 150,
          wordWrap: true
        });
        parchment_text.x = 295;
        parchment_text.y = 150;

        parchment_text.angle = 6;
        parchment_text.anchor.set(0.5, 0.5);
        parchment_text.resolution = 2;
        parchment.addChild(parchment_text);

        //drop light object for current icon
        for (let i = 0; i < 4; i++) {
          let light = new DropShadowFilter();
          light.blur = 4;
          light.alpha = 0.5;
          light.rotation = i * 90;
          light.color = 0xffffff;
          light.distance = 20;
          light.alpha = 0;
          lights.push(light);
        }

        //Sprite button own position
        const button_own_pos = new Sprite(
          resources[url_button_position].texture
        );
        button_own_pos.name = "button-position";
        button_own_pos.height = 32;
        button_own_pos.width = 221;
        button_own_pos.x = 515;
        button_own_pos.y = 610;
        button_own_pos.zIndex = 55;
        button_own_pos.interactive = true;
        button_own_pos.buttonMode = true;
        button_own_pos.on("mousedown", () => toDefaultPosition());
        button_own_pos.on("touchstart", () => toDefaultPosition());
        button_own_pos.mouseover = function() { this.alpha = 0 };
        button_own_pos.mouseout = function() { this.alpha = 1 };
        app.stage.addChild(button_own_pos);

        //Sprite button own position HOVER
        const button_own_pos_hover = new Sprite(
          resources[url_button_position_hover].texture
        );
        button_own_pos_hover.name = "button-position";
        button_own_pos_hover.height = 32;
        button_own_pos_hover.width = 221;
        button_own_pos_hover.x = 515;
        button_own_pos_hover.y = 610;
        button_own_pos_hover.zIndex = 50;
        button_own_pos_hover.interactive = true;
        button_own_pos_hover.buttonMode = true;
        button_own_pos_hover.on("mousedown", () => toDefaultPosition());
        button_own_pos_hover.on("touchstart", () => toDefaultPosition());
        app.stage.addChild(button_own_pos_hover);

        //text button own position
        const text = new PIXI.Text("POSITION", {
          fontSize: 18,
          align: "center"
        });
        text.anchor.set(0.5);
        text.zIndex = 56;
        text.x = 624;
        text.y = 626;
        app.stage.addChild(text);

        //kingspath headline container sprite
        const headline_container = new Sprite(resources[url_headline].texture);
        headline_container.name = "";
        headline_container.height = 276;
        headline_container.width = 676;
        headline_container.x = 5;
        headline_container.y = -35;
        headline_container.zIndex = 50;
        app.stage.addChild(headline_container);

        //headline text
        const headline_text = new Sprite(resources[url_headline_text].texture);
        headline_text.name = "";
        headline_text.height = 145;
        headline_text.width = 334;
        headline_text.x = 210;
        headline_text.y = 50;
        headline_text.zIndex = 50;
        app.stage.addChild(headline_text);

        const updateLayersOrder = () => {
          app.stage.children.sort(function(a, b) {
            a.zIndex = a.zIndex || 0;
            b.zIndex = b.zIndex || 0;
            return a.zIndex - b.zIndex;
          });
        };

        updateLayersOrder();
      };

      const kingspathMapResize = () => {
        const siteContainer = document.getElementById("kingspath");
        if (!siteContainer) {
          return;
        }

        const size = [WIDTH, HEIGHT];
        const ratio = size[0] / size[1];
        const parent = app.view.parentNode;

        let w;
        let h;
        if (parent.clientWidth / parent.clientHeight >= ratio) {
          w = parent.clientHeight * ratio;
          h = parent.clientHeight;
        } else {
          w = parent.clientWidth;
          h = parent.clientWidth / ratio;
        }
        app.view.style.width = w + "px";
        app.view.style.height = h + "px";

        let timer = siteContainer.getElementsByClassName("timer-container")[0];
        if (timer) {
          timer.style.width = w + "px";
        }
      };

      const moveLeftPress = () => {
        activeMoveMap = true;
        // state.playSoundTab();
        // state.playSoundCardScroll();
        stageContainer.vx = mapScrollMoveSpeed;
        stageContainer.vy = 0;
      };

      const moveLeftRelease = () => {
        activeMoveMap = false;
        // state.stopSoundCardScroll();
        stageContainer.vx = 0;
      };

      const moveRightPress = () => {
        activeMoveMap = true;
        // state.playSoundTab();
        // state.playSoundCardScroll();
        stageContainer.vx = -mapScrollMoveSpeed;
        stageContainer.vy = 0;
      };

      const moveRightRelease = () => {
        activeMoveMap = false;
        // state.stopSoundCardScroll();
        stageContainer.vx = 0;
      };

      const showMap = () => {
        try {
          // state.$store.commit("setIsPageLoading", false);
          app.view.style.display = "inline-table";
          cached = true;

          if (state.completedRewards) {
            if (state.overtake) {
              animationOvertake();
            } else {
              state.mapApiJsonKingspathComplete(state.completedRewards);
            }
          }
        } catch (e) {
          console.log("lost context...");
        }
      };
      //countdown for next available spin
      const countdown = () => {
        state.intervalId = setInterval(() => {
          if (state.missions.length <= 0) {
            return;
          }

          // Get today's date and time
          const now = new Date().getTime();

          // Find the distance between now and the count down date
          const distance = state.endDate - now;

          // Count down finished?
          if (distance < 0) {
            state.expired = true;
            clearInterval(state.intervalId);
            // state.$store.commit("kingspath/setKingspathNeedUpdate", true);
            return;
          }
          state.expired = false;

          // Time calculations
          let days = Math.floor(
            (distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)
          );
          let hours =
            Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) +
            days * 24;
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);
          hours = ("0" + hours).substr(-2, 2);
          minutes = ("0" + minutes).substr(-2, 2);
          seconds = ("0" + seconds).substr(-2, 2);

          parchment_timer.text = hours + ":" + minutes + ":" + seconds;
        }, 1000);
      };
      const getThumbnailByGameId = game_id => {
        // let games = state.$store.getters["gameplay/getGames"];
        // for (let props in games) {
        //   if (games.hasOwnProperty(props)) {
        //     let game = games[props];
        //     if (game.id === game_id) {
        //       if (game.images[0]) {
        //         return game.images[0].url;
        //       } else {
        //         return "";
        //       }
        //     }
        //   }
        // }
        return "";
      };
  /*eslint-disable */
  }, [])
  return (
    <Fragment>
      <StationModal isOpen={IsOpenModal} setIsOpen={(e) => setIsOpenModal(e)}/>
      <div id="pixi-container" style={{marginTop: '-70px'}}/>
    </Fragment>
  )
}

export default Kingspath