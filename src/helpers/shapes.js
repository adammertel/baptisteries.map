var Shapes = {
  colors: [
    "#e41a1c",
    "#377eb8",
    "#4daf4a",
    "#984ea3",
    "#ff7f00",
    "#ffff33",
    "#a65628",
    "#f781bf",
    "#999999",
    "black",
  ],
  shapesDictionary: [
    {
      label: "rectangle",
      values: ["rectangle"],
      icon: "9646",
      color: 0,
    },
    {
      label: "square",
      values: ["square"],
      icon: "9632",
      color: 1,
    },
    {
      label: "circle",
      values: ["round", "circle", "semicircle", "three-quarter round", "oval"],
      icon: "9679",
      color: 2,
    },
    {
      label: "central building",
      values: ["central building"],
      icon: "9711",
      color: 3,
    },
    {
      label: "inside a church",
      values: ["inside a church"],
      icon: "10752",
      color: 4,
    },
    {
      label: "cross",
      values: ["cross"],
      icon: "10010",
      color: 5,
    },
    {
      label: "foil",
      values: ["trefoil", "quatrefoil", "octofoil"],
      icon: "9827",
      color: 6,
    },
    {
      label: "polygon",
      values: [
        "triangle",
        "hexagon",
        "octogon",
        "dodekagon",
        "dekagon",
        "heptagon",
      ],
      icon: "11039",
      color: 7,
    },
    {
      label: "other",
      values: [
        "trapezoid",
        "irregular",
        "other",
        "polygon",
        "horseshoe",
        "rosette",
      ],
      icon: "9676",
      color: 8,
    },
    {
      label: "unknown",
      values: ["", "unknown"],
      icon: "?",
      color: 9,
    },
  ],
  defaultShape: () => {
    return Shapes.getShape("other");
  },
  getIcon: (shapeValue, label = false) => {
    const shape = Shapes.getShape(shapeValue, label);
    return shape ? String.fromCharCode(shape.icon) : false;
  },
  getShape: (shapeValue, label = false) => {
    const shape = Shapes.shapesDictionary.find((s) => {
      return label ? s.label === shapeValue : s.values.includes(shapeValue);
    });
    return shape || Shapes.defaultShape();
  },
  getLabel: (shapeValue) => {
    const shape = Shapes.getShape(shapeValue);
    return shape ? shape.label : false;
  },
  getColor: (shapeValue, label = false) => {
    const shape = Shapes.getShape(shapeValue, label);
    return shape ? Shapes.colors[shape.color] : false;
  },
  getIndex: (shapeValue, label = false) => {
    const shape = Shapes.getShape(shapeValue, label);
    return Shapes.shapesDictionary.indexOf(shape);
  },
  sortByIndex: (a, b) => {
    const idA = Shapes.getIndex(a.label, true);
    const idB = Shapes.getIndex(b.label, true);
    return idA > idB ? 1 : -1;
  },
};

module.exports = Shapes;
