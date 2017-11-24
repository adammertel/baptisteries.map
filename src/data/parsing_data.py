from geojson import GeometryCollection, Point, Feature, FeatureCollection
import csv
import codecs

features = []
baptisterias = csv.DictReader(codecs.open('./Christian Baptisteries, 3rd-11th c. - Baptisteries.csv', 'rU'), delimiter=',', quotechar='"')
for ri, row in enumerate(baptisterias):
    if row['Certainty'] == 'certain or very probable':
        try:
            props = {
                "name": row['Place_name_modern'],
                "date": int(row['Date_average'], 10),
                "date_after": int(row['Built_after_or_in'], 10),
                "date_before": int(row['Built_before_or_in'], 10),
                "shape": row['Building_shape_1'].strip(),
                "piscina_shape": row['Piscina_shape_1'],
                "piscina_depth": int(row['Piscina_depth_cm']),
                "localisation_certainty": row['Localisation_certainty']
            }
            #print(float(row['X_coordinates']))
            point = Point([float(row['X_coordinates']), float(row['Y_coordinates'])])
            feature = Feature(geometry=point, properties=props)
            features.append(feature)
        except:
            print('not possible to parse', row)

f = open('baptisteries.geojson', 'w+')
f.write(str(FeatureCollection(features)))
