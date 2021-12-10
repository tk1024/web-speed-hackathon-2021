const { promises: fs } = require('fs');
const sharp = require('sharp');

const imageBasePath = __dirname + "/../public/images"
const seedJsonPath = __dirname + "/../server/seeds"

const renameImageId = async () => {
  let imageSeeds = await fs.readFile(`${seedJsonPath}/images.json`)

  const parsedImageSeeds = JSON.parse(imageSeeds)

  for (const key in parsedImageSeeds) {
    const current = parsedImageSeeds[key]
    const imageFile = await fs.readFile(`${imageBasePath}/${current.id}.avif`)
    const { width, height } = await sharp(imageFile).metadata()
    const newId = [current.id, width, height].join("-")
    current.id = newId
    await fs.writeFile(`${imageBasePath}/${current.id}.avif`, imageFile)
  }

  fs.writeFile(`${seedJsonPath}/images.json`, JSON.stringify(parsedImageSeeds))
}

const renameProfileImageId = async () => {
  let imageSeeds = await fs.readFile(`${seedJsonPath}/profileImages.json`)

  const parsedImageSeeds = JSON.parse(imageSeeds)

  for (const key in parsedImageSeeds) {
    const current = parsedImageSeeds[key]
    const imageFile = await fs.readFile(`${imageBasePath}/profiles/${current.id}.avif`)
    const { width, height } = await sharp(imageFile).metadata()
    const newId = [current.id, width, height].join("-")
    current.id = newId
    await fs.writeFile(`${imageBasePath}/profiles/${current.id}.avif`, imageFile)
  }

  fs.writeFile(`${seedJsonPath}/profileImages.json`, JSON.stringify(parsedImageSeeds))
}

const replacePost = async () => {
  const imageSeeds = await fs.readFile(`${seedJsonPath}/images.json`)
  let relation = await fs.readFile(`${seedJsonPath}/posts.json`, { encoding: "utf8" })

  const parsedImageSeeds = JSON.parse(imageSeeds)

  for (const { id } of parsedImageSeeds) {
    const width = id.split("-")[5]
    const height = id.split("-")[6]
    const baseId = id.replace(`-${width}`, "").replace(`-${height}`, "")
    relation = relation.replaceAll(baseId, id)
  }

  await fs.writeFile(`${seedJsonPath}/posts.json`, relation)
}

const replacePostImageRelation = async () => {
  const imageSeeds = await fs.readFile(`${seedJsonPath}/images.json`)
  let relation = await fs.readFile(`${seedJsonPath}/postsImagesRelation.json`, { encoding: "utf8" })

  const parsedImageSeeds = JSON.parse(imageSeeds)

  for (const { id } of parsedImageSeeds) {
    const width = id.split("-")[5]
    const height = id.split("-")[6]
    const baseId = id.replace(`-${width}`, "").replace(`-${height}`, "")
    relation = relation.replaceAll(baseId, id)
  }

  await fs.writeFile(`${seedJsonPath}/postsImagesRelation.json`, relation)
}

const replaceUserImage = async () => {
  const imageSeeds = await fs.readFile(`${seedJsonPath}/profileImages.json`)
  let relation = await fs.readFile(`${seedJsonPath}/users.json`, { encoding: "utf8" })

  const parsedImageSeeds = JSON.parse(imageSeeds)

  for (const { id } of parsedImageSeeds) {
    const width = id.split("-")[5]
    const height = id.split("-")[6]
    const baseId = id.replace(`-${width}`, "").replace(`-${height}`, "")
    relation = relation.replaceAll(baseId, id)
  }

  await fs.writeFile(`${seedJsonPath}/users.json`, relation)
}

const main = async () => {
  await renameImageId()
  await renameProfileImageId()
  await replacePost()
  await replacePostImageRelation()
  await replaceUserImage()
}

main()