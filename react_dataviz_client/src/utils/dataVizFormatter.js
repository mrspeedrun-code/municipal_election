const dataVizFormatter = (candidat, vote, politique) => {
  return {
    'candidat': candidat,
    'nb_vote': vote,
    'partie': politique,
    'arrondissement': '1',
    'tour': '1'
  }
}

export default dataVizFormatter