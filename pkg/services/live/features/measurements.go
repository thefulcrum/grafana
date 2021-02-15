package features

import (
	"github.com/centrifugal/centrifuge"
	"github.com/grafana/grafana/pkg/infra/log"
	"github.com/grafana/grafana/pkg/models"
)

var (
	logger = log.New("live.features") // scoped to all features?
)

// MeasurementsRunner will simply broadcast all events to `grafana/broadcast/*` channels.
// This makes no assumptions about the shape of the data and will broadcast it to anyone listening
type MeasurementsRunner struct {
}

// GetHandlerForPath gets the handler for a path.
// It's called on init.
func (m *MeasurementsRunner) GetHandlerForPath(path string) (models.ChannelHandler, error) {
	return m, nil // for now all channels share config
}

<<<<<<< HEAD
// GetChannelOptions gets channel options.
// It gets called fast and often.
func (m *MeasurementsRunner) GetChannelOptions(id string) centrifuge.ChannelOptions {
	return centrifuge.ChannelOptions{}
}

// OnSubscribe for now allows anyone to subscribe to any dashboard.
func (m *MeasurementsRunner) OnSubscribe(c *centrifuge.Client, e centrifuge.SubscribeEvent) error {
	// anyone can subscribe
	return nil
}

// OnPublish is called when an event is received from the websocket.
func (m *MeasurementsRunner) OnPublish(c *centrifuge.Client, e centrifuge.PublishEvent) ([]byte, error) {
	// currently generic... but should be stricter
	// logger.Debug("Measurements runner got event on channel", "channel", e.Channel)
	return e.Data, nil
=======
// OnSubscribe will let anyone connect to the path
func (m *MeasurementsRunner) OnSubscribe(c *centrifuge.Client, e centrifuge.SubscribeEvent) (centrifuge.SubscribeReply, error) {
	return centrifuge.SubscribeReply{}, nil
}

// OnPublish is called when a client wants to broadcast on the websocket
// Currently this sends measurements over websocket -- should be replaced with the HTTP interface
func (m *MeasurementsRunner) OnPublish(c *centrifuge.Client, e centrifuge.PublishEvent) (centrifuge.PublishReply, error) {
	return centrifuge.PublishReply{
		Options: centrifuge.PublishOptions{},
	}, nil
>>>>>>> v7.4.1
}
