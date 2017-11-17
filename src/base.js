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
  }
};

module.exports = Base;
