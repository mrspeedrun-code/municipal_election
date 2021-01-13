const dataVizFormatter = (candidat, politique, count) => {
  return {
    'candidat': candidat,
    'partie': politique,
    'arrondissement': count
  }
}

export default dataVizFormatter