from geojson import GeometryCollection, Point, Feature, FeatureCollection
import csv
import codecs

features = []
baptisterias = csv.DictReader(codecs.open('./Christian Baptisteries, 3rd-11th c. - Baptisteries.csv', 'rU'), delimiter=',', quotechar='"')
for ri, row in enumerate(baptisterias):
    if row['Certainty'] == 'certain or very probable':
        props = {
            "name": row['Localisation'],
            "date": row['Date_average'],
            "shape": row['Building_shape_1'],
            "specification": row['Place_specification']
        }
        try:
            #print(float(row['X_coordinates']))
            point = Point([float(row['X_coordinates']), float(row['Y_coordinates'])])
            feature = Feature(geometry=point, properties=props)
            features.append(feature)
        except:
            print('not possible to parse', row)

f = open('baptisteries.geojson', 'w+')
f.write(str(FeatureCollection(features)))
