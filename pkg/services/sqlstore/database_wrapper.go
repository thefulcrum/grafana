package sqlstore

import (
	"context"
	"database/sql"
	"database/sql/driver"
<<<<<<< HEAD
=======
	"errors"
	"fmt"
>>>>>>> v7.4.1
	"time"

	"github.com/gchaincl/sqlhooks"
	"github.com/go-sql-driver/mysql"
	"github.com/grafana/grafana/pkg/infra/log"
	"github.com/grafana/grafana/pkg/services/sqlstore/migrator"
	"github.com/lib/pq"
	"github.com/mattn/go-sqlite3"
	"github.com/prometheus/client_golang/prometheus"
	"xorm.io/core"
)

var (
<<<<<<< HEAD
	databaseQueryCounter   *prometheus.CounterVec
	databaseQueryHistogram prometheus.Histogram
)

func init() {
	databaseQueryCounter = prometheus.NewCounterVec(prometheus.CounterOpts{
		Namespace: "grafana",
		Name:      "database_queries_total",
		Help:      "The total amount of Database queries",
	}, []string{"status"})

	databaseQueryHistogram = prometheus.NewHistogram(prometheus.HistogramOpts{
		Namespace: "grafana",
		Name:      "database_queries_duration_seconds",
		Help:      "Database query histogram",
		Buckets:   prometheus.ExponentialBuckets(0.0001, 4, 9),
	})

	prometheus.MustRegister(databaseQueryCounter, databaseQueryHistogram)
=======
	databaseQueryHistogram *prometheus.HistogramVec
)

func init() {
	databaseQueryHistogram = prometheus.NewHistogramVec(prometheus.HistogramOpts{
		Namespace: "grafana",
		Name:      "database_queries_duration_seconds",
		Help:      "Database query histogram",
		Buckets:   prometheus.ExponentialBuckets(0.00001, 4, 10),
	}, []string{"status"})

	prometheus.MustRegister(databaseQueryHistogram)
>>>>>>> v7.4.1
}

// WrapDatabaseDriverWithHooks creates a fake database driver that
// executes pre and post functions which we use to gather metrics about
<<<<<<< HEAD
// database queries.
func WrapDatabaseDriverWithHooks(dbType string) string {
	drivers := map[string]driver.Driver{
		migrator.SQLITE:   &sqlite3.SQLiteDriver{},
		migrator.MYSQL:    &mysql.MySQLDriver{},
		migrator.POSTGRES: &pq.Driver{},
=======
// database queries. It also registers the metrics.
func WrapDatabaseDriverWithHooks(dbType string) string {
	drivers := map[string]driver.Driver{
		migrator.SQLite:   &sqlite3.SQLiteDriver{},
		migrator.MySQL:    &mysql.MySQLDriver{},
		migrator.Postgres: &pq.Driver{},
>>>>>>> v7.4.1
	}

	d, exist := drivers[dbType]
	if !exist {
		return dbType
	}

	driverWithHooks := dbType + "WithHooks"
	sql.Register(driverWithHooks, sqlhooks.Wrap(d, &databaseQueryWrapper{log: log.New("sqlstore.metrics")}))
<<<<<<< HEAD
	core.RegisterDriver(driverWithHooks, &databaseQueryWrapperParser{dbType: dbType})
=======
	core.RegisterDriver(driverWithHooks, &databaseQueryWrapperDriver{dbType: dbType})
>>>>>>> v7.4.1
	return driverWithHooks
}

// databaseQueryWrapper satisfies the sqlhook.databaseQueryWrapper interface
// which allow us to wrap all SQL queries with a `Before` & `After` hook.
type databaseQueryWrapper struct {
	log log.Logger
}

// databaseQueryWrapperKey is used as key to save values in `context.Context`
type databaseQueryWrapperKey struct{}

// Before hook will print the query with its args and return the context with the timestamp
func (h *databaseQueryWrapper) Before(ctx context.Context, query string, args ...interface{}) (context.Context, error) {
	return context.WithValue(ctx, databaseQueryWrapperKey{}, time.Now()), nil
}

// After hook will get the timestamp registered on the Before hook and print the elapsed time
func (h *databaseQueryWrapper) After(ctx context.Context, query string, args ...interface{}) (context.Context, error) {
	begin := ctx.Value(databaseQueryWrapperKey{}).(time.Time)
	elapsed := time.Since(begin)
<<<<<<< HEAD
	databaseQueryCounter.WithLabelValues("success").Inc()
	databaseQueryHistogram.Observe(elapsed.Seconds())
=======
	databaseQueryHistogram.WithLabelValues("success").Observe(elapsed.Seconds())
>>>>>>> v7.4.1
	h.log.Debug("query finished", "status", "success", "elapsed time", elapsed, "sql", query)
	return ctx, nil
}

// OnError will be called if any error happens
func (h *databaseQueryWrapper) OnError(ctx context.Context, err error, query string, args ...interface{}) error {
	status := "error"
	// https://golang.org/pkg/database/sql/driver/#ErrSkip
<<<<<<< HEAD
	if err == nil || err == driver.ErrSkip {
=======
	if err == nil || errors.Is(err, driver.ErrSkip) {
>>>>>>> v7.4.1
		status = "success"
	}

	begin := ctx.Value(databaseQueryWrapperKey{}).(time.Time)
	elapsed := time.Since(begin)
<<<<<<< HEAD
	databaseQueryCounter.WithLabelValues(status).Inc()
	databaseQueryHistogram.Observe(elapsed.Seconds())
=======
	databaseQueryHistogram.WithLabelValues(status).Observe(elapsed.Seconds())
>>>>>>> v7.4.1
	h.log.Debug("query finished", "status", status, "elapsed time", elapsed, "sql", query, "error", err)
	return err
}

<<<<<<< HEAD
type databaseQueryWrapperParser struct {
	dbType string
}

func (hp *databaseQueryWrapperParser) Parse(string, string) (*core.Uri, error) {
	return &core.Uri{
		DbType: core.DbType(hp.dbType),
	}, nil
=======
// databaseQueryWrapperDriver satisfies the xorm.io/core.Driver interface
type databaseQueryWrapperDriver struct {
	dbType string
}

func (hp *databaseQueryWrapperDriver) Parse(driverName, dataSourceName string) (*core.Uri, error) {
	driver := core.QueryDriver(hp.dbType)
	if driver == nil {
		return nil, fmt.Errorf("could not find driver with name %s", hp.dbType)
	}
	return driver.Parse(driverName, dataSourceName)
>>>>>>> v7.4.1
}
