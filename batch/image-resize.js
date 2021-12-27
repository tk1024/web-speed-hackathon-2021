const fs = require("fs")
const sharp = require("sharp")

const imageBasePath = __dirname + "/../public/images"
const profileImageBasePath = __dirname + "/../public/images/profiles"

const recreateImage = async () => {
  const imagePaths = fs.readdirSync(imageBasePath).filter(name => name.indexOf(".jpg") > -1)

  const settings = [
    { width: 574, suffix: "" },
    { width: 245, suffix: "-small" },
  ]

  // AVIF
  await Promise.all(imagePaths.map(async (path) => {
    const imageId = path.replace(".jpg", "")
    const inputPath = `${imageBasePath}/${imageId}.jpg`

    return settings.map(async (setting) => {
      const outputPath = `${imageBasePath}/${imageId}${setting.suffix}.avif`
      return sharp(inputPath).resize({ width: setting.width }).avif({
        chromaSubsampling: "4:2:0",
      }).toFile(outputPath)
    })
  }))

}

const recreateProfileImage = async () => {
  const imagePaths = fs.readdirSync(profileImageBasePath).filter(name => name.indexOf(".jpg") > -1)

  const settings = [
    { width: 128, suffix: "" },
  ]

  // AVIF
  await Promise.all(imagePaths.map(async (path) => {
    const imageId = path.replace(".jpg", "")
    const inputPath = `${profileImageBasePath}/${imageId}.jpg`

    return settings.map(async (setting) => {
      const outputPath = `${profileImageBasePath}/${imageId}${setting.suffix}.avif`
      return sharp(inputPath).resize({ width: setting.width }).avif({
        chromaSubsampling: "4:2:0",
      }).toFile(outputPath)
    })
  }))

}

const main = async () => {
  await recreateImage()
  await recreateProfileImage()
}

main()