const fs = require("fs")
const _ = require('lodash');
const { AudioContext } = require('web-audio-api')

async function calculate(data) {
  const audioCtx = new AudioContext();

  // 音声をデコードする
  /** @type {AudioBuffer} */
  const buffer = await new Promise((resolve, reject) => {
    audioCtx.decodeAudioData(data.slice(0), resolve, reject);
  });
  // 左の音声データの絶対値を取る
  const leftData = buffer.getChannelData(0).map(Math.abs);
  // 右の音声データの絶対値を取る
  const rightData = buffer.getChannelData(1).map(Math.abs);

  // 左右の音声データの平均を取る
  const normalized = _.zip(leftData, rightData).map(_.mean);
  // 100 個の chunk に分ける
  const chunks = _.chunk(normalized, Math.ceil(normalized.length / 100));
  // chunk ごとに平均を取る
  const peaks = chunks.map(_.mean);
  // chunk の平均の中から最大値を取る
  const max = _.max(peaks);

  return { max, peaks };
}

/**
 * @typedef {object} Props
 * @property {ArrayBuffer} soundData
 */

/**
 * @type {React.VFC<Props>}
 */
const createSVG = async (soundPath) => {
  const buffer = fs.readFileSync(soundPath)
  const { max, peaks } = await calculate(buffer)

  return (
    `${peaks.map((peak, idx) => {
      const ratio = peak / max;
      return `<rect fill="#2563EB" height="${ratio}" width="1" x="${idx}" y="${1 - ratio}" />`
    })}`
  )

};

const main = async () => {
  const soundBasePath = __dirname + "/../public/sounds"
  const soundSvgBasePath = __dirname + "/../public/sound-svgs"
  const soundPaths = fs.readdirSync(soundBasePath).filter(name => name.indexOf(".mp3") > -1)

  for (const path of soundPaths) {
    const svg = await createSVG(`${soundBasePath}/${path}`)
    fs.writeFileSync(`${soundSvgBasePath}/${path.replace("mp3", "svg")}`, svg)
  }

}

main()