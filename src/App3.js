import React from "react";
import "./App.css";
import shaolei from "./shaolei.jpg";

class App3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paley: 0,
      Display1: {},
      Display2: {},
      logo: "",
      Animation: [],
      Animation1: null,
      Div: [],
      tr: [],
      trindex: "",
      font: { fontSize: "16px" },
      game: {
        name: "",
        score: 0,
        time: 0,
        fuel: 150,
        audio: 1,
        font: 16,
        getRandTime() {
          return Math.random() * 2 + 6; //随机一个6到8的数
        },
      },
      actions: {
        left: "",
        top: "",
        playing: true,
      },
      style: "",
      left: 50,
      top: 280,
      truefalse: false,
    };
  }
  componentDidMount() {
    let eleTop = document.querySelector(".player").offsetTop;
    let eleLeft = document.querySelector(".player").offsetLeft;
    this.setState({
      Display1: { display: "none" },
      Display2: { display: "none" },
      logo: "instructions",
      actions: { left: eleLeft, top: eleTop, playing: true },
    });
  }

  onaaa(event) {
    var animation = [];
    for (var i = 0; i < 15; i++) {
      animation.push({
        animation: "general 0.3s " + i / 10 + "s" + " forwards",
      });
    }
    this.setState({
      Animation: animation,
    });
  }

  tops(event) {
    this.state.Div[event.target.dataset.key] = "";
    this.setState({
      Div: this.state.Div,
    });
  }

  onbbb(event) {
    setInterval(() => {
      if (this.state.actions.playing) {
        this.state.game.time++;
        this.state.game.fuel--;
        if (!(this.state.game.time % 40)) {
          this.state.Div.push({
            name: "friend collision",
            age1: Math.random() * (600 - 40 - 80) + 80,
            age2: this.state.game.getRandTime() + "s, 0.4s",
          });
        }
        if (!(this.state.game.time % 35)) {
          this.state.Div.push({
            name: "enemy collision",
            age1: Math.random() * (600 - 80 - 80) + 80,
            age2: this.state.game.getRandTime() + "s, 0.4s",
          });
        }
        if (!(this.state.game.time % 30)) {
          this.state.Div.push({
            name: "aestroid aestroid",
            classname: `aestroid aestroid-${
              ~~(Math.random() * 4) + 1
            } collision`,
            age1: Math.random() * (600 - 80 - 80) + 80,
            age2: this.state.game.getRandTime() + "s",
          });
        }
        if (!(this.state.game.time % 25)) {
          this.state.Div.push({
            name: "fuel collision",
            age1: Math.random() * (960 - 40),
            age2: this.state.game.getRandTime() + "s",
          });
        }
        this.setState({
          Div: this.state.Div,
        });
      }
    }, 100);
  }
  crash() {
    var odiv = document.getElementsByClassName("enemy");
    for (var i = 0; i < odiv.length; i++) {
      if (odiv[i].style.left < 700 && odiv[i].dataset.shot) {
        odiv[i].removeAttribute("data-shot");
        this.state.Div.push({
          name: "enemy-bullet collision",
          left: odiv[i].offsetLeft,
          top: odiv[i].offsetTop + 37,
          age1: this.state.game.getRandTime() / 2 + "s",
        });
        this.setState({
          Div: this.state.Div,
        });
      }
    }

    this.crashss.bind(this)(
      document.getElementsByClassName("player"),
      document.getElementsByClassName("collision"),
      function (e1, e2) {
        let fuel = e2.dataset.fuel / 1;
        this.state.game.fuel += fuel;
        this.state.game.fuel > 300 && (this.state.game.fuel = 300);
        if (fuel < 0) {
          this.state.Div.push({ name: "layer-red" });
          this.setState({
            Div: this.state.Div,
          });
        }
        this.state.Div[e2.dataset.key] = "";
        this.setState({
          Div: this.state.Div,
        });
      }.bind(this)
    );
    this.crashss.bind(this)(
      document.getElementsByClassName("bullet"),
      document.getElementsByClassName("collision"),

      function (e1, e2) {
        // background
        if (e2.className != "fuel collision") {
          this.state.Div[e1.dataset.key] = "";
          e2.dataset.life--; //使陨石障碍物生命值减一
          if (e2.dataset.life <= 0) {
            let score = e2.dataset.score / 1; //获得被击毁障碍物分数，有可能是负数，可能是负数
            this.state.game.score += score;
            if (score != 0) {
              this.state.Div.push({
                name: "score-counter score",
                classname: `score-counter score-${
                  score > 0 ? "plus" : "minus"
                }`,
                left: this.state.actions.left,
                top: this.state.actions.top,
                score: score,
              });
              this.state.Div[e2.dataset.key] = "";
              this.setState({
                Div: this.state.Div,
              });
            }
          }
        }
      }.bind(this)
    );
    this.state.game.fuel < 0 && this.over.bind(this)();
    this.setState({
      game: this.state.game,
    });
  }
  over() {
    //游戏结束
    this.playclick.bind(this)();
    this.state.game.fuel = 0;
    this.setState({
      Display1: { display: true },
      game: this.state.game,
    });
    document.querySelector(".logo").classList.add("form");
  }

  crashss(div, ele2, cbFn) {
    //console.log(ele2);
    var vdiv = div;
    if (vdiv) {
      for (var j = 0; j < vdiv.length; j++) {
        for (var i = 0; i < ele2.length; i++) {
          let e1T = vdiv[j].offsetTop; //获得我们飞船的距离页面顶部的偏移
          let e1B = e1T + vdiv[j].offsetHeight; //顶部的偏移+自己飞船的高度
          let e2T = ele2[i].offsetTop; //获得敌人飞船，障碍物的距离页面顶部的偏移
          let e2B = e2T + ele2[i].offsetHeight; //顶部的偏移+敌人飞船，障碍物的高度
          if (e1T < e2B && e2T < e1B) {
            //当障碍物，或我们的飞机的坐标连线包围了另一个元素那么进入下一步
            let e1L = vdiv[j].offsetLeft; //获取我们飞船的左边偏移量
            let e1R = e1L + vdiv[j].offsetWidth; //获取我飞船的左边偏移量+宽度
            let e2L = ele2[i].offsetLeft; //获取敌人飞船的左边偏移量
            let e2R = e2L + ele2[i].offsetWidth; //获取敌人飞船的左边偏移量+宽度
            if (e1L < e2R && e2L < e1R) {
              cbFn(vdiv[j], ele2[i]);
              break;
            }
          }
        }
      }
    }
  }

  onaclick(event) {
    document.querySelector(".instructions-board").style.display = "none";
    document.querySelector(".logo").classList.add("gaming");
    document.querySelector(".planet-box").style.left = 1080 + "px";
    document.querySelector(".planet-box").style.zIndex = "auto";
    this.state.Div.push({
      name: "audio",
      volume: this.state.game.audio,
    });
    this.setState({
      Animation1: { animationPlayState: "running" },
    });
    var aff = true;
    var abc = {
      l: false,
      r: false,
      t: false,
      b: false,
      s: false,
    };
    document.onkeydown = function (event) {
      var e = event || window.e;
      switch (e.keyCode) {
        case 37:
          abc.l = true;
          break;
        case 39:
          abc.r = true;
          break;
        case 38:
          abc.t = true;
          break;
        case 40:
          abc.b = true;
          break;
        case 32:
          this.setState({
            truefalse: true,
          });

          if (this.state.truefalse) {
            this.state.truefalse = false;
            this.state.Div.push({
              name: "shoot",
            });
            this.state.Div.push({
              name: "bullet collision1",
              left: this.state.actions.left + 100,
              top: this.state.actions.top + 17,
            });
            this.setState({
              truefalse: false,
            });
          }
          break;
      }

      let div = document.querySelector(".player");
      let eleTop = this.state.actions.top;
      let eleLeft = this.state.actions.left;
      let maxTop =
        document.querySelector(".container").offsetHeight -
        document.querySelector(".player").offsetHeight -
        10;
      let maxLeft =
        document.querySelector(".container").offsetWidth -
        document.querySelector(".player").offsetWidth -
        10;
      if (aff) {
        aff = false;
        function add() {
          if (this.state.actions.playing) {
            if (abc.l && eleLeft > 10) {
              eleLeft -= 8;
              this.state.actions.left = eleLeft;
              this.state.actions.top = eleTop;
              div.style.left = eleLeft + "px";
            }
            if (abc.r && eleLeft < maxLeft) {
              eleLeft += 8;
              this.state.actions.left = eleLeft;
              this.state.actions.top = eleTop;
              div.style.left = eleLeft + "px";
            }
            if (abc.t && eleTop > 10) {
              eleTop -= 8;
              this.state.actions.left = eleLeft;
              this.state.actions.top = eleTop;
              div.style.top = eleTop + "px";
            }
            if (abc.b && eleTop < maxTop) {
              eleTop += 8;
              this.state.actions.left = eleLeft;
              this.state.actions.top = eleTop;
              div.style.top = eleTop + "px";
            }
            this.setState({
              actions: this.state.actions,
            });
            this.crash.bind(this)();
          }
          requestAnimationFrame(add.bind(this));
        }
        requestAnimationFrame(add.bind(this));
      }
    }.bind(this);
    document.onkeyup = function (event) {
      var e = event || window.e;
      switch (e.keyCode) {
        case 37:
          abc.l = false;
          break;
        case 39:
          abc.r = false;
          break;
        case 38:
          abc.t = false;
          break;
        case 40:
          abc.b = false;
          break;
        case 32:
          this.setState({
            truefalse: false,
          });
          break;
      }
    }.bind(this);
  }

  playclick(event) {
    //点击暂停键
    this.audio.bind(this)();
    this.state.actions.playing = !this.state.actions.playing;
    this.setState({
      actions: this.state.actions,
      Animation1: {
        animationPlayState: this.state.actions.playing ? "running" : "paused",
      },
    });
  }
  fontPlus() {
    //点击加号键
    if (this.state.actions.playing && this.state.game.font < 24) {
      //如果按下加字体键，并且字体font<24
      this.state.game.font += 2; //然后字体+2
      this.setState({
        font: { fontSize: this.state.game.font + "px" },
        game: this.state.game,
      });
    }
  }
  fontMinus() {
    //点击加号键
    if (this.state.actions.playing && this.state.game.font > 12) {
      //如果按下加字体键，并且字体font<24
      this.state.game.font -= 2; //然后字体+2
      this.setState({
        font: { fontSize: this.state.game.font + "px" },
        game: this.state.game,
      });
    }
  }
  audio() {
    if (this.state.actions.playing) {
      //如果按下声音键
      this.state.game.audio = this.state.game.audio ? 0 : 1; //第一个按下返回0，第二次1
      var audiodiv = document.getElementsByClassName("Audio");
      for (var i = 0; i < audiodiv.length; i++) {
        audiodiv[i].volume = this.state.game.audio;
      }
    }
  }
  handleChange(event) {
    this.state.game.name = event.target.value;
    var div = event.target.nextElementSibling;
    this.state.game.name
      ? div.classList.add("controllable")
      : div.classList.remove("controllable");
    this.setState({
      game: this.state.game,
    });
  }
  btncontinue() {
    // console.log(123);
    if (this.state.game.name) {
      document.querySelector(".logo").classList.add("ranking");
      let result = {
        name: this.state.game.name, //获取名字
        score: this.state.game.score, //获取分数
        time: ~~(this.state.game.time / 10), //获取时间
      };
      let data = localStorage.ws04_ranking
        ? JSON.parse(localStorage.ws04_ranking)
        : [];
      data.push(result);
      localStorage.ws04_ranking = JSON.stringify(data);
      data.sort(function (a, b) {
        if (a.score === b.score) {
          return b.time - a.time;
        }
        return b.score - a.score;
      });
      let index = data.findIndex(function (arr) {
        return (
          arr["name"] == result["name"] &&
          arr["score"] == result["score"] &&
          arr["time"] == result["time"]
        );
      });
      this.setState({
        trindex: index,
        tr: data,
        Display2: { display: true },
      });
      // console.log(this.state.tr);
    }
  }
  end() {}
  render() {
    return (
      <>
        {
          <div className="container" style={this.state.Animation1}>
            <div className="planet-box" style={this.state.Animation[0]}>
              <img
                src={require("./imgs/planet-1.png")}
                alt="planet"
                className="planet-item"
                style={this.state.Animation1}
              />
              <img
                src={require("./imgs/planet-2.png")}
                alt="planet"
                className="planet-item"
                style={this.state.Animation1}
              />
              <img
                src={require("./imgs/planet-3.png")}
                alt="planet"
                className="planet-item"
                style={this.state.Animation1}
              />
              <img
                src={require("./imgs/planet-4.png")}
                alt="planet"
                className="planet-item"
                style={this.state.Animation1}
              />
              <img
                src={require("./imgs/planet-5.png")}
                alt="planet"
                className="planet-item"
                style={this.state.Animation1}
              />
            </div>
            <div className="setting-box">
              <img
                src={require(`./imgs/setting-${
                  this.state.actions.playing ? "pause" : "play"
                }.png`)}
                alt="setting"
                className="setting-item controllable setting-play"
                onClick={this.playclick.bind(this)}
              />
              <img
                src={require(`./imgs/setting-audio-${
                  this.state.game.audio ? "on" : "off"
                }.png`)}
                alt="setting"
                className="setting-item controllable setting-audio"
                onClick={this.audio.bind(this)}
              />
              <img
                src={require("./imgs/setting-font-plus.png")}
                alt="setting"
                className="setting-item controllable setting-font-plus"
                onClick={this.fontPlus.bind(this)}
              />
              <img
                src={require("./imgs/setting-font-minus.png")}
                alt="setting"
                className="setting-item controllable setting-font-minus"
                onClick={this.fontMinus.bind(this)}
              />
            </div>
            <div className="topbar">
              <div className="logo-box">
                <img
                  src={require("./imgs/logo.png")}
                  alt="logo"
                  className={"logo " + this.state.logo}
                  onAnimationEnd={this.onaaa.bind(this)}
                />
              </div>
              <div className="top-item">
                <img src={require("./imgs/icon-score.png")} alt="icon" />
                <span className="score-info" style={this.state.font}>
                  {this.state.game.score}
                </span>
              </div>
              <div className="top-item">
                <img src={require("./imgs/icon-time.png")} alt="icon" />
                <span className="time-info" style={this.state.font}>
                  {Math.round(this.state.game.time / 10)}
                </span>
              </div>
              <div className="top-item">
                <img src={require("./imgs/icon-fuel.png")} alt="icon" />
                <div className="fuel-counter-box">
                  <div
                    className="fuel-counter"
                    style={{ width: this.state.game.fuel / 3 + "%" }}
                  ></div>
                </div>
                <span className="fuel-info" style={this.state.font}>
                  {Math.round(this.state.game.fuel / 10)}
                </span>
              </div>
            </div>
            <div className="board instructions-board">
              <h2 style={this.state.Animation[0]}>How to Play Star Battle.</h2>
              <p style={this.state.Animation[1]}>
                1. Move the spaceship using the sensible areas in the screen;
              </p>
              <p style={this.state.Animation[2]}>
                2. The timer present the time lapsed;
              </p>
              <p style={this.state.Animation[3]}>
                3. The fuel counter show the remain fuel;
              </p>
              <p style={this.state.Animation[4]}>
                4. During the flight, the spaceship needs to destroy the
                asteroids and enemy spaceships that are presented in the space;
              </p>
              <p style={this.state.Animation[5]}>
                5. You can shoot pressing Space Bar;
              </p>
              <p style={this.state.Animation[6]}>
                6. If the spaceship hits a asteroid or another spaceship, you
                lose 15 points of fuel;
              </p>
              <p style={this.state.Animation[7]}>
                7. Enemy spaceship needs 1 shot to be destroyed, you will get 5
                points for each enemy destroyed;
              </p>
              <p style={this.state.Animation[8]}>
                8. Asteroid needs 2 shots to be destroyed, you will get 10
                points for each asteroid destroyed;
              </p>
              <p style={this.state.Animation[9]}>
                9. If you destroy a friendly spaceship, you lose 10 points;
              </p>
              <p style={this.state.Animation[10]}>
                10. During the flight, the spaceship needs to collect fuel in
                the space;
              </p>
              <p style={this.state.Animation[11]}>
                11. You can pause the game clicking in a button pause, or
                pressing the letter "p";
              </p>
              <p style={this.state.Animation[12]}>12. Go beyond all limits;</p>
              <p style={this.state.Animation[13]}>
                Battle in Space with Star Battle Championship...
              </p>
              <button
                className="btn btn-start"
                onClick={this.onaclick.bind(this)}
                style={this.state.Animation[14]}
              >
                Star Game
              </button>
            </div>
            <div className="board form-board" style={this.state.Display1}>
              <h2>Game Over!</h2>
              <input
                type="text"
                placeholder="input your name here"
                className="input input-name"
                onChange={this.handleChange.bind(this)}
              />
              <button
                className="btn btn-continue disabled"
                onClick={this.btncontinue.bind(this)}
              >
                Continue
              </button>
            </div>

            <div className="board ranking-board" style={this.state.Display2}>
              <table className="ranking-table">
                <tbody>
                  <tr style={{ animation: `general 0.3s 0s forwards` }}>
                    <th>Position</th>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Time</th>
                  </tr>
                  {this.state.tr.map((value, i) => {
                    //console.log(this.state.tr);
                    value["rank"] = i / 1 + 1;
                    if (
                      i != 0 &&
                      value["score"] == this.state.tr[i - 1]["score"] &&
                      value["time"] == this.state.tr[i - 1]["time"]
                    ) {
                      value["rank"] = this.state.tr[i - 1]["rank"];
                    }
                    if (i < 10 || i == this.state.trindex) {
                      return (
                        <tr
                          key={i}
                          style={{
                            animation: `general 0.3s ${
                              (i > 10 ? 10 : i) / 10
                            }s forwards`,
                          }}
                          className={
                            i == this.state.trindex ? "player-score" : ""
                          }
                        >
                          <td>{value["rank"]}</td>
                          <td>{value["name"]}</td>
                          <td>{value["score"]}</td>
                          <td>{value["time"]}</td>
                        </tr>
                      );
                    }
                  })}
                  <tr style={{ animation: `general 0.3s 1s forwards` }}>
                    <td colSpan="4">
                      <button
                        className="btn btn-restart"
                        onClick={() => {
                          this.props.palye();
                        }}
                      >
                        Start Game
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              className="player"
              style={
                this.state.style ? this.state.style : this.state.Animation1
              }
              onAnimationEnd={this.onbbb.bind(this)}
              data-actions={this.state.actions.l}
            ></div>
            {this.state.Div.map((value, i) => {
              if (value.name === "friend collision") {
                return (
                  <div
                    key={i}
                    className={"friend collision"}
                    style={{
                      top: value.age1,
                      animationDuration: value.age2,
                      animationPlayState: this.state.actions.playing
                        ? "running"
                        : "paused",
                    }}
                    data-score="-10"
                    data-fuel="-150"
                    data-life="1"
                    data-destroy="true"
                    data-key={i}
                    onAnimationEnd={this.tops.bind(this)}
                  ></div>
                );
              }
              if (value.name === "enemy collision") {
                return (
                  <div
                    key={i}
                    className={"enemy collision"}
                    style={{
                      top: value.age1,
                      animationDuration: value.age2,
                      animationPlayState: this.state.actions.playing
                        ? "running"
                        : "paused",
                    }}
                    data-score="5"
                    data-fuel="-150"
                    data-life="1"
                    data-shot="true"
                    data-destroy="true"
                    data-key={i}
                    onAnimationEnd={this.tops.bind(this)}
                  ></div>
                );
              }
              if (value.name === "aestroid aestroid") {
                return (
                  <div
                    key={i}
                    className={value.classname}
                    style={{
                      top: value.age1,
                      animationDuration: value.age2,
                      animationPlayState: this.state.actions.playing
                        ? "running"
                        : "paused",
                    }}
                    data-score="10"
                    data-fuel="-150"
                    data-life="2"
                    data-destroy="true"
                    data-key={i}
                    onAnimationEnd={this.tops.bind(this)}
                  ></div>
                );
              }
              if (value.name === "fuel collision") {
                return (
                  <div
                    key={i}
                    className={"fuel collision"}
                    style={{
                      left: value.age1,
                      animationDuration: value.age2,
                      animationPlayState: this.state.actions.playing
                        ? "running"
                        : "paused",
                    }}
                    data-score="0"
                    data-fuel="150"
                    data-key={i}
                    onAnimationEnd={this.tops.bind(this)}
                  ></div>
                );
              }
              if (value.name === "bullet collision1") {
                return (
                  <div
                    key={i}
                    data-key={i}
                    className="bullet collision1"
                    onAnimationEnd={this.tops.bind(this)}
                    style={{
                      left: value.left,
                      top: value.top,
                      animationPlayState: this.state.actions.playing
                        ? "running"
                        : "paused",
                    }}
                  ></div>
                );
              }
              if (value.name === "layer-red") {
                return (
                  <div
                    className="layer-red"
                    key={i}
                    data-key={i}
                    onAnimationEnd={this.tops.bind(this)}
                  ></div>
                );
              }
              if (value.name === "score-counter score") {
                return (
                  <div
                    key={i}
                    className={value.classname}
                    style={{
                      left: value.left,
                      top: value.top,
                      animationPlayState: this.state.actions.playing
                        ? "running"
                        : "paused",
                    }}
                  >
                    {value.score}
                  </div>
                );
              }
              if (value.name === "audio") {
                //音频软件
                return (
                  <audio
                    className="Audio"
                    key={i}
                    src={require("./sound/background.mp3")}
                    autoPlay
                    loop
                  ></audio>
                );
              }
              if (value.name === "shoot") {
                //音频软件
                return (
                  <audio
                    key={i}
                    onEnded={this.tops.bind(this)}
                    src={require("./sound/shoot.mp3")}
                    autoPlay
                  ></audio>
                );
              }
              if (value.name === "enemy-bullet collision") {
                return (
                  <div
                    key={i}
                    data-key={i}
                    className={"enemy-bullet collision"}
                    style={{
                      left: value.left,
                      top: value.top,
                      animationDuration: value.age1,
                      animationPlayState: this.state.actions.playing
                        ? "running"
                        : "paused",
                    }}
                    data-score="0"
                    data-fuel="-150"
                    onAnimationEnd={this.tops.bind(this)}
                  ></div>
                );
              }
            })}
          </div>
        }
        {/* props */}
      </>
    );
  }
}

export default App3;
