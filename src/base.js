var Base = {
  sortAlphabetical(array, by) {
    const sortedArray = array.slice();
    sortedArray.sort((a, b) => {
      return a[by].toUpperCase() > b[by].toUpperCase() ? 1 : -1;
    });
    return sortedArray;
  },

  label() {
    return 'todo example';
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
  }
};

module.exports = Base;
