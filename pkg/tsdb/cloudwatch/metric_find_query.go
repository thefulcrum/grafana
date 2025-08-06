package cloudwatch

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/url"
	"reflect"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/ec2"
	ec2types "github.com/aws/aws-sdk-go-v2/service/ec2/types"

	"github.com/aws/aws-sdk-go-v2/service/cloudwatchlogs"
	"github.com/aws/aws-sdk-go-v2/service/resourcegroupstaggingapi"
	resourcegroupstaggingapitypes "github.com/aws/aws-sdk-go-v2/service/resourcegroupstaggingapi/types"
)

type suggestData struct {
<<<<<<< HEAD
	Text  string
	Value string
}

type customMetricsCache struct {
	Expire time.Time
	Cache  []string
}

var customMetricsMetricsMap = make(map[string]map[string]map[string]*customMetricsCache)
var customMetricsDimensionsMap = make(map[string]map[string]map[string]*customMetricsCache)
var metricsMap = map[string][]string{
	"AWS/ACMPrivateCA":            {"CRLGenerated", "Failure", "MisconfiguredCRLBucket", "Success", "Time"},
	"AWS/AmazonMQ":                {"AckRate", "BurstBalance", "ChannelCount", "ConfirmRate", "ConnectionCount", "ConsumerCount", "CpuCreditBalance", "CpuUtilization", "CurrentConnectionsCount", "DequeueCount", "DispatchCount", "EnqueueCount", "EnqueueTime", "EstablishedConnectionsCount", "ExchangeCount", "ExpiredCount", "HeapUsage", "InactiveDurableTopicSubscribersCount", "InFlightCount", "JobSchedulerStorePercentUsage", "JournalFilesForFastRecovery", "JournalFilesForFullRecovery", "MemoryUsage", "MessageCount", "MessageReadyCount", "MessageUnacknowledgedCount", "NetworkIn", "NetworkOut", "OpenTransactionCount", "ProducerCount", "PublishRate", "QueueCount", "QueueSize", "RabbitMQDiskFree", "RabbitMQDiskFreeLimit", "RabbitMQFdUsed", "RabbitMQMemLimit", "RabbitMQMemUsed", "ReceiveCount", "StorePercentUsage", "SystemCpuUtilization", "TempPercentUsage", "TotalConsumerCount", "TotalDequeueCount", "TotalEnqueueCount", "TotalMessageCount", "TotalProducerCount", "VolumeReadOps", "VolumeWriteOps"},
	"AWS/ApiGateway":              {"4xx", "4XXError", "5xx", "5XXError", "CacheHitCount", "CacheMissCount", "Count", "DataProcessed", "IntegrationLatency", "Latency"},
	"AWS/AppStream":               {"ActualCapacity", "AvailableCapacity", "CapacityUtilization", "DesiredCapacity", "InUseCapacity", "InsufficientCapacityError", "PendingCapacity", "RunningCapacity"},
	"AWS/AppSync":                 {"4XXError", "5XXError", "Latency", "ActiveConnections", "ActiveSubscriptions", "ConnectClientError", "ConnectionDuration", "ConnectServerError", "ConnectSuccess", "DisconnectClientError", "DisconnectServerError", "DisconnectSuccess", "PublishDataMessageClientError", "PublishDataMessageServerError", "PublishDataMessageSize", "PublishDataMessageSuccess", "SubscribeClientError", "SubscribeServerError", "SubscribeSuccess", "UnsubscribeClientError", "UnsubscribeServerError", "UnsubscribeSuccess"},
	"AWS/ApplicationELB":          {"ActiveConnectionCount", "ClientTLSNegotiationErrorCount", "ConsumedLCUs", "ELBAuthError", "ELBAuthFailure", "ELBAuthLatency", "ELBAuthRefreshTokenSuccess", "ELBAuthSuccess", "ELBAuthUserClaimsSizeExceeded", "HTTPCode_ELB_3XX_Count", "HTTPCode_ELB_4XX_Count", "HTTPCode_ELB_5XX_Count", "HTTPCode_Target_2XX_Count", "HTTPCode_Target_3XX_Count", "HTTPCode_Target_4XX_Count", "HTTPCode_Target_5XX_Count", "HTTP_Fixed_Response_Count", "HTTP_Redirect_Count", "HTTP_Redirect_Url_Limit_Exceeded_Count", "HealthyHostCount", "IPv6ProcessedBytes", "IPv6RequestCount", "LambdaInternalError", "LambdaTargetProcessedBytes", "LambdaUserError", "NewConnectionCount", "NonStickyRequestCount", "ProcessedBytes", "RejectedConnectionCount", "RequestCount", "RequestCountPerTarget", "RuleEvaluations", "StandardProcessedBytes", "TargetConnectionErrorCount", "TargetResponseTime", "TargetTLSNegotiationErrorCount", "UnHealthyHostCount"},
	"AWS/Athena":                  {"EngineExecutionTime", "QueryPlanningTime", "QueryQueueTime", "ProcessedBytes", "ServiceProcessingTime", "TotalExecutionTime"},
	"AWS/AutoScaling":             {"GroupDesiredCapacity", "GroupInServiceInstances", "GroupMaxSize", "GroupMinSize", "GroupPendingInstances", "GroupStandbyInstances", "GroupTerminatingInstances", "GroupTotalInstances"},
	"AWS/Billing":                 {"EstimatedCharges"},
	"AWS/CertificateManager":      {"DaysToExpiry"},
	"AWS/Chatbot":                 {"EventsThrottled", "EventsProcessed", "MessageDeliverySuccess", "MessageDeliveryFailure", "UnsupportedEvents"},
	"AWS/ClientVPN":               {"ActiveConnectionsCount", "AuthenticationFailures", "CrlDaysToExpiry", "EgressBytes", "EgressPackets", "IngressBytes", "IngressPackets", "SelfServicePortalClientConfigurationDownloads"},
	"AWS/CloudFront":              {"4xxErrorRate", "5xxErrorRate", "BytesDownloaded", "BytesUploaded", "Requests", "TotalErrorRate", "CacheHitRate", "OriginLatency", "401ErrorRate", "403ErrorRate", "404ErrorRate", "502ErrorRate", "503ErrorRate", "504ErrorRate", "LambdaExecutionError", "LambdaValidationError", "LambdaLimitExceededErrors"},
	"AWS/CloudHSM":                {"HsmKeysSessionOccupied", "HsmKeysTokenOccupied", "HsmSessionCount", "HsmSslCtxsOccupied", "HsmTemperature", "HsmUnhealthy", "HsmUsersAvailable", "HsmUsersMax", "InterfaceEth2OctetsInput", "InterfaceEth2OctetsOutput"},
	"AWS/CloudSearch":             {"IndexUtilization", "Partitions", "SearchableDocuments", "SuccessfulRequests"},
	"AWS/CodeBuild":               {"BuildDuration", "Builds", "DownloadSourceDuration", "Duration", "FailedBuilds", "FinalizingDuration", "InstallDuration", "PostBuildDuration", "PreBuildDuration", "ProvisioningDuration", "QueuedDuration", "SubmittedDuration", "SucceededBuilds", "UploadArtifactsDuration"},
	"AWS/CodeGuruProfiler":        {"Recommendations"},
	"AWS/Cognito":                 {"AccountTakeOverRisk", "CompromisedCredentialsRisk", "NoRisk", "OverrideBlock", "Risk"},
	"AWS/Connect":                 {"CallBackNotDialableNumber", "CallRecordingUploadError", "CallsBreachingConcurrencyQuota", "CallsPerInterval", "ConcurrentCalls", "ConcurrentCallsPercentage", "ContactFlowErrors", "ContactFlowFatalErrors", "LongestQueueWaitTime", "MisconfiguredPhoneNumbers", "MissedCalls", "PublicSigningKeyUsage", "QueueCapacityExceededError", "QueueSize", "ThrottledCalls", "ToInstancePacketLossRate"},
	"AWS/DataSync":                {"BytesVerifiedSource", "BytesPreparedSource", "FilesVerifiedSource", "FilesPreparedSource", "BytesVerifiedDestination", "BytesPreparedDestination", "FilesVerifiedDestination", "FilesPreparedDestination", "FilesTransferred", "BytesTransferred", "BytesWritten"},
	"AWS/DDoSProtection":          {"DDoSDetected", "DDoSAttackBitsPerSecond", "DDoSAttackPacketsPerSecond", "DDoSAttackRequestsPerSecond", "VolumeBitsPerSecond", "VolumePacketsPerSecond"},
	"AWS/DMS":                     {"CDCChangesDiskSource", "CDCChangesDiskTarget", "CDCChangesMemorySource", "CDCChangesMemoryTarget", "CDCIncomingChanges", "CDCLatencySource", "CDCLatencyTarget", "CDCThroughputBandwidthSource", "CDCThroughputBandwidthTarget", "CDCThroughputRowsSource", "CDCThroughputRowsTarget", "CPUUtilization", "FreeStorageSpace", "FreeableMemory", "FullLoadThroughputBandwidthSource", "FullLoadThroughputBandwidthTarget", "FullLoadThroughputRowsSource", "FullLoadThroughputRowsTarget", "NetworkReceiveThroughput", "NetworkTransmitThroughput", "ReadIOPS", "ReadLatency", "ReadThroughput", "SwapUsage", "WriteIOPS", "WriteLatency", "WriteThroughput"},
	"AWS/DocDB":                   {"BackupRetentionPeriodStorageUsed", "BufferCacheHitRatio", "ChangeStreamLogSize", "CPUUtilization", "DatabaseConnections", "DBInstanceReplicaLag", "DBClusterReplicaLagMaximum", "DBClusterReplicaLagMinimum", "DiskQueueDepth", "EngineUptime", "FreeableMemory", "FreeLocalStorage", "NetworkReceiveThroughput", "NetworkThroughput", "NetworkTransmitThroughput", "ReadIOPS", "ReadLatency", "ReadThroughput", "SnapshotStorageUsed", "SwapUsage", "TotalBackupStorageBilled", "VolumeBytesUsed", "VolumeReadIOPs", "VolumeWriteIOPs", "WriteIOPS", "WriteLatency", "WriteThroughput"},
	"AWS/DX":                      {"ConnectionBpsEgress", "ConnectionBpsIngress", "ConnectionErrorCount", "ConnectionCRCErrorCount", "ConnectionLightLevelRx", "ConnectionLightLevelTx", "ConnectionPpsEgress", "ConnectionPpsIngress", "ConnectionState", "VirtualInterfaceBpsEgress", "VirtualInterfaceBpsIngress", "VirtualInterfacePpsEgress", "VirtualInterfacePpsIngress"},
	"AWS/DAX":                     {"CPUUtilization", "NetworkPacketsIn", "NetworkPacketsOut", "GetItemRequestCount", "BatchGetItemRequestCount", "BatchWriteItemRequestCount", "DeleteItemRequestCount", "PutItemRequestCount", "UpdateItemRequestCount", "TransactWriteItemsCount", "TransactGetItemsCount", "ItemCacheHits", "ItemCacheMisses", "QueryCacheHits", "QueryCacheMisses", "ScanCacheHits", "ScanCacheMisses", "TotalRequestCount", "ErrorRequestCount", "FaultRequestCount", "FailedRequestCount", "QueryRequestCount", "ScanRequestCount", "ClientConnections", "EstimatedDbSize", "EvictedSize"},
	"AWS/DynamoDB":                {"ConditionalCheckFailedRequests", "ConsumedReadCapacityUnits", "ConsumedWriteCapacityUnits", "OnlineIndexConsumedWriteCapacity", "OnlineIndexPercentageProgress", "OnlineIndexThrottleEvents", "PendingReplicationCount", "ProvisionedReadCapacityUnits", "ProvisionedWriteCapacityUnits", "ReadThrottleEvents", "ReplicationLatency", "ReturnedBytes", "ReturnedItemCount", "ReturnedRecordsCount", "SuccessfulRequestLatency", "SystemErrors", "ThrottledRequests", "TimeToLiveDeletedItemCount", "UserErrors", "WriteThrottleEvents"},
	"AWS/EBS":                     {"BurstBalance", "VolumeConsumedReadWriteOps", "VolumeIdleTime", "VolumeQueueLength", "VolumeReadBytes", "VolumeReadOps", "VolumeThroughputPercentage", "VolumeTotalReadTime", "VolumeTotalWriteTime", "VolumeWriteBytes", "VolumeWriteOps"},
	"AWS/EC2":                     {"CPUCreditBalance", "CPUCreditUsage", "CPUSurplusCreditBalance", "CPUSurplusCreditsCharged", "CPUUtilization", "DiskReadBytes", "DiskReadOps", "DiskWriteBytes", "DiskWriteOps", "EBSByteBalance%", "EBSIOBalance%", "EBSReadBytes", "EBSReadOps", "EBSWriteBytes", "EBSWriteOps", "NetworkIn", "NetworkOut", "NetworkPacketsIn", "NetworkPacketsOut", "StatusCheckFailed", "StatusCheckFailed_Instance", "StatusCheckFailed_System"},
	"AWS/EC2/API":                 {"ClientErrors", "RequestLimitExceeded", "ServerErrors", "SuccessfulCalls"},
	"AWS/EC2CapacityReservations": {"AvailableInstanceCount", "InstanceUtilization", "TotalInstanceCount", "UsedInstanceCount"},
	"AWS/EC2Spot":                 {"AvailableInstancePoolsCount", "BidsSubmittedForCapacity", "EligibleInstancePoolCount", "FulfilledCapacity", "MaxPercentCapacityAllocation", "PendingCapacity", "PercentCapacityAllocation", "TargetCapacity", "TerminatingCapacity"},
	"AWS/ECS":                     {"CPUReservation", "CPUUtilization", "GPUReservation", "MemoryReservation", "MemoryUtilization"},
	"AWS/EFS":                     {"BurstCreditBalance", "ClientConnections", "DataReadIOBytes", "DataWriteIOBytes", "MetadataIOBytes", "PercentIOLimit", "PermittedThroughput", "TotalIOBytes", "StorageBytes"},
	"AWS/ELB":                     {"BackendConnectionErrors", "EstimatedALBActiveConnectionCount", "EstimatedALBConsumedLCUs", "EstimatedALBNewConnectionCount", "EstimatedProcessedBytes", "HTTPCode_Backend_2XX", "HTTPCode_Backend_3XX", "HTTPCode_Backend_4XX", "HTTPCode_Backend_5XX", "HTTPCode_ELB_4XX", "HTTPCode_ELB_5XX", "HealthyHostCount", "Latency", "RequestCount", "SpilloverCount", "SurgeQueueLength", "UnHealthyHostCount"},
	"AWS/ES":                      {"AutomatedSnapshotFailure", "CPUCreditBalance", "CPUUtilization", "ClusterIndexWritesBlocked", "ClusterStatus.green", "ClusterStatus.red", "ClusterStatus.yellow", "ClusterUsedSpace", "DeletedDocuments", "DiskQueueDepth", "ElasticsearchRequests", "FreeStorageSpace", "IndexingLatency", "IndexingRate", "InvalidHostHeaderRequests", "JVMGCOldCollectionCount", "JVMGCOldCollectionTime", "JVMGCYoungCollectionCount", "JVMGCYoungCollectionTime", "JVMMemoryPressure", "KMSKeyError", "KMSKeyInaccessible", "KibanaHealthyNodes", "MasterCPUCreditBalance", "MasterCPUUtilization", "MasterFreeStorageSpace", "MasterJVMMemoryPressure", "MasterReachableFromNode", "Nodes", "ReadIOPS", "ReadLatency", "ReadThroughput", "RequestCount", "SearchLatency", "SearchRate", "SearchableDocuments", "SysMemoryUtilization", "ThreadpoolBulkQueue", "ThreadpoolBulkRejected", "ThreadpoolBulkThreads", "ThreadpoolForce_mergeQueue", "ThreadpoolForce_mergeRejected", "ThreadpoolForce_mergeThreads", "ThreadpoolIndexQueue", "ThreadpoolIndexRejected", "ThreadpoolIndexThreads", "ThreadpoolSearchQueue", "ThreadpoolSearchRejected", "ThreadpoolSearchThreads", "WriteIOPS", "WriteLatency", "WriteThroughput"},
	"AWS/ElastiCache":             {"ActiveDefragHits", "BytesReadIntoMemcached", "BytesUsedForCache", "BytesUsedForCacheItems", "BytesUsedForHash", "BytesWrittenOutFromMemcached", "CPUUtilization", "CacheHitRate", "CacheHits", "CacheMisses", "CasBadval", "CasHits", "CasMisses", "CmdConfigGet", "CmdConfigSet", "CmdFlush", "CmdGet", "CmdSet", "CmdTouch", "CurrConfig", "CurrConnections", "CurrItems", "DB0AverageTTL", "DatabaseMemoryUsagePercentage", "DecrHits", "DecrMisses", "DeleteHits", "DeleteMisses", "EngineCPUUtilization", "EvalBasedCmds", "EvalBasedCmdsLatency", "EvictedUnfetched", "Evictions", "ExpiredUnfetched", "FreeableMemory", "GeoSpatialBasedCmds", "GeoSpatialBasedCmdsLatency", "GetHits", "GetMisses", "GetTypeCmds", "GetTypeCmdsLatency", "HashBasedCmds", "HashBasedCmdsLatency", "HyperLogLogBasedCmds", "HyperLogLogBasedCmdsLatency", "IncrHits", "IncrMisses", "KeyBasedCmds", "KeyBasedCmdsLatency", "ListBasedCmds", "ListBasedCmdsLatency", "MasterLinkHealthStatus", "MemoryFragmentationRatio", "NetworkBytesIn", "NetworkBytesOut", "NewConnections", "NewItems", "PubSubBasedCmds", "PubSubBasedCmdsLatency", "Reclaimed", "ReplicationBytes", "ReplicationLag", "SaveInProgress", "SetBasedCmds", "SetBasedCmdsLatency", "SetTypeCmds", "SetTypeCmdsLatency", "SlabsMoved", "SortedSetBasedCmds", "SortedSetBasedCmdsLatency", "StreamBasedCmds", "StreamBasedCmdsLatency", "StringBasedCmds", "StringBasedCmdsLatency", "SwapUsage", "TouchHits", "TouchMisses", "UnusedMemory"},
	"AWS/ElasticBeanstalk":        {"ApplicationLatencyP10", "ApplicationLatencyP50", "ApplicationLatencyP75", "ApplicationLatencyP85", "ApplicationLatencyP90", "ApplicationLatencyP95", "ApplicationLatencyP99", "ApplicationLatencyP99.9", "ApplicationRequests2xx", "ApplicationRequests3xx", "ApplicationRequests4xx", "ApplicationRequests5xx", "ApplicationRequestsTotal", "CPUIdle", "CPUIowait", "CPUIrq", "CPUNice", "CPUSoftirq", "CPUSystem", "CPUUser", "EnvironmentHealth", "InstanceHealth", "InstancesDegraded", "InstancesInfo", "InstancesNoData", "InstancesOk", "InstancesPending", "InstancesSevere", "InstancesUnknown", "InstancesWarning", "LoadAverage1min", "LoadAverage5min", "RootFilesystemUtil"},
	"AWS/ElasticInference":        {"AcceleratorHealthCheckFailed", "AcceleratorMemoryUsage", "ConnectivityCheckFailed"},
	"AWS/ElasticMapReduce":        {"AppsCompleted", "AppsFailed", "AppsKilled", "AppsPending", "AppsRunning", "AppsSubmitted", "BackupFailed", "CapacityRemainingGB", "Cluster Status", "ContainerAllocated", "ContainerPending", "ContainerPendingRatio", "ContainerReserved", "CoreNodesPending", "CoreNodesRunning", "CorruptBlocks", "DfsPendingReplicationBlocks", "HBase", "HDFSBytesRead", "HDFSBytesWritten", "HDFSUtilization", "HbaseBackupFailed", "IO", "IsIdle", "JobsFailed", "JobsRunning", "LiveDataNodes", "LiveTaskTrackers", "MRActiveNodes", "MRDecommissionedNodes", "MRLostNodes", "MRRebootedNodes", "MRTotalNodes", "MRUnhealthyNodes", "Map/Reduce", "MapSlotsOpen", "MapTasksRemaining", "MapTasksRunning", "MemoryAllocatedMB", "MemoryAvailableMB", "MemoryReservedMB", "MemoryTotalMB", "MissingBlocks", "MostRecentBackupDuration", "Node Status", "PendingDeletionBlocks", "ReduceSlotsOpen", "ReduceTasksRemaining", "ReduceTasksRunning", "RemainingMapTasksPerSlot", "S3BytesRead", "S3BytesWritten", "TaskNodesPending", "TaskNodesRunning", "TimeSinceLastSuccessfulBackup", "TotalLoad", "UnderReplicatedBlocks", "YARNMemoryAvailablePercentage"},
	"AWS/ElasticTranscoder":       {"Billed Audio Output", "Billed HD Output", "Billed SD Output", "Errors", "Jobs Completed", "Jobs Errored", "Outputs per Job", "Standby Time", "Throttles"},
	"AWS/Events":                  {"DeadLetterInvocations", "FailedInvocations", "Invocations", "MatchedEvents", "ThrottledRules", "TriggeredRules"},
	"AWS/FSx":                     {"DataReadBytes", "DataReadOperations", "DataWriteBytes", "DataWriteOperations", "FreeDataStorageCapacity", "FreeStorageCapacity", "MetadataOperations"},
	"AWS/Firehose":                {"BackupToS3.Bytes", "BackupToS3.DataFreshness", "BackupToS3.Records", "BackupToS3.Success", "DataReadFromKinesisStream.Bytes", "DataReadFromKinesisStream.Records", "DeliveryToElasticsearch.Bytes", "DeliveryToElasticsearch.Records", "DeliveryToElasticsearch.Success", "DeliveryToRedshift.Bytes", "DeliveryToRedshift.Records", "DeliveryToRedshift.Success", "DeliveryToS3.Bytes", "DeliveryToS3.DataFreshness", "DeliveryToS3.Records", "DeliveryToS3.Success", "DeliveryToSplunk.Bytes", "DeliveryToSplunk.DataFreshness", "DeliveryToSplunk.Records", "DeliveryToSplunk.Success", "DescribeDeliveryStream.Latency", "DescribeDeliveryStream.Requests", "ExecuteProcessing.Duration", "ExecuteProcessing.Success", "FailedConversion.Bytes", "FailedConversion.Records", "IncomingBytes", "IncomingRecords", "KinesisMillisBehindLatest", "ListDeliveryStreams.Latency", "ListDeliveryStreams.Requests", "PutRecord.Bytes", "PutRecord.Latency", "PutRecord.Requests", "PutRecordBatch.Bytes", "PutRecordBatch.Latency", "PutRecordBatch.Records", "PutRecordBatch.Requests", "SucceedConversion.Bytes", "SucceedConversion.Records", "SucceedProcessing.Bytes", "SucceedProcessing.Records", "ThrottledDescribeStream", "ThrottledGetRecords", "ThrottledGetShardIterator", "UpdateDeliveryStream.Latency", "UpdateDeliveryStream.Requests"},
	"AWS/GameLift":                {"ActivatingGameSessions", "ActiveGameSessions", "ActiveInstances", "ActiveServerProcesses", "AvailableGameSessions", "AverageWaitTime", "CurrentPlayerSessions", "CurrentTickets", "DesiredInstances", "FirstChoiceNotViable", "FirstChoiceOutOfCapacity", "GameSessionInterruptions", "HealthyServerProcesses", "IdleInstances", "InstanceInterruptions", "LowestLatencyPlacement", "LowestPricePlacement", "MatchAcceptancesTimedOut", "MatchesAccepted", "MatchesCreated", "MatchesPlaced", "MatchesRejected", "MaxInstances", "MinInstances", "PercentAvailableGameSessions", "PercentHealthyServerProcesses", "PercentIdleInstances", "Placement", "PlacementsCanceled", "PlacementsFailed", "PlacementsStarted", "PlacementsSucceeded", "PlacementsTimedOut", "PlayerSessionActivations", "PlayersStarted", "QueueDepth", "RuleEvaluationsFailed", "RuleEvaluationsPassed", "ServerProcessAbnormalTerminations", "ServerProcessActivations", "ServerProcessTerminations", "TicketsFailed", "TicketsStarted", "TicketsTimedOut", "TimeToMatch", "TimeToTicketSuccess"},
	"AWS/Glue":                    {"glue.driver.BlockManager.disk.diskSpaceUsed_MB", "glue.driver.ExecutorAllocationManager.executors.numberAllExecutors", "glue.driver.ExecutorAllocationManager.executors.numberMaxNeededExecutors", "glue.driver.aggregate.bytesRead", "glue.driver.aggregate.elapsedTime", "glue.driver.aggregate.numCompletedStages", "glue.driver.aggregate.numCompletedTasks", "glue.driver.aggregate.numFailedTasks", "glue.driver.aggregate.numKilledTasks", "glue.driver.aggregate.recordsRead", "glue.driver.aggregate.shuffleBytesWritten", "glue.driver.aggregate.shuffleLocalBytesRead", "glue.driver.jvm.heap.usage  glue.executorId.jvm.heap.usage  glue.ALL.jvm.heap.usage", "glue.driver.jvm.heap.used  glue.executorId.jvm.heap.used  glue.ALL.jvm.heap.used", "glue.driver.s3.filesystem.read_bytes  glue.executorId.s3.filesystem.read_bytes  glue.ALL.s3.filesystem.read_bytes", "glue.driver.s3.filesystem.write_bytes  glue.executorId.s3.filesystem.write_bytes  glue.ALL.s3.filesystem.write_bytes", "glue.driver.system.cpuSystemLoad  glue.executorId.system.cpuSystemLoad  glue.ALL.system.cpuSystemLoad"},
	"AWS/GroundStation":           {"BitErrorRate", "BlockErrorRate", "ReceivedPower", "Es/N0"},
	"AWS/Inspector":               {"TotalAssessmentRunFindings", "TotalAssessmentRuns", "TotalHealthyAgents", "TotalMatchingAgents"},
	"AWS/IVS":                     {"ConcurrentViews", "ConcurrentStreams", "LiveDeliveredTime", "LiveInputTime", "RecordedTime"},
	"AWS/IoT":                     {"CanceledJobExecutionCount", "CanceledJobExecutionTotalCount", "ClientError", "Connect.AuthError", "Connect.ClientError", "Connect.ServerError", "Connect.Success", "Connect.Throttle", "DeleteThingShadow.Accepted", "FailedJobExecutionCount", "FailedJobExecutionTotalCount", "Failure", "GetThingShadow.Accepted", "InProgressJobExecutionCount", "InProgressJobExecutionTotalCount", "NonCompliantResources", "NumLogBatchesFailedToPublishThrottled", "NumLogEventsFailedToPublishThrottled", "ParseError", "Ping.Success", "PublishIn.AuthError", "PublishIn.ClientError", "PublishIn.ServerError", "PublishIn.Success", "PublishIn.Throttle", "PublishOut.AuthError", "PublishOut.ClientError", "PublishOut.Success", "QueuedJobExecutionCount", "QueuedJobExecutionTotalCount", "RejectedJobExecutionCount", "RejectedJobExecutionTotalCount", "RemovedJobExecutionCount", "RemovedJobExecutionTotalCount", "ResourcesEvaluated", "RuleMessageThrottled", "RuleNotFound", "RulesExecuted", "ServerError", "Subscribe.AuthError", "Subscribe.ClientError", "Subscribe.ServerError", "Subscribe.Success", "Subscribe.Throttle", "SuccededJobExecutionCount", "SuccededJobExecutionTotalCount", "Success", "TopicMatch", "Unsubscribe.ClientError", "Unsubscribe.ServerError", "Unsubscribe.Success", "Unsubscribe.Throttle", "UpdateThingShadow.Accepted", "Violations", "ViolationsCleared", "ViolationsInvalidated"},
	"AWS/IoTAnalytics":            {"ActionExecution", "ActivityExecutionError", "IncomingMessages"},
	"AWS/KMS":                     {"SecondsUntilKeyMaterialExpiration"},
	"AWS/Kafka":                   {"ActiveControllerCount", "BytesInPerSec", "BytesOutPerSec", "CpuIdle", "CpuSystem", "CpuUser", "EstimatedMaxTimeLag", "EstimatedTimeLag", "FetchConsumerLocalTimeMsMean", "FetchConsumerRequestQueueTimeMsMean", "FetchConsumerResponseQueueTimeMsMean", "FetchConsumerResponseSendTimeMsMean", "FetchConsumerTotalTimeMsMean", "FetchFollowerLocalTimeMsMean", "FetchFollowerRequestQueueTimeMsMean", "FetchFollowerResponseQueueTimeMsMean", "FetchFollowerResponseSendTimeMsMean", "FetchFollowerTotalTimeMsMean", "FetchMessageConversionsPerSec", "FetchThrottleByteRate", "FetchThrottleQueueSize", "FetchThrottleTime", "GlobalPartitionCount", "GlobalTopicCount", "KafkaAppLogsDiskUsed", "KafkaDataLogsDiskUsed", "LeaderCount", "MaxOffsetLag", "MemoryBuffered", "MemoryCached", "MemoryFree", "MemoryUsed", "MessagesInPerSec", "NetworkProcessorAvgIdlePercent", "NetworkRxDropped", "NetworkRxErrors", "NetworkRxPackets", "NetworkTxDropped", "NetworkTxErrors", "NetworkTxPackets", "OfflinePartitionsCount", "PartitionCount", "ProduceLocalTimeMsMean", "ProduceMessageConversionsPerSec", "ProduceMessageConversionsTimeMsMean", "ProduceRequestQueueTimeMsMean", "ProduceResponseQueueTimeMsMean", "ProduceResponseSendTimeMsMean", "ProduceThrottleByteRate", "ProduceThrottleQueueSize", "ProduceThrottleTime", "ProduceTotalTimeMsMean", "ReplicationBytesInPerSec", "ReplicationBytesOutPerSec", "RequestBytesMean", "RequestExemptFromThrottleTime", "RequestHandlerAvgIdlePercent", "RequestThrottleQueueSize", "RequestThrottleTime", "RequestTime", "RootDiskUsed", "SumOffsetLag", "SwapFree", "SwapUsed", "OffsetLag", "UnderMinIsrPartitionCount", "UnderReplicatedPartitions", "ZooKeeperRequestLatencyMsMean", "ZooKeeperSessionState"},
	"AWS/Kinesis":                 {"GetRecords.Bytes", "GetRecords.IteratorAge", "GetRecords.IteratorAgeMilliseconds", "GetRecords.Latency", "GetRecords.Records", "GetRecords.Success", "IncomingBytes", "IncomingRecords", "IteratorAgeMilliseconds", "OutgoingBytes", "OutgoingRecords", "PutRecord.Bytes", "PutRecord.Latency", "PutRecord.Success", "PutRecords.Bytes", "PutRecords.Latency", "PutRecords.Records", "PutRecords.Success", "ReadProvisionedThroughputExceeded", "SubscribeToShard.RateExceeded", "SubscribeToShard.Success", "SubscribeToShardEvent.Bytes", "SubscribeToShardEvent.MillisBehindLatest", "SubscribeToShardEvent.Records", "SubscribeToShardEvent.Success", "WriteProvisionedThroughputExceeded"},
	"AWS/KinesisAnalytics":        {"Bytes", "InputProcessing.DroppedRecords", "InputProcessing.Duration", "InputProcessing.OkBytes", "InputProcessing.OkRecords", "InputProcessing.ProcessingFailedRecords", "InputProcessing.Success", "KPUs", "LambdaDelivery.DeliveryFailedRecords", "LambdaDelivery.Duration", "LambdaDelivery.OkRecords", "MillisBehindLatest", "Records", "Success"},
	"AWS/KinesisVideo":            {"GetHLSMasterPlaylist.Latency", "GetHLSMasterPlaylist.Requests", "GetHLSMasterPlaylist.Success", "GetHLSMediaPlaylist.Latency", "GetHLSMediaPlaylist.Requests", "GetHLSMediaPlaylist.Success", "GetHLSStreamingSessionURL.Latency", "GetHLSStreamingSessionURL.Requests", "GetHLSStreamingSessionURL.Success", "GetMP4InitFragment.Latency", "GetMP4InitFragment.Requests", "GetMP4InitFragment.Success", "GetMP4MediaFragment.Latency", "GetMP4MediaFragment.OutgoingBytes", "GetMP4MediaFragment.Requests", "GetMP4MediaFragment.Success", "GetMedia.ConnectionErrors", "GetMedia.MillisBehindNow", "GetMedia.OutgoingBytes", "GetMedia.OutgoingFragments", "GetMedia.OutgoingFrames", "GetMedia.Requests", "GetMedia.Success", "GetMediaForFragmentList.OutgoingBytes", "GetMediaForFragmentList.OutgoingFragments", "GetMediaForFragmentList.OutgoingFrames", "GetMediaForFragmentList.Requests", "GetMediaForFragmentList.Success", "GetTSFragment.Latency", "GetTSFragment.OutgoingBytes", "GetTSFragment.Requests", "GetTSFragment.Success", "ListFragments.Latency", "PutMedia.ActiveConnections", "PutMedia.BufferingAckLatency", "PutMedia.ConnectionErrors", "PutMedia.ErrorAckCount", "PutMedia.FragmentIngestionLatency", "PutMedia.FragmentPersistLatency", "PutMedia.IncomingBytes", "PutMedia.IncomingFragments", "PutMedia.IncomingFrames", "PutMedia.Latency", "PutMedia.PersistedAckLatency", "PutMedia.ReceivedAckLatency", "PutMedia.Requests", "PutMedia.Success"},
	"AWS/Lambda":                  {"ConcurrentExecutions", "DeadLetterErrors", "Duration", "Errors", "Invocations", "IteratorAge", "Throttles", "UnreservedConcurrentExecutions"},
	"AWS/Lex":                     {"BotChannelAuthErrors", "BotChannelConfigurationErrors", "BotChannelInboundThrottledEvents", "BotChannelOutboundThrottledEvents", "BotChannelRequestCount", "BotChannelResponseCardErrors", "BotChannelSystemErrors", "MissedUtteranceCount", "RuntimeInvalidLambdaResponses", "RuntimeLambdaErrors", "RuntimePollyErrors", "RuntimeRequestCount", "RuntimeSucessfulRequestLatency", "RuntimeSystemErrors", "RuntimeThrottledEvents", "RuntimeUserErrors"},
	"AWS/Logs":                    {"DeliveryErrors", "DeliveryThrottling", "ForwardedBytes", "ForwardedLogEvents", "IncomingBytes", "IncomingLogEvents"},
	"AWS/LookoutMetrics":          {"ExecutionsStarted", "ExecutionsSucceeded", "ExecutionsFailed", "Delivered", "Undelivered"},
	"AWS/ML":                      {"PredictCount", "PredictFailureCount"},
	"AWS/MediaConnect":            {"ARQRecovered", "ARQRequests", "BitRate", "CATError", "CRCError", "Connected", "ConnectedOutputs", "ContinuityCounter", "Disconnections", "DroppedPackets", "FECPackets", "FECRecovered", "NotRecoveredPackets", "OutputConnected", "OutputDisconnections", "OverflowPackets", "PATError", "PCRAccuracyError", "PCRError", "PIDError", "PMTError", "PTSError", "PacketLossPercent", "RecoveredPackets", "RoundTripTime", "SourceARQRecovered", "SourceARQRequests", "SourceBitRate", "SourceCATError", "SourceCRCError", "SourceConnected", "SourceContinuityCounter", "SourceDisconnections", "SourceDroppedPackets", "SourceFECPackets", "SourceFECRecovered", "SourceNotRecoveredPackets", "SourceOverflowPackets", "SourcePATError", "SourcePCRAccuracyError", "SourcePCRError", "SourcePIDError", "SourcePMTError", "SourcePTSError", "SourcePacketLossPercent", "SourceRecoveredPackets", "SourceRoundTripTime", "SourceTSByteError", "SourceTSSyncLoss", "SourceTotalPackets", "SourceTransportError", "TSByteError", "TSSyncLoss", "TotalPackets", "TransportError"},
	"AWS/MediaConvert":            {"AudioOutputSeconds", "Errors", "HDOutputSeconds", "JobsCompletedCount", "JobsErroredCount", "SDOutputSeconds", "StandbyTime", "TranscodingTime", "UHDOutputSeconds"},
	"AWS/MediaPackage":            {"ActiveInput", "EgressBytes", "EgressRequestCount", "EgressResponseTime", "IngressBytes", "IngressResponseTime"},
	"AWS/MediaStore":              {"RequestCount", "4xxErrorCount", "5xxErrorCount", "BytesUploaded", "BytesDownloaded", "TotalTime", "TurnaroundTime"},
	"AWS/MediaTailor":             {"AdDecisionServer.Ads", "AdDecisionServer.Duration", "AdDecisionServer.Errors", "AdDecisionServer.FillRate", "AdDecisionServer.Timeouts", "AdNotReady", "Avails.Duration", "Avails.FillRate", "Avails.FilledDuration", "GetManifest.Errors", "Origin.Errors", "Origin.Timeouts"},
	"AWS/NATGateway":              {"ActiveConnectionCount", "BytesInFromDestination", "BytesInFromSource", "BytesOutToDestination", "BytesOutToSource", "ConnectionAttemptCount", "ConnectionEstablishedCount", "ErrorPortAllocation", "IdleTimeoutCount", "PacketsDropCount", "PacketsInFromDestination", "PacketsInFromSource", "PacketsOutToDestination", "PacketsOutToSource"},
	"AWS/Neptune":                 {"CPUUtilization", "ClusterReplicaLag", "ClusterReplicaLagMaximum", "ClusterReplicaLagMinimum", "EngineUptime", "FreeLocalStorage", "FreeableMemory", "GremlinErrors", "GremlinHttp1xx", "GremlinHttp2xx", "GremlinHttp4xx", "GremlinHttp5xx", "GremlinRequests", "GremlinRequestsPerSec", "GremlinWebSocketAvailableConnections", "GremlinWebSocketClientErrors", "GremlinWebSocketServerErrors", "GremlinWebSocketSuccess", "Http100", "Http101", "Http1xx", "Http200", "Http2xx", "Http400", "Http403", "Http405", "Http413", "Http429", "Http4xx", "Http500", "Http501", "Http5xx", "LoaderErrors", "LoaderRequests", "NetworkReceiveThroughput", "NetworkThroughput", "NetworkTransmitThroughput", "SparqlErrors", "SparqlHttp1xx", "SparqlHttp2xx", "SparqlHttp4xx", "SparqlHttp5xx", "SparqlRequests", "SparqlRequestsPerSec", "StatusErrors", "StatusRequests", "VolumeBytesUsed", "VolumeReadIOPs", "VolumeWriteIOPs"},
	"AWS/NetworkELB":              {"ActiveFlowCount", "ActiveFlowCount_TLS", "ClientTLSNegotiationErrorCount", "ConsumedLCUs", "HealthyHostCount", "NewFlowCount", "NewFlowCount_TLS", "ProcessedBytes", "ProcessedBytes_TLS", "TCP_Client_Reset_Count", "TCP_ELB_Reset_Count", "TCP_Target_Reset_Count", "TargetTLSNegotiationErrorCount", "UnHealthyHostCount"},
	"AWS/NetworkFirewall":         {"DroppedPackets", "Packets", "PassedPackets", "ReceivedPacketCount"},
	"AWS/OpsWorks":                {"cpu_idle", "cpu_nice", "cpu_steal", "cpu_system", "cpu_user", "cpu_waitio", "load_1", "load_15", "load_5", "memory_buffers", "memory_cached", "memory_free", "memory_swap", "memory_total", "memory_used", "procs"},
	"AWS/Polly":                   {"2XXCount", "4XXCount", "5XXCount", "RequestCharacters", "ResponseLatency"},
	"AWS/RDS":                     {"ActiveTransactions", "AuroraBinlogReplicaLag", "AuroraGlobalDBDataTransferBytes", "AuroraGlobalDBReplicatedWriteIO", "AuroraGlobalDBReplicationLag", "AuroraReplicaLag", "AuroraReplicaLagMaximum", "AuroraReplicaLagMinimum", "AvailabilityPercentage", "BacktrackChangeRecordsCreationRate", "BacktrackChangeRecordsStored", "BacktrackWindowActual", "BacktrackWindowAlert", "BackupRetentionPeriodStorageUsed", "BinLogDiskUsage", "BlockedTransactions", "BufferCacheHitRatio", "BurstBalance", "CPUCreditBalance", "CPUCreditUsage", "CPUUtilization", "ClientConnections", "ClientConnectionsClosed", "ClientConnectionsNoTLS", "ClientConnectionsReceived", "ClientConnectionsSetupFailedAuth", "ClientConnectionsSetupSucceeded", "ClientConnectionsTLS", "CommitLatency", "CommitThroughput", "DDLLatency", "DDLThroughput", "DMLLatency", "DMLThroughput", "DatabaseConnectionRequests", "DatabaseConnectionRequestsWithTLS", "DatabaseConnections", "DatabaseConnectionsBorrowLatency", "DatabaseConnectionsCurrentlyBorrowed", "DatabaseConnectionsCurrentlyInTransaction", "DatabaseConnectionsCurrentlySessionPinned", "DatabaseConnectionsSetupFailed", "DatabaseConnectionsSetupSucceeded", "DatabaseConnectionsWithTLS", "Deadlocks", "DeleteLatency", "DeleteThroughput", "DiskQueueDepth", "EngineUptime", "FailedSQLServerAgentJobsCount", "FreeLocalStorage", "FreeStorageSpace", "FreeableMemory", "InsertLatency", "InsertThroughput", "LoginFailures", "MaxDatabaseConnectionsAllowed", "MaximumUsedTransactionIDs", "NetworkReceiveThroughput", "NetworkThroughput", "NetworkTransmitThroughput", "OldestReplicationSlotLag", "Queries", "QueryDatabaseResponseLatency", "QueryRequests", "QueryRequestsNoTLS", "QueryRequestsTLS", "QueryResponseLatency", "RDSToAuroraPostgreSQLReplicaLag", "ReadIOPS", "ReadLatency", "ReadThroughput", "ReplicaLag", "ReplicationSlotDiskUsage", "ResultSetCacheHitRatio", "SelectLatency", "SelectThroughput", "ServerlessDatabaseCapacity", "SnapshotStorageUsed", "SwapUsage", "TotalBackupStorageBilled", "TransactionLogsDiskUsage", "TransactionLogsGeneration", "UpdateLatency", "UpdateThroughput", "VolumeBytesUsed", "VolumeReadIOPs", "VolumeWriteIOPs", "WriteIOPS", "WriteLatency", "WriteThroughput"},
	"AWS/Redshift":                {"CommitQueueLength", "ConcurrencyScalingActiveClusters", "ConcurrencyScalingSeconds", "CPUUtilization", "DatabaseConnections", "HealthStatus", "MaintenanceMode", "MaxConfiguredConcurrencyScalingClusters", "NetworkReceiveThroughput", "NetworkTransmitThroughput", "PercentageDiskSpaceUsed", "QueriesCompletedPerSecond", "QueryDuration", "QueryRuntimeBreakdown", "ReadIOPS", "ReadLatency", "ReadThroughput", "TotalTableCount", "WLMQueueLength", "WLMQueueWaitTime", "WLMQueriesCompletedPerSecond", "WLMQueryDuration", "WLMRunningQueries", "WriteIOPS", "WriteLatency", "WriteThroughput", "SchemaQuota", "NumExceededSchemaQuotas", "StorageUsed", "PercentageQuotaUsed"},
	"AWS/Route53":                 {"ChildHealthCheckHealthyCount", "ConnectionTime", "DNSQueries", "HealthCheckPercentageHealthy", "HealthCheckStatus", "SSLHandshakeTime", "TimeToFirstByte"},
	"AWS/Route53Resolver":         {"InboundQueryVolume", "OutboundQueryVolume", "OutboundQueryAggregatedVolume"},
	"AWS/S3":                      {"4xxErrors", "5xxErrors", "AllRequests", "BucketSizeBytes", "BytesDownloaded", "BytesUploaded", "DeleteRequests", "FirstByteLatency", "GetRequests", "HeadRequests", "ListRequests", "NumberOfObjects", "PostRequests", "PutRequests", "SelectRequests", "SelectReturnedBytes", "SelectScannedBytes", "TotalRequestLatency"},
	"AWS/SDKMetrics":              {"CallCount", "ClientErrorCount", "EndToEndLatency", "ConnectionErrorCount", "ServerErrorCount", "ThrottleCount"},
	"AWS/ServiceCatalog":          {"ProvisionedProductLaunch"},
	"AWS/SES":                     {"Bounce", "Clicks", "Complaint", "Delivery", "Opens", "Reject", "Rendering Failures", "Reputation.BounceRate", "Reputation.ComplaintRate", "Send"},
	"AWS/SNS":                     {"NumberOfMessagesPublished", "NumberOfNotificationsDelivered", "NumberOfNotificationsFailed", "NumberOfNotificationsFilteredOut", "NumberOfNotificationsFilteredOut-InvalidAttributes", "NumberOfNotificationsFilteredOut-NoMessageAttributes", "PublishSize", "SMSMonthToDateSpentUSD", "SMSSuccessRate"},
	"AWS/SQS":                     {"ApproximateAgeOfOldestMessage", "ApproximateNumberOfMessagesDelayed", "ApproximateNumberOfMessagesNotVisible", "ApproximateNumberOfMessagesVisible", "NumberOfEmptyReceives", "NumberOfMessagesDeleted", "NumberOfMessagesReceived", "NumberOfMessagesSent", "SentMessageSize"},
	"AWS/SWF":                     {"ActivityTaskScheduleToCloseTime", "ActivityTaskScheduleToStartTime", "ActivityTaskStartToCloseTime", "ActivityTasksCanceled", "ActivityTasksCompleted", "ActivityTasksFailed", "ConsumedCapacity", "DecisionTaskScheduleToStartTime", "DecisionTaskStartToCloseTime", "DecisionTasksCompleted", "PendingTasks", "ProvisionedBucketSize", "ProvisionedRefillRate", "ScheduledActivityTasksTimedOutOnClose", "ScheduledActivityTasksTimedOutOnStart", "StartedActivityTasksTimedOutOnClose", "StartedActivityTasksTimedOutOnHeartbeat", "StartedDecisionTasksTimedOutOnClose", "ThrottledEvents", "WorkflowStartToCloseTime", "WorkflowsCanceled", "WorkflowsCompleted", "WorkflowsContinuedAsNew", "WorkflowsFailed", "WorkflowsTerminated", "WorkflowsTimedOut"},
	"AWS/SageMaker":               {"CPUUtilization", "DatasetObjectsAutoAnnotated", "DatasetObjectsHumanAnnotated", "DatasetObjectsLabelingFailed", "DiskUtilization", "GPUMemoryUtilization", "GPUUtilization", "Invocation4XXErrors", "Invocation5XXErrors", "Invocations", "InvocationsPerInstance", "JobsFailed", "JobsStopped", "JobsSucceeded", "MemoryUtilization", "ModelLatency", "OverheadLatency", "TotalDatasetObjectsLabeled"},
	"AWS/States":                  {"ActivitiesFailed", "ActivitiesHeartbeatTimedOut", "ActivitiesScheduled", "ActivitiesStarted", "ActivitiesSucceeded", "ActivitiesTimedOut", "ActivityRunTime", "ActivityScheduleTime", "ActivityTime", "ConsumedCapacity", "ExecutionThrottled", "ExecutionTime", "ExecutionsAborted", "ExecutionsFailed", "ExecutionsStarted", "ExecutionsSucceeded", "ExecutionsTimedOut", "LambdaFunctionRunTime", "LambdaFunctionScheduleTime", "LambdaFunctionTime", "LambdaFunctionsFailed", "LambdaFunctionsHeartbeatTimedOut", "LambdaFunctionsScheduled", "LambdaFunctionsStarted", "LambdaFunctionsSucceeded", "LambdaFunctionsTimedOut", "ProvisionedBucketSize", "ProvisionedRefillRate", "ThrottledEvents"},
	"AWS/StorageGateway":          {"CacheFree", "CacheHitPercent", "CachePercentDirty", "CachePercentUsed", "CacheUsed", "CloudBytesDownloaded", "CloudBytesUploaded", "CloudDownloadLatency", "QueuedWrites", "ReadBytes", "ReadTime", "TimeSinceLastRecoveryPoint", "TotalCacheSize", "UploadBufferFree", "UploadBufferPercentUsed", "UploadBufferUsed", "WorkingStorageFree", "WorkingStoragePercentUsed", "WorkingStorageUsed", "WriteBytes", "WriteTime"},
	"AWS/Textract":                {"ResponseTime", "ServerErrorCount", "SuccessfulRequestCount", "ThrottledCount", "UserErrorCount"},
	"AWS/Timestream":              {"SuccessfulRequestLatency", "SystemErrors", "UserErrors", "DataScannedBytes"},
	"AWS/ThingsGraph":             {"EventStoreQueueSize", "FlowExecutionTime", "FlowExecutionsFailed", "FlowExecutionsStarted", "FlowExecutionsSucceeded", "FlowStepExecutionTime", "FlowStepExecutionsFailed", "FlowStepExecutionsStarted", "FlowStepExecutionsSucceeded"},
	"AWS/TransitGateway":          {"BytesIn", "BytesOut", "PacketDropCountBlackhole", "PacketDropCountNoRoute", "PacketsIn", "PacketsOut"},
	"AWS/Translate":               {"CharacterCount", "ResponseTime", "ServerErrorCount", "SuccessfulRequestCount", "ThrottledCount", "UserErrorCount"},
	"AWS/TrustedAdvisor":          {"GreenChecks", "RedChecks", "RedResources", "ServiceLimitUsage", "YellowChecks", "YellowResources"},
	"AWS/Usage":                   {"CallCount", "ResourceCount"},
	"AWS/VPN":                     {"TunnelDataIn", "TunnelDataOut", "TunnelState"},
	"AWS/WAF":                     {"AllowedRequests", "BlockedRequests", "CountedRequests", "PassedRequests"},
	"AWS/WAFV2":                   {"AllowedRequests", "BlockedRequests", "CountedRequests", "PassedRequests"},
	"AWS/WorkSpaces":              {"Available", "ConnectionAttempt", "ConnectionFailure", "ConnectionSuccess", "InSessionLatency", "Maintenance", "SessionDisconnect", "SessionLaunchTime", "Stopped", "Unhealthy", "UserConnected"},
	"ECS/ContainerInsights":       {"ContainerInstanceCount", "CpuUtilized", "CpuReserved", "DeploymentCount", "DesiredTaskCount", "MemoryUtilized", "MemoryReserved", "NetworkRxBytes", "NetworkTxBytes", "PendingTaskCount", "RunningTaskCount", "ServiceCount", "StorageReadBytes", "StorageWriteBytes", "TaskCount", "TaskSetCount", "instance_cpu_limit", "instance_cpu_reserved_capacity", "instance_cpu_usage_total", "instance_cpu_utilization", "instance_filesystem_utilization", "instance_memory_limit", "instance_memory_reserved_capacity", "instance_memory_utliization", "instance_memory_working_set", "instance_network_total_bytes", "instance_number_of_running_tasks"},
	"ContainerInsights":           {"cluster_failed_node_count", "cluster_node_count", "namespace_number_of_running_pods", "node_cpu_limit", "node_cpu_reserved_capacity", "node_cpu_usage_total", "node_cpu_utilization", "node_filesystem_utilization", "node_memory_limit", "node_memory_reserved_capacity", "node_memory_utilization", "node_memory_working_set", "node_network_total_bytes", "node_number_of_running_containers", "node_number_of_running_pods", "pod_cpu_reserved_capacity", "pod_cpu_utilization", "pod_cpu_utilization_over_pod_limit", "pod_memory_reserved_capacity", "pod_memory_utilization", "pod_memory_utilization_over_pod_limit", "pod_number_of_container_restarts", "pod_network_rx_bytes", "pod_network_tx_bytes", "service_number_of_running_pods"},
	"Rekognition":                 {"DetectedFaceCount", "DetectedLabelCount", "ResponseTime", "ServerErrorCount", "SuccessfulRequestCount", "ThrottledCount", "UserErrorCount"},
	"AWS/Cassandra":               {"AccountMaxReads", "AccountMaxTableLevelReads", "AccountMaxTableLevelWrites", "AccountMaxWrites", "AccountProvisionedReadCapacityUtilization", "AccountProvisionedWriteCapacityUtilization", "ConditionalCheckFailedRequests", "ConsumedReadCapacityUnits", "ConsumedWriteCapacityUnits", "MaxProvisionedTableReadCapacityUtilization", "MaxProvisionedTableWriteCapacityUtilization", "ReturnedItemCount", "ReturnedItemCountBySelect", "SuccessfulRequestCount", "SuccessfulRequestLatency", "SystemErrors", "UserErrors"},
	"AWS/AmplifyHosting":          {"Requests", "BytesDownloaded", "BytesUploaded", "4XXErrors", "5XXErrors", "Latency"},
}

var dimensionsMap = map[string][]string{
	"AWS/ACMPrivateCA":            {},
	"AWS/AmazonMQ":                {"Broker", "NetworkConnector", "Queue", "Topic", "Node", "Virtual host"},
	"AWS/ApiGateway":              {"ApiId", "ApiName", "Method", "Resource", "Stage"},
	"AWS/AppStream":               {"Fleet"},
	"AWS/AppSync":                 {"GraphQLAPIId"},
	"AWS/ApplicationELB":          {"AvailabilityZone", "LoadBalancer", "TargetGroup"},
	"AWS/Athena":                  {"QueryState", "QueryType", "WorkGroup"},
	"AWS/AutoScaling":             {"AutoScalingGroupName"},
	"AWS/Billing":                 {"Currency", "LinkedAccount", "ServiceName"},
	"AWS/CertificateManager":      {},
	"AWS/Chatbot":                 {"ConfigurationName"},
	"AWS/ClientVPN":               {"Endpoint"},
	"AWS/CloudFront":              {"DistributionId", "Region"},
	"AWS/CloudHSM":                {"ClusterId", "HsmId", "Region"},
	"AWS/CloudSearch":             {"ClientId", "DomainName"},
	"AWS/CodeBuild":               {"ProjectName"},
	"AWS/CodeGuruProfiler":        {},
	"AWS/Cognito":                 {"Operation", "RiskLevel", "UserPoolId"},
	"AWS/Connect":                 {"InstanceId", "MetricGroup", "ContactFlowName", "SigningKeyId", "TypeOfConnection", "Participant", "QueueName", "StreamType"},
	"AWS/DataSync":                {"AgentId", "TaskId"},
	"AWS/DDoSProtection":          {"ResourceArn", "AttackVector", "MitigationAction", "Protocol", "SourcePort", "DestinationPort", "SourceIp", "SourceAsn", "TcpFlags"},
	"AWS/DMS":                     {"ReplicationInstanceIdentifier", "ReplicationTaskIdentifier"},
	"AWS/DocDB":                   {"DBClusterIdentifier", "DBInstanceIdentifier", "Role"},
	"AWS/DX":                      {"ConnectionId", "OpticalLaneNumber", "VirtualInterfaceId"},
	"AWS/DAX":                     {"Account", "ClusterId", "NodeId"},
	"AWS/DynamoDB":                {"GlobalSecondaryIndexName", "Operation", "ReceivingRegion", "StreamLabel", "TableName"},
	"AWS/EBS":                     {"VolumeId"},
	"AWS/EC2":                     {"AutoScalingGroupName", "ImageId", "InstanceId", "InstanceType"},
	"AWS/EC2/API":                 {},
	"AWS/EC2CapacityReservations": {"CapacityReservationId"},
	"AWS/EC2Spot":                 {"AvailabilityZone", "FleetRequestId", "InstanceType"},
	"AWS/ECS":                     {"ClusterName", "ServiceName"},
	"AWS/EFS":                     {"FileSystemId", "StorageClass"},
	"AWS/ELB":                     {"AvailabilityZone", "LoadBalancerName"},
	"AWS/ES":                      {"ClientId", "DomainName"},
	"AWS/ElastiCache":             {"CacheClusterId", "CacheNodeId"},
	"AWS/ElasticBeanstalk":        {"EnvironmentName", "InstanceId"},
	"AWS/ElasticInference":        {"ElasticInferenceAcceleratorId", "InstanceId"},
	"AWS/ElasticMapReduce":        {"ClusterId", "JobFlowId", "JobId"},
	"AWS/ElasticTranscoder":       {"Operation", "PipelineId"},
	"AWS/Events":                  {"EventBusName", "RuleName"},
	"AWS/FSx":                     {"FileSystemId"},
	"AWS/Firehose":                {"DeliveryStreamName"},
	"AWS/GameLift":                {"FleetId", "InstanceType", "MatchmakingConfigurationName", "MatchmakingConfigurationName-RuleName", "MetricGroups", "OperatingSystem", "QueueName"},
	"AWS/Glue":                    {"JobName", "JobRunId", "Type"},
	"AWS/GroundStation":           {"Channel", "Polarization", "SatelliteId"},
	"AWS/Inspector":               {},
	"AWS/IVS":                     {"Channel", "ViewerCountryCode"},
	"AWS/IoT":                     {"ActionType", "BehaviorName", "CheckName", "JobId", "Protocol", "RuleName", "ScheduledAuditName", "SecurityProfileName"},
	"AWS/IoTAnalytics":            {"ActionType", "ChannelName", "DatasetName", "DatastoreName", "PipelineActivityName", "PipelineActivityType", "PipelineName"},
	"AWS/KMS":                     {"KeyId"},
	"AWS/Kafka":                   {"Broker ID", "Cluster Name", "Consumer Group", "Topic"},
	"AWS/Kinesis":                 {"ShardId", "StreamName"},
	"AWS/KinesisAnalytics":        {"Application", "Flow", "Id"},
	"AWS/KinesisVideo":            {"StreamName"},
	"AWS/Lambda":                  {"Alias", "ExecutedVersion", "FunctionName", "Resource"},
	"AWS/Lex":                     {"BotAlias", "BotChannelName", "BotName", "BotVersion", "InputMode", "Operation", "Source"},
	"AWS/Logs":                    {"DestinationType", "FilterName", "LogGroupName"},
	"AWS/LookoutMetrics":          {"AlertArn", "AnomalyDetectorArn"},
	"AWS/ML":                      {"MLModelId", "RequestMode"},
	"AWS/MediaConnect":            {"AvailabilityZone", "FlowARN", "SourceARN", "OutputARN"},
	"AWS/MediaConvert":            {"Job", "Operation", "Queue"},
	"AWS/MediaPackage":            {"Channel", "No Dimension", "OriginEndpoint", "StatusCodeRange"},
	"AWS/MediaStore":              {"ContainerName", "ObjectGroupName", "RequestType"},
	"AWS/MediaTailor":             {"ConfigurationName"},
	"AWS/NATGateway":              {"NatGatewayId"},
	"AWS/Neptune":                 {"DBClusterIdentifier", "DatabaseClass", "EngineName", "Role"},
	"AWS/NetworkELB":              {"AvailabilityZone", "LoadBalancer", "TargetGroup"},
	"AWS/NetworkFirewall":         {"AvailabilityZone", "CustomAction", "Engine", "FirewallName"},
	"AWS/OpsWorks":                {"InstanceId", "LayerId", "StackId"},
	"AWS/Polly":                   {"Operation"},
	"AWS/RDS":                     {"DBClusterIdentifier", "DBInstanceIdentifier", "DatabaseClass", "DbClusterIdentifier", "EngineName", "ProxyName", "Role", "SourceRegion", "Target", "TargetGroup", "TargetRole"},
	"AWS/Redshift":                {"ClusterIdentifier", "NodeID", "service class", "stage", "latency", "wlmid"},
	"AWS/Route53":                 {"HealthCheckId", "Region", "HostedZoneId"},
	"AWS/Route53Resolver":         {"EndpointId"},
	"AWS/S3":                      {"BucketName", "FilterId", "StorageType"},
	"AWS/SDKMetrics":              {"DestinationRegion", "Service"},
	"AWS/ServiceCatalog":          {"State", "ProductId", "ProvisioningArtifactId"},
	"AWS/SES":                     {},
	"AWS/SNS":                     {"Application", "Country", "Platform", "SMSType", "TopicName"},
	"AWS/SQS":                     {"QueueName"},
	"AWS/SWF":                     {"APIName", "ActivityTypeName", "ActivityTypeVersion", "DecisionName", "Domain", "TaskListName", "WorkflowTypeName", "WorkflowTypeVersion"},
	"AWS/SageMaker":               {"EndpointName", "Host", "LabelingJobName", "VariantName"},
	"AWS/States":                  {"APIName", "ActivityArn", "LambdaFunctionArn", "StateMachineArn", "StateTransition"},
	"AWS/StorageGateway":          {"GatewayId", "GatewayName", "VolumeId"},
	"AWS/Textract":                {},
	"AWS/Timestream":              {"Operation", "DatabaseName", "TableName"},
	"AWS/ThingsGraph":             {"FlowTemplateId", "StepName", "SystemTemplateId"},
	"AWS/TransitGateway":          {"TransitGateway", "TransitGatewayAttachment"},
	"AWS/Translate":               {"LanguagePair", "Operation"},
	"AWS/TrustedAdvisor":          {},
	"AWS/Usage":                   {"Class", "Resource", "Service", "Type"},
	"AWS/VPN":                     {"TunnelIpAddress", "VpnId"},
	"AWS/WAF":                     {"Region", "Rule", "RuleGroup", "WebACL"},
	"AWS/WAFV2":                   {"Region", "Rule", "RuleGroup", "WebACL"},
	"AWS/WorkSpaces":              {"DirectoryId", "WorkspaceId"},
	"ECS/ContainerInsights":       {"ClusterName", "ServiceName", "TaskDefinitionFamily", "EC2InstanceId", "ContainerInstanceId"},
	"ContainerInsights":           {"ClusterName", "NodeName", "Namespace", "InstanceId", "PodName", "Service"},
	"Rekognition":                 {},
	"AWS/Cassandra":               {"Keyspace", "Operation", "TableName"},
	"AWS/AmplifyHosting":          {"App"},
}

var regionCache sync.Map

func (e *cloudWatchExecutor) executeMetricFindQuery(ctx context.Context, model *simplejson.Json, query backend.DataQuery, pluginCtx backend.PluginContext) (*backend.QueryDataResponse, error) {
	subType := model.Get("subtype").MustString()

	var data []suggestData
	var err error
	switch subType {
	case "regions":
		data, err = e.handleGetRegions(ctx, model, pluginCtx)
	case "namespaces":
		data, err = e.handleGetNamespaces(ctx, model, pluginCtx)
	case "metrics":
		data, err = e.handleGetMetrics(ctx, model, pluginCtx)
	case "dimension_keys":
		data, err = e.handleGetDimensions(ctx, model, pluginCtx)
	case "dimension_values":
		data, err = e.handleGetDimensionValues(ctx, model, pluginCtx)
	case "ebs_volume_ids":
		data, err = e.handleGetEbsVolumeIds(ctx, model, pluginCtx)
	case "ec2_instance_attribute":
		data, err = e.handleGetEc2InstanceAttribute(ctx, model, pluginCtx)
	case "resource_arns":
		data, err = e.handleGetResourceArns(ctx, model, pluginCtx)
	}
	if err != nil {
		return nil, err
	}

	resp := backend.NewQueryDataResponse()
	respD := resp.Responses[query.RefID]
	respD.Frames = append(respD.Frames, transformToTable(data))
	resp.Responses[query.RefID] = respD

	return resp, nil
}

func transformToTable(d []suggestData) *data.Frame {
	frame := data.NewFrame("",
		data.NewField("text", nil, []string{}),
		data.NewField("value", nil, []string{}))

	for _, r := range d {
		frame.AppendRow(r.Text, r.Value)
	}

	frame.Meta = &data.FrameMeta{
		Custom: map[string]interface{}{
			"rowCount": len(d),
		},
	}

	return frame
=======
	Text  string `json:"text"`
	Value string `json:"value"`
	Label string `json:"label,omitempty"`
>>>>>>> v12.1.0
}

func parseMultiSelectValue(input string) []string {
	trimmedInput := strings.TrimSpace(input)
	if strings.HasPrefix(trimmedInput, "{") {
		values := strings.Split(strings.TrimRight(strings.TrimLeft(trimmedInput, "{"), "}"), ",")
		trimmedValues := make([]string, len(values))
		for i, v := range values {
			trimmedValues[i] = strings.TrimSpace(v)
		}
		return trimmedValues
	}

	return []string{trimmedInput}
}

func (ds *DataSource) handleGetEbsVolumeIds(ctx context.Context, parameters url.Values) ([]suggestData, error) {
	region := parameters.Get("region")
	instanceId := parameters.Get("instanceId")

	instanceIds := parseMultiSelectValue(instanceId)
	instances, err := ds.ec2DescribeInstances(ctx, region, nil, instanceIds)
	if err != nil {
		return nil, err
	}

	result := make([]suggestData, 0)
	for _, reservation := range instances.Reservations {
		for _, instance := range reservation.Instances {
			for _, mapping := range instance.BlockDeviceMappings {
				result = append(result, suggestData{Text: *mapping.Ebs.VolumeId, Value: *mapping.Ebs.VolumeId, Label: *mapping.Ebs.VolumeId})
			}
		}
	}

	return result, nil
}

func (ds *DataSource) handleGetEc2InstanceAttribute(ctx context.Context, parameters url.Values) ([]suggestData, error) {
	region := parameters.Get("region")
	attributeName := parameters.Get("attributeName")
	filterJson := parameters.Get("filters")

	filterMap := map[string]any{}
	err := json.Unmarshal([]byte(filterJson), &filterMap)
	if err != nil {
		return nil, fmt.Errorf("error unmarshaling filter: %v", err)
	}

	var filters []ec2types.Filter
	for k, v := range filterMap {
		if vv, ok := v.([]any); ok {
			var values []string
			for _, vvv := range vv {
				if vvvv, ok := vvv.(string); ok {
					values = append(values, vvvv)
				}
			}
			filters = append(filters, ec2types.Filter{
				Name:   aws.String(k),
				Values: values,
			})
		}
	}

	instances, err := ds.ec2DescribeInstances(ctx, region, filters, nil)
	if err != nil {
		return nil, err
	}

	result := make([]suggestData, 0)
	dupCheck := make(map[string]bool)
	for _, reservation := range instances.Reservations {
		for _, instance := range reservation.Instances {
			data, found, err := getInstanceAttributeValue(attributeName, instance)
			if err != nil {
				return nil, err
			}
			if !found {
				continue
			}
			if _, exists := dupCheck[data]; exists {
				continue
			}

			dupCheck[data] = true
			result = append(result, suggestData{Text: data, Value: data, Label: data})
		}
	}

	sort.Slice(result, func(i, j int) bool {
		return result[i].Text < result[j].Text
	})

	return result, nil
}

func getInstanceAttributeValue(attributeName string, instance ec2types.Instance) (value string, found bool, err error) {
	tags := make(map[string]string)
	for _, tag := range instance.Tags {
		tags[*tag.Key] = *tag.Value
	}

	var data string
	if strings.Index(attributeName, "Tags.") == 0 {
		tagName := attributeName[5:]
		data = tags[tagName]
	} else {
		attributePath := strings.Split(attributeName, ".")
		v := reflect.ValueOf(instance)
		for _, key := range attributePath {
			if v.Kind() == reflect.Ptr {
				if v.IsNil() {
					return "", false, nil
				}
				v = v.Elem()
			}
			if v.Kind() != reflect.Struct {
				return "", false, errors.New("invalid attribute path")
			}
			v = v.FieldByName(key)
			if !v.IsValid() {
				return "", false, errors.New("invalid attribute path")
			}
		}

		if v.Kind() == reflect.Ptr && v.IsNil() {
			return "", false, nil
		}
		if v.Kind() == reflect.String {
			if v.String() == "" {
				return "", false, nil
			}
			data = v.String()
		} else if attr, ok := v.Interface().(*string); ok {
			data = *attr
		} else if attr, ok := v.Interface().(*time.Time); ok {
			data = attr.String()
		} else if _, ok := v.Interface().(*bool); ok {
			data = fmt.Sprint(v.Elem().Bool())
		} else if v.Kind() == reflect.Ptr && v.Elem().CanInt() {
			data = fmt.Sprint(v.Elem().Int())
		} else {
			return "", false, errors.New("cannot parse attribute")
		}
	}

	return data, true, nil
}

func (ds *DataSource) handleGetResourceArns(ctx context.Context, parameters url.Values) ([]suggestData, error) {
	region := parameters.Get("region")
	resourceType := parameters.Get("resourceType")
	tagsJson := parameters.Get("tags")

	tagsMap := map[string]any{}
	err := json.Unmarshal([]byte(tagsJson), &tagsMap)
	if err != nil {
		return nil, fmt.Errorf("error unmarshaling filter: %v", err)
	}

	var filters []resourcegroupstaggingapitypes.TagFilter
	for k, v := range tagsMap {
		if vv, ok := v.([]any); ok {
			var values []string
			for _, vvv := range vv {
				if vvvv, ok := vvv.(string); ok {
					values = append(values, vvvv)
				}
			}
			filters = append(filters, resourcegroupstaggingapitypes.TagFilter{
				Key:    aws.String(k),
				Values: values,
			})
		}
	}

	resourceTypes := []string{resourceType}

	resources, err := ds.resourceGroupsGetResources(ctx, region, filters, resourceTypes)
	if err != nil {
		return nil, err
	}

	result := make([]suggestData, 0)
	for _, resource := range resources.ResourceTagMappingList {
		data := *resource.ResourceARN
		result = append(result, suggestData{Text: data, Value: data, Label: data})
	}

	return result, nil
}

func (ds *DataSource) ec2DescribeInstances(ctx context.Context, region string, filters []ec2types.Filter, instanceIds []string) (*ec2.DescribeInstancesOutput, error) {
	params := &ec2.DescribeInstancesInput{
		Filters:     filters,
		InstanceIds: instanceIds,
	}

	client, err := ds.getEC2Client(ctx, region)
	if err != nil {
		return nil, err
	}

	resp := &ec2.DescribeInstancesOutput{}
	pager := ec2.NewDescribeInstancesPaginator(client, params)
	for pager.HasMorePages() {
		page, err := pager.NextPage(ctx)
		if err != nil {
			return resp, fmt.Errorf("describe instances pager failed: %w", err)
		}
		resp.Reservations = append(resp.Reservations, page.Reservations...)
	}
	return resp, nil
}

func (ds *DataSource) resourceGroupsGetResources(ctx context.Context, region string, filters []resourcegroupstaggingapitypes.TagFilter,
	resourceTypes []string) (*resourcegroupstaggingapi.GetResourcesOutput, error) {
	params := &resourcegroupstaggingapi.GetResourcesInput{
		ResourceTypeFilters: resourceTypes,
		TagFilters:          filters,
	}

	client, err := ds.getRGTAClient(ctx, region)
	if err != nil {
		return nil, err
	}

	var resp resourcegroupstaggingapi.GetResourcesOutput
	paginator := resourcegroupstaggingapi.NewGetResourcesPaginator(client, params)
	for paginator.HasMorePages() {
		page, err := paginator.NextPage(ctx)
		if err != nil {
			return nil, fmt.Errorf("get resource groups paginator failed: %w", err)
		}
		resp.ResourceTagMappingList = append(resp.ResourceTagMappingList, page.ResourceTagMappingList...)
	}

	return &resp, nil
}

// legacy route, will be removed once GovCloud supports Cross Account Observability
func (ds *DataSource) handleGetLogGroups(ctx context.Context, parameters url.Values) ([]suggestData, error) {
	region := parameters.Get("region")
	limit := parameters.Get("limit")
	logGroupNamePrefix := parameters.Get("logGroupNamePrefix")

	logsClient, err := ds.getCWLogsClient(ctx, region)
	if err != nil {
		return nil, err
	}

	logGroupLimit := defaultLogGroupLimit
	intLimit, err := strconv.ParseInt(limit, 10, 32)
	if err == nil && intLimit > 0 {
		logGroupLimit = int32(intLimit)
	}

	input := &cloudwatchlogs.DescribeLogGroupsInput{Limit: aws.Int32(logGroupLimit)}
	if len(logGroupNamePrefix) > 0 {
		input.LogGroupNamePrefix = aws.String(logGroupNamePrefix)
	}
	var response *cloudwatchlogs.DescribeLogGroupsOutput
	response, err = logsClient.DescribeLogGroups(ctx, input)
	if err != nil || response == nil {
		return nil, err
	}
	result := make([]suggestData, 0)
	for _, logGroup := range response.LogGroups {
		logGroupName := *logGroup.LogGroupName
		result = append(result, suggestData{Text: logGroupName, Value: logGroupName, Label: logGroupName})
	}

	return result, nil
}
