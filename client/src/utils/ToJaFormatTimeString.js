const ToJaFormatTimeString = (date) => {
  return new Date(date).toISOString().replace(/(\d+)-(\d+)-(\d+).+/, (_, y, m, d) => `${Number(y)}年${Number(m)}月${Number(d)}日`)
}

export { ToJaFormatTimeString }