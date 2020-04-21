var Base = {
  getJSONData(path, next) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", path, true);
    xobj.onreadystatechange = () => {
      if (xobj.readyState === 4 && xobj.status === 200) {
        console.log(xobj.responseText);
        next(JSON.parse(xobj.responseText));
      }
    };
    xobj.send(null);
  },

  validGeo(feat) {
    return !!(
      feat &&
      (feat.x || feat[0]) &&
      (feat.y || feat[1]) &&
      (isFinite(feat.x) || isFinite(feat[0])) &&
      (isFinite(feat.y) || isFinite(feat[1]))
    );
  },

  compareShapes(sh1, sh2) {
    let same = true;
    Object.keys(sh1).map((sk1) => {
      if (sh2[sk1] !== sh1[sk1]) {
        same = false;
      }
    });
    return same;
  },

  clearSelection() {
    if (document.selection) {
      document.selection.empty();
    } else if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
  },
};

module.exports = Base;
