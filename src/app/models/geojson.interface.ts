export interface GeoJSONFeature {
    type: string;
    properties: { [key: string]: any };
    geometry: any; // Adjust as needed based on your geometry type (Point, Polygon, etc.)
}
  
export interface GeoJSONData {
    type: string;
    features: GeoJSONFeature[];
}