const fs = require("fs")
const { createFFmpeg } = require('@ffmpeg/ffmpeg');
const ffmpeg = createFFmpeg({ log: true });

async function convertMovie(buffer, options) {
  const cropOptions = ["'min(iw,ih)':'min(iw,ih)'", options.size ? `scale=${options.size}:${options.size}` : undefined]
    .filter(Boolean)
    .join(',');

  const exportFile = `export.${options.extension ?? 'webm'}`;

  if (ffmpeg.isLoaded() === false) {
    await ffmpeg.load();
  }

  ffmpeg.FS('writeFile', 'file', new Uint8Array(buffer));

  await ffmpeg.run(...['-i', 'file', '-t', '5', '-threads', '6', '-vf', `crop=${cropOptions}`, '-an', exportFile]);

  return ffmpeg.FS('readFile', exportFile);
}

const main = async () => {
  const movieBasePath = __dirname + "/../public/movies"
  const moviePaths = fs.readdirSync(movieBasePath).filter(name => name.indexOf(".gif") > -1)

  for (const path of moviePaths) {
    console.log(path)
    const inputPath = `${movieBasePath}/${path}`
    const outputPath = `${movieBasePath}/${path.replace("gif", "webm")}`
    const buffer = fs.readFileSync(inputPath)

    const converted = await convertMovie(buffer, {
      size: 574,
    })
    fs.writeFileSync(outputPath, converted);
  }

}

main()