import { FeatureLike } from 'ol/Feature';
<<<<<<< HEAD
import { SimpleGeometry } from 'ol/geom';
import { Layer } from 'ol/layer';
import { DataHoverPayload } from '@grafana/data';

export interface GeomapHoverFeature {
  feature: FeatureLike;
  layer: Layer;
  geo: SimpleGeometry;
}

export interface GeomapHoverPayload extends DataHoverPayload {
  features?: GeomapHoverFeature[];
=======

import { DataHoverPayload } from '@grafana/data';

import { MapLayerState } from './types';

export interface GeomapLayerHover {
  layer: MapLayerState;
  features: FeatureLike[];
}

export interface GeomapHoverPayload extends DataHoverPayload {
  // List of layers
  layers?: GeomapLayerHover[];

  // Global mouse coordinates for the hover layer
>>>>>>> v12.1.0
  pageX: number;
  pageY: number;
}
