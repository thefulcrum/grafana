package graphite

import (
	"github.com/grafana/grafana/pkg/components/null"
)

type TargetResponseDTO struct {
<<<<<<< HEAD
	Target     string                       `json:"target"`
	DataPoints plugins.DataTimeSeriesPoints `json:"datapoints"`
	// Graphite <=1.1.7 may return some tags as numbers requiring extra conversion. See https://github.com/grafana/grafana/issues/37614
	Tags map[string]interface{} `json:"tags"`
=======
	Target     string               `json:"target"`
	DataPoints DataTimeSeriesPoints `json:"datapoints"`
	// Graphite <=1.1.7 may return some tags as numbers requiring extra conversion. See https://github.com/grafana/grafana/issues/37614
	Tags map[string]any `json:"tags"`
>>>>>>> v12.1.0
}

type DataTimePoint [2]null.Float
type DataTimeSeriesPoints []DataTimePoint
