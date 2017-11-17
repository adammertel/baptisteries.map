var Base = {
  doRequestSync(url) {
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('GET', url, false);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.send();

    if (xhr.status === 200) {
      return xhr.responseText;
    } else {
      return {};
    }
  },

  doRequestAsync(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    //xhr.withCredentials = true;
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://adam:8080');

    xhr.setRequestHeader('X-PINGOTHER', 'pingpong');
    xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhr.onload = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          return xhr.responseText;
        } else {
          //console.log(xhr.statusText);
          return {};
        }
      } else {
        return {};
      }
    };

    xhr.send();
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
    Object.keys(sh1).map(sk1 => {
      if (sh2[sk1] !== sh1[sk1]) {
        same = false;
      }
    });
    return same;
  },

  getData(path, next) {
    const req = new XMLHttpRequest();
    req.open('GET', path, true);
    req.withCredentials = false;
    req.send();
    const success = out => {
      console.log(out);
      next(JSON.parse(out.responseText));
    };
    const error = status => {
      console.log(status);
      next(false);
    };

    req.onreadystatechange = function() {
      if (req.readyState == 4) {
        return req.status === 200 ? success(req) : error(req.status);
      }
    };
  },

  requestConfigFile(configName, sync, next = false) {
    const configPath = './' + configName;
    if (sync) {
      return JSON.parse(this.doRequestSync(configPath));
    } else {
      this.doRequest(configPath, response => {
        next(JSON.parse(response));
      });
    }
  },

  createCSSSelector(selector, style) {
    if (!document.styleSheets) return;
    if (document.getElementsByTagName('head').length == 0) return;

    var styleSheet, mediaType;

    if (document.styleSheets.length > 0) {
      for (var i = 0, l = document.styleSheets.length; i < l; i++) {
        if (document.styleSheets[i].disabled) continue;
        var media = document.styleSheets[i].media;
        mediaType = typeof media;

        if (mediaType === 'string') {
          if (media === '' || media.indexOf('screen') !== -1) {
            styleSheet = document.styleSheets[i];
          }
        } else if (mediaType == 'object') {
          if (
            media.mediaText === '' ||
            media.mediaText.indexOf('screen') !== -1
          ) {
            styleSheet = document.styleSheets[i];
          }
        }

        if (typeof styleSheet !== 'undefined') break;
      }
    }

    if (typeof styleSheet === 'undefined') {
      var styleSheetElement = document.createElement('style');
      styleSheetElement.type = 'text/css';
      document.getElementsByTagName('head')[0].appendChild(styleSheetElement);

      for (i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].disabled) {
          continue;
        }
        styleSheet = document.styleSheets[i];
      }

      mediaType = typeof styleSheet.media;
    }

    if (mediaType === 'string') {
      for (var i = 0, l = styleSheet.rules.length; i < l; i++) {
        if (
          styleSheet.rules[i].selectorText &&
          styleSheet.rules[i].selectorText.toLowerCase() ==
            selector.toLowerCase()
        ) {
          styleSheet.rules[i].style.cssText = style;
          return;
        }
      }
      styleSheet.addRule(selector, style);
    } else if (mediaType === 'object') {
      var styleSheetLength = styleSheet.cssRules
        ? styleSheet.cssRules.length
        : 0;
      for (var i = 0; i < styleSheetLength; i++) {
        if (
          styleSheet.cssRules[i].selectorText &&
          styleSheet.cssRules[i].selectorText.toLowerCase() ==
            selector.toLowerCase()
        ) {
          styleSheet.cssRules[i].style.cssText = style;
          return;
        }
      }
      console.log(selector);
      styleSheet.insertRule(selector + '{' + style + '}', styleSheetLength);
    }
  }
};

module.exports = Base;
