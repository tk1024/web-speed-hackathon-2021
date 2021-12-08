const fs = require("fs")
const sharp = require("sharp")

const main = async () => {
  const imageBasePath = __dirname + "/../public/images"
  const imagePaths = fs.readdirSync(imageBasePath).filter(name => name.indexOf(".jpg") > -1)
  const profileImagePaths = fs.readdirSync(imageBasePath + "/profiles").filter(name => name.indexOf(".jpg") > -1)

  await Promise.all(imagePaths.map(path => {
    const inputPath = `${imageBasePath}/${path}`
    const outputPath = `${imageBasePath}/${path.replace("jpg", "avif")}`

    return sharp(inputPath).resize({ width: 1024 }).avif({
      chromaSubsampling: "4:2:0",
    }).toFile(outputPath)
  }))

  await Promise.all(profileImagePaths.map(path => {
    const input = `${imageBasePath}/profiles/${path}`
    const output = `${imageBasePath}/profiles/${path.replace("jpg", "avif")}`

    return sharp(input).resize({ width: 128 }).avif({
      chromaSubsampling: "4:2:0",
    }).toFile(output)
  }))

}

main()