package tempo

import (
	"context"
	"fmt"
	"net/http"
	"runtime"
	"strings"

<<<<<<< HEAD
	"github.com/grafana/grafana-plugin-sdk-go/data"
	"github.com/grafana/grafana/pkg/infra/httpclient"
	"github.com/grafana/grafana/pkg/infra/log"
	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/plugins"

	otlp "go.opentelemetry.io/collector/model/otlp"
=======
	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/datasource"
	"github.com/grafana/grafana-plugin-sdk-go/backend/httpclient"
	"github.com/grafana/grafana-plugin-sdk-go/backend/instancemgmt"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
	"github.com/grafana/grafana/pkg/tsdb/tempo/kinds/dataquery"
	"github.com/grafana/tempo/pkg/tempopb"
>>>>>>> v12.1.0
)

type Service struct {
	im     instancemgmt.InstanceManager
	logger log.Logger
}

// Return the file, line, and (full-path) function name of the caller
func getRunContext() (string, int, string) {
	pc := make([]uintptr, 10)
	runtime.Callers(2, pc)
	f := runtime.FuncForPC(pc[0])
	file, line := f.FileLine(pc[0])
	return file, line, f.Name()
}

// Return a formatted string representing the execution context for the logger
func logEntrypoint() string {
	file, line, pathToFunction := getRunContext()
	parts := strings.Split(pathToFunction, "/")
	functionName := parts[len(parts)-1]
	return fmt.Sprintf("%s:%d[%s]", file, line, functionName)
}

func ProvideService(httpClientProvider *httpclient.Provider) *Service {
	return &Service{
		logger: backend.NewLoggerWith("logger", "tsdb.tempo"),
		im:     datasource.NewInstanceManager(newInstanceSettings(httpClientProvider)),
	}
}

type Datasource struct {
	HTTPClient      *http.Client
	StreamingClient tempopb.StreamingQuerierClient
	URL             string
}

func newInstanceSettings(httpClientProvider *httpclient.Provider) datasource.InstanceFactoryFunc {
	return func(ctx context.Context, settings backend.DataSourceInstanceSettings) (instancemgmt.Instance, error) {
		ctxLogger := backend.NewLoggerWith("logger", "tsdb.tempo").FromContext(ctx)
		opts, err := settings.HTTPClientOptions(ctx)
		if err != nil {
			ctxLogger.Error("Failed to get HTTP client options", "error", err, "function", logEntrypoint())
			return nil, err
		}

		client, err := httpClientProvider.New(opts)
		if err != nil {
			ctxLogger.Error("Failed to get HTTP client provider", "error", err, "function", logEntrypoint())
			return nil, err
		}

		streamingClient, err := newGrpcClient(ctx, settings, opts)
		if err != nil {
			ctxLogger.Error("Failed to get gRPC client", "error", err, "function", logEntrypoint())
			return nil, err
		}

		model := &Datasource{
			HTTPClient:      client,
			StreamingClient: streamingClient,
			URL:             settings.URL,
		}
		return model, nil
	}
<<<<<<< HEAD

	if resp.StatusCode != http.StatusOK {
		queryResult.Error = fmt.Errorf("failed to get trace with id: %s Status: %s Body: %s", traceID, resp.Status, string(body))
		return plugins.DataResponse{
			Results: map[string]plugins.DataQueryResult{
				refID: queryResult,
			},
		}, nil
	}

	otTrace, err := otlp.NewProtobufTracesUnmarshaler().UnmarshalTraces(body)

	if err != nil {
		return plugins.DataResponse{}, fmt.Errorf("failed to convert tempo response to Otlp: %w", err)
	}

	frame, err := TraceToFrame(otTrace)
	if err != nil {
		return plugins.DataResponse{}, fmt.Errorf("failed to transform trace %v to data frame: %w", traceID, err)
	}
	frame.RefID = refID
	frames := []*data.Frame{frame}
	queryResult.Dataframes = plugins.NewDecodedDataFrames(frames)

	return plugins.DataResponse{
		Results: map[string]plugins.DataQueryResult{
			refID: queryResult,
		},
	}, nil
=======
>>>>>>> v12.1.0
}

func (s *Service) QueryData(ctx context.Context, req *backend.QueryDataRequest) (*backend.QueryDataResponse, error) {
	ctxLogger := s.logger.FromContext(ctx)
	ctxLogger.Debug("Processing queries", "queryLength", len(req.Queries), "function", logEntrypoint())

	// create response struct
	response := backend.NewQueryDataResponse()

	// loop over queries and execute them individually.
	for i, q := range req.Queries {
		ctxLogger.Debug("Processing query", "counter", i, "function", logEntrypoint())
		if res, err := s.query(ctx, req.PluginContext, q); err != nil {
			ctxLogger.Error("Error processing query", "error", err)
			return response, err
		} else {
			if res != nil {
				ctxLogger.Debug("Query processed", "counter", i, "function", logEntrypoint())
				response.Responses[q.RefID] = *res
			} else {
				ctxLogger.Debug("Query resulted in empty response", "counter", i, "function", logEntrypoint())
			}
		}
	}

	ctxLogger.Debug("All queries processed", "function", logEntrypoint())
	return response, nil
}

func (s *Service) query(ctx context.Context, pCtx backend.PluginContext, query backend.DataQuery) (*backend.DataResponse, error) {
	switch query.QueryType {
	case string(dataquery.TempoQueryTypeTraceId):
		return s.getTrace(ctx, pCtx, query)
	case string(dataquery.TempoQueryTypeTraceql):
		return s.runTraceQlQuery(ctx, pCtx, query)
	}
	return nil, fmt.Errorf("unsupported query type: '%s' for query with refID '%s'", query.QueryType, query.RefID)
}

func (s *Service) getDSInfo(ctx context.Context, pluginCtx backend.PluginContext) (*Datasource, error) {
	i, err := s.im.Get(ctx, pluginCtx)
	if err != nil {
		return nil, err
	}

	instance, ok := i.(*Datasource)
	if !ok {
		return nil, fmt.Errorf("failed to cast datsource info")
	}

	return instance, nil
}
