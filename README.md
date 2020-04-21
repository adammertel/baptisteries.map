# Christian Baptisteries map

[map](http://dissinet.cz/maps/baptisteries/)

<img src="./public/screen1.png" alt="screenshot1" height="250" />
<img src="./public/screen2.png" alt="screenshot2" height="250" />

This interactive map visualizes a database of Christian baptisteries built
between the 3rd and 12th centuries. The database is a digital adaptation and
formalization of the most complete (as of 2017) catalogue of baptisteries by
Sebastian Ristow (_Frühchristliche Baptisterien_, Münster: Aschendorffsche
Verlagsbuchhandlung, 1998) and was compiled by Hana Hořínková in the framework
of her [B.A. thesis](http://is.muni.cz/th/439223/ff_b/?lang=en) at Masaryk
University’s Department for the Study of Religions (2017), supervised by
[David Zbíral](http://www.david-zbiral.cz/). The map was conceived and created
by [Adam Mertel](https://github.com/adammertel) (Masaryk University, Department
of Geography).

Of all 1067 buildings in Ristow’s catalogue, this visualization takes into
account only those whose existence and function as baptisteries is considered
certain or very probable and which, at the same time, were successfully
localised (778 records, which amounts to 98.1 % of all certain or very probable
baptisteries catalogued by Ristow). The localisation has three degrees of
certainty:

- **precise** when the building is localised to a particular settlement
- **approximate** when the particular settlement was not found but a
  nearby settlement was
- **ambiguous** when there were more candidates and only one, the most probable,
  alternative had to be chosen.

The degree of certainty of the localisation of a particular baptistery can be
displayed under the individual record by clicking on the icon of that particular
baptistery. This appears with some further data: modern place name, building
shape,{' '} _terminus post quem_ (“built after or in”), _terminus ante quem_
(“built before or in”), the mean value between the _terminus post quem_{' '} and
_ante quem_, piscina shape, and piscina depth.

When zoomed out, the map shows a hexagonal grid. The shade of an individual
hexagon denotes the median of the mean values between the _terminus post quem_
and _ante quem_ of all baptisteries in that hexagon; the darker the shade, the
earlier the date. When zoomed in, the map shows icons of individual baptisteries
or several aggregated baptisteries (in the latter case, their number is
displayed). The shape in the icon translates to the shape of the building (see
the legend below).

The records displayed can be filtered in two ways:

- (un)checking individual building shapes filters the dataset by building shape
- the timeline can be limited in order to display only a part of the whole
  dataset whose dates(based on the mean values between the _terminus post quem_
  and _ante quem_) fall between the dates selected by the user. Dragging the
  slider, or turning the mouse wheel over it allows the user to move through
  time and see new baptisteries appear.

When zooming out to the level of hexagons and moving the slider, the shade of
the hexagons also changes, showing the change in the calculated median of the
mean dates of baptisteries in that hexagon.

The base map can be selected under the icon in the upper right corner.

## Static maps

three static maps were produced:

- [building shape - small multiples](http://dissinet.cz/maps/baptisteries/multiples)
- [building shape - hexgrid + pie charts](https://dissinet.cz/maps/baptisteries/shape/)
- [piscina - hexgrid + pie charts](http://http://dissinet.cz/maps/baptisteries/piscina)

<img src="./public/static_piscina.png" alt="screenshot3" height="250" />
<img src="./public/static_shape.png" alt="screenshot4" height="250" />
<img src="./public/static_multiples.png" alt="screenshot5" height="250" />

## Recommended citation

`RISTOW, S., A. MERTEL, H. HOŘÍNKOVÁ, D. ZBÍRAL (2017). Christian baptisteries: interactive map (version 1.0.1). Available online at <http://dissinet.cz/maps/baptisteries/>.`
