from geojson import GeometryCollection, Point, Feature, FeatureCollection
import csv
import codecs
import math

def parseNumber(value):
    try:
        return int(value)
    except: 
        return False

features = []
baptisterias = csv.DictReader(codecs.open('./Christian Baptisteries, 3rd-11th c. - Baptisteries.csv', 'rU'), delimiter=',', quotechar='"')
for ri, row in enumerate(baptisterias):
    if row['Certainty'] == 'certain or very probable':
        try:
            props = {
                "name": row['Place_name_modern'],
                "date": parseNumber(row['Date_average']),
                "date_after": parseNumber(row['Built_after_or_in']),
                "date_before": parseNumber(row['Built_before_or_in']),
                "shape": row['Building_shape_1'].strip(),
                "piscina_shape": row['Piscina_shape_1'].strip(),
                "piscina_depth": parseNumber(row['Piscina_depth_cm']),
                "piscina_depth": parseNumber(row['Piscina_depth_cm']),
                "ciborium": row['Piscina_depth_cm'] == 'y',
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
print(len(features))
