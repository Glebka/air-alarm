const Crawler = require("crawler");
const play = require("audio-play");
const load = require("audio-loader");

let lastNewsItemTimestamp = 0;
let lastNewsItemText = null;
let alarmEnabled = false;

const disableAlarmKeywords = ["відбій повітряної тривоги"];
const enableAlarmKeywords = ["повітряна тривога", "тривога!"];

function shouldEnableAlarm(text) {
  const votesForEnabling = enableAlarmKeywords.map(phrase =>
    text.includes(phrase)
  );
  const votesForDisabling = disableAlarmKeywords.map(phrase =>
    text.includes(phrase)
  );
  const shouldEnable = votesForEnabling.find(id => id);
  const shouldDisable = votesForDisabling.find(id => id);
  return (!shouldEnable && !shouldDisable) || (shouldEnable && shouldDisable)
    ? undefined
    : !!shouldEnable;
}

function playAudioInLoop() {
  let playback = null;
  // https://freesound.org/people/pogmothoin/sounds/351284/
  load("./notification.wav").then(buf => {
    playback = play(buf, { loop: true });
  });
  return () => {
    playback.pause();
  };
}

// https://stackoverflow.com/questions/19687407/press-any-key-to-continue-in-nodejs
const keypress = async () => {
  process.stdin.setRawMode(true);
  return new Promise(resolve =>
    process.stdin.once("data", data => {
      const byteArray = [...data];
      if (byteArray.length > 0 && byteArray[0] === 3) {
        console.log("^C");
        process.exit(1);
      }
      process.stdin.setRawMode(false);
      resolve();
    })
  );
};

let stopPlayback = null;

const c = new Crawler({
  maxConnections: 1,
  forceUTF8: true,
  jQuery: {
    name: "cheerio",
    options: {
      normalizeWhitespace: false,
      xmlMode: false,
      decodeEntities: true
    }
  },
  callback: (error, res, done) => {
    if (error) {
      console.error(`${new Date()} > ${error}`);
    } else {
      const $ = res.$;
      console.log(
        `${new Date()} > Checking news on the site ${$("title").text()}...`
      );
      const latestNewsItemTimestamp = Date.parse(
        $("div#tab1 .pagination li time")
          .first()
          .attr("datetime")
      );
      if (latestNewsItemTimestamp > lastNewsItemTimestamp) {
        lastNewsItemTimestamp = latestNewsItemTimestamp;
        lastNewsItemText = $("div#tab1 .pagination li")
          .first()
          .text()
          .toLowerCase()
          .split("\n")
          .map(t => t.trim())
          .join(" ");
        console.log(`${new Date()} > ${lastNewsItemText}`);
        const enableOrNot = shouldEnableAlarm(lastNewsItemText);
        if (enableOrNot !== undefined) {
          const requestEnableAlarm = enableOrNot;
          if (!alarmEnabled && requestEnableAlarm) {
            console.log(`${new Date()} > ALARM! Press any key to dismiss.`);
            if (stopPlayback) {
              stopPlayback();
            }
            stopPlayback = playAudioInLoop();
          } else {
            if (alarmEnabled && !requestEnableAlarm) {
              console.log(`${new Date()} > ALL GOOD NOW :) Disabling alarm`);
              if (stopPlayback) {
                stopPlayback();
              }
            } else {
              console.log(
                `${new Date()} > Do nothing. alarmEnabled=${alarmEnabled}, requestEnableAlarm=${requestEnableAlarm}`
              );
            }
          }
          alarmEnabled = requestEnableAlarm;
        } else {
          console.log(
            `${new Date()} > Looks like above news are not related to air alarm. Do nothing.`
          );
        }
      } else {
        console.log(`${new Date()} > Nothing new happened...`);
      }
    }
    done();
  }
});

(async () => {
  while (true) {
    await keypress();
    if (alarmEnabled) {
      alarmEnabled = false;
      console.log(`${new Date()} > Alarm dismissed by user.`);
      if (stopPlayback) {
        stopPlayback();
      }
    }
  }
})();

c.queue({ uri: "https://omr.gov.ua/", timeout: 5000 });

setInterval(() => {
  c.queue({ uri: "https://omr.gov.ua/", timeout: 5000 });
}, 1000 * 60 * 3);


/** Tests */

/*c.queue({
  html: `<div id="tab1" class="" style="display: block;">
<div class="slideshow gallery-js-ready autorotation-disabled">
    <div class="pagination">
        <ul>
            <li>
                <a href="#">
                    <time class="date" datetime="2022-02-27 17:48"><i>27 лютого</i> <span>17:48</span></time>
                    <strong class="title">Де українці можуть отримати допомогу в Румунії. Фото</strong>
                </a>
            </li>
        </ul>
    </div>
</div>
</div>`
});

setTimeout(() => {
  c.queue({
    html: `<div id="tab1" class="" style="display: block;">
      <div class="slideshow gallery-js-ready autorotation-disabled">
          <div class="pagination">
              <ul>
              <li>
              <a href="#">
                  <time class="date" datetime="2022-02-27 18:50"><i>27 лютого</i> <span>18:50</span></time>
                  <strong class="title">Увага всім: повітряна тривога! Негайно в укриття</strong>
              </a>
          </li>
          <li>
                      <a href="#">
                          <time class="date" datetime="2022-02-27 17:48"><i>27 лютого</i> <span>17:48</span></time>
                          <strong class="title">Де українці можуть отримати допомогу в Румунії. Фото</strong>
                      </a>
                  </li>
              </ul>
          </div>
      </div>
      </div>`
  });
}, 3 * 1000);

setTimeout(() => {
    c.queue({
      html: `<div id="tab1" class="" style="display: block;">
        <div class="slideshow gallery-js-ready autorotation-disabled">
            <div class="pagination">
                <ul>
                <li>
                <a href="#">
                    <time class="date" datetime="2022-02-27 18:50"><i>27 лютого</i> <span>18:50</span></time>
                    <strong class="title">Увага всім: повітряна тривога! Негайно в укриття</strong>
                </a>
            </li>
            <li>
                        <a href="#">
                            <time class="date" datetime="2022-02-27 17:48"><i>27 лютого</i> <span>17:48</span></time>
                            <strong class="title">Де українці можуть отримати допомогу в Румунії. Фото</strong>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        </div>`
    });
  }, 15 * 1000);

setTimeout(() => {
  c.queue({
    html: `<div id="tab1" class="" style="display: block;">
      <div class="slideshow gallery-js-ready autorotation-disabled">
          <div class="pagination">
              <ul>
              <li class="active">
                                                      <a href="#">
                                                          <time class="date" datetime="2022-02-27 19:15"><i>27 лютого</i> <span>19:15</span></time>
                                                          <strong class="title">В Одесі відбій повітряної тривоги</strong>
                                                      </a>
                                                  </li>
              <li>
              <a href="#">
                  <time class="date" datetime="2022-02-27 18:50"><i>27 лютого</i> <span>18:50</span></time>
                  <strong class="title">Увага всім: повітряна тривога! Негайно в укриття</strong>
              </a>
          </li>
          <li>
                      <a href="#">
                          <time class="date" datetime="2022-02-27 17:48"><i>27 лютого</i> <span>17:48</span></time>
                          <strong class="title">Де українці можуть отримати допомогу в Румунії. Фото</strong>
                      </a>
                  </li>
              </ul>
          </div>
      </div>
      </div>`
  });
}, 23 * 1000);*/
