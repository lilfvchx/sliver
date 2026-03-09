export type RpcMethod = {
  name: string;
  request: string;
  response: string;
  category: string;
  handler: string;
};

export const rpcCatalog: RpcMethod[] = [
  {
    "name": "GetVersion",
    "request": "commonpb.Empty",
    "response": "clientpb.Version",
    "category": "Version",
    "handler": "server/rpc/rpc.go"
  },
  {
    "name": "ClientLog",
    "request": "stream clientpb.ClientLogData",
    "response": "commonpb.Empty",
    "category": "Client Logs",
    "handler": "server/rpc/rpc-client-logs.go"
  },
  {
    "name": "GetOperators",
    "request": "commonpb.Empty",
    "response": "clientpb.Operators",
    "category": "Operator Commands",
    "handler": "server/rpc/rpc-operators.go"
  },
  {
    "name": "Kill",
    "request": "sliverpb.KillReq",
    "response": "commonpb.Empty",
    "category": "Generic",
    "handler": "server/rpc/rpc-kill.go"
  },
  {
    "name": "Reconfigure",
    "request": "sliverpb.ReconfigureReq",
    "response": "sliverpb.Reconfigure",
    "category": "Generic",
    "handler": "server/rpc/rpc-reconfig.go"
  },
  {
    "name": "Rename",
    "request": "clientpb.RenameReq",
    "response": "commonpb.Empty",
    "category": "Generic",
    "handler": "server/rpc/rpc-reconfig.go"
  },
  {
    "name": "GetSessions",
    "request": "commonpb.Empty",
    "response": "clientpb.Sessions",
    "category": "Sessions",
    "handler": "server/rpc/rpc-sessions.go"
  },
  {
    "name": "MonitorStart",
    "request": "commonpb.Empty",
    "response": "commonpb.Response",
    "category": "Threat monitoring",
    "handler": "server/rpc/rpc-monitor.go"
  },
  {
    "name": "MonitorStop",
    "request": "commonpb.Empty",
    "response": "commonpb.Empty",
    "category": "Threat monitoring",
    "handler": "server/rpc/rpc-monitor.go"
  },
  {
    "name": "MonitorListConfig",
    "request": "commonpb.Empty",
    "response": "clientpb.MonitoringProviders",
    "category": "Threat monitoring",
    "handler": "server/rpc/rpc-monitor.go"
  },
  {
    "name": "MonitorAddConfig",
    "request": "clientpb.MonitoringProvider",
    "response": "commonpb.Response",
    "category": "Threat monitoring",
    "handler": "server/rpc/rpc-monitor.go"
  },
  {
    "name": "MonitorDelConfig",
    "request": "clientpb.MonitoringProvider",
    "response": "commonpb.Response",
    "category": "Threat monitoring",
    "handler": "server/rpc/rpc-monitor.go"
  },
  {
    "name": "StartMTLSListener",
    "request": "clientpb.MTLSListenerReq",
    "response": "clientpb.ListenerJob",
    "category": "Listeners",
    "handler": "server/rpc/rpc-jobs.go"
  },
  {
    "name": "StartWGListener",
    "request": "clientpb.WGListenerReq",
    "response": "clientpb.ListenerJob",
    "category": "Listeners",
    "handler": "server/rpc/rpc-jobs.go"
  },
  {
    "name": "StartDNSListener",
    "request": "clientpb.DNSListenerReq",
    "response": "clientpb.ListenerJob",
    "category": "Listeners",
    "handler": "server/rpc/rpc-jobs.go"
  },
  {
    "name": "StartHTTPSListener",
    "request": "clientpb.HTTPListenerReq",
    "response": "clientpb.ListenerJob",
    "category": "Listeners",
    "handler": "server/rpc/rpc-jobs.go"
  },
  {
    "name": "StartHTTPListener",
    "request": "clientpb.HTTPListenerReq",
    "response": "clientpb.ListenerJob",
    "category": "Listeners",
    "handler": "server/rpc/rpc-jobs.go"
  },
  {
    "name": "GetBeacons",
    "request": "commonpb.Empty",
    "response": "clientpb.Beacons",
    "category": "Beacons",
    "handler": "server/rpc/rpc-beacons.go"
  },
  {
    "name": "GetBeacon",
    "request": "clientpb.Beacon",
    "response": "clientpb.Beacon",
    "category": "Beacons",
    "handler": "server/rpc/rpc-beacons.go"
  },
  {
    "name": "RmBeacon",
    "request": "clientpb.Beacon",
    "response": "commonpb.Empty",
    "category": "Beacons",
    "handler": "server/rpc/rpc-beacons.go"
  },
  {
    "name": "GetBeaconTasks",
    "request": "clientpb.Beacon",
    "response": "clientpb.BeaconTasks",
    "category": "Beacons",
    "handler": "server/rpc/rpc-beacons.go"
  },
  {
    "name": "GetBeaconTaskContent",
    "request": "clientpb.BeaconTask",
    "response": "clientpb.BeaconTask",
    "category": "Beacons",
    "handler": "server/rpc/rpc-beacons.go"
  },
  {
    "name": "CancelBeaconTask",
    "request": "clientpb.BeaconTask",
    "response": "clientpb.BeaconTask",
    "category": "Beacons",
    "handler": "server/rpc/rpc-beacons.go"
  },
  {
    "name": "UpdateBeaconIntegrityInformation",
    "request": "clientpb.BeaconIntegrity",
    "response": "commonpb.Empty",
    "category": "Beacons",
    "handler": "server/rpc/rpc-beacons.go"
  },
  {
    "name": "GetJobs",
    "request": "commonpb.Empty",
    "response": "clientpb.Jobs",
    "category": "Jobs",
    "handler": "server/rpc/rpc-jobs.go"
  },
  {
    "name": "KillJob",
    "request": "clientpb.KillJobReq",
    "response": "clientpb.KillJob",
    "category": "Jobs",
    "handler": "server/rpc/rpc-jobs.go"
  },
  {
    "name": "RestartJobs",
    "request": "clientpb.RestartJobReq",
    "response": "commonpb.Empty",
    "category": "Jobs",
    "handler": "server/rpc/rpc-jobs.go"
  },
  {
    "name": "StartTCPStagerListener",
    "request": "clientpb.StagerListenerReq",
    "response": "clientpb.StagerListener",
    "category": "Stager Listener",
    "handler": "server/rpc/rpc-stager.go"
  },
  {
    "name": "LootAdd",
    "request": "clientpb.Loot",
    "response": "clientpb.Loot",
    "category": "Loot",
    "handler": "server/rpc/rpc-loot.go"
  },
  {
    "name": "LootRm",
    "request": "clientpb.Loot",
    "response": "commonpb.Empty",
    "category": "Loot",
    "handler": "server/rpc/rpc-loot.go"
  },
  {
    "name": "LootUpdate",
    "request": "clientpb.Loot",
    "response": "clientpb.Loot",
    "category": "Loot",
    "handler": "server/rpc/rpc-loot.go"
  },
  {
    "name": "LootContent",
    "request": "clientpb.Loot",
    "response": "clientpb.Loot",
    "category": "Loot",
    "handler": "server/rpc/rpc-loot.go"
  },
  {
    "name": "LootAll",
    "request": "commonpb.Empty",
    "response": "clientpb.AllLoot",
    "category": "Loot",
    "handler": "server/rpc/rpc-loot.go"
  },
  {
    "name": "Creds",
    "request": "commonpb.Empty",
    "response": "clientpb.Credentials",
    "category": "Creds",
    "handler": "server/rpc/rpc-creds.go"
  },
  {
    "name": "CredsAdd",
    "request": "clientpb.Credentials",
    "response": "commonpb.Empty",
    "category": "Creds",
    "handler": "server/rpc/rpc-creds.go"
  },
  {
    "name": "CredsRm",
    "request": "clientpb.Credentials",
    "response": "commonpb.Empty",
    "category": "Creds",
    "handler": "server/rpc/rpc-creds.go"
  },
  {
    "name": "CredsUpdate",
    "request": "clientpb.Credentials",
    "response": "commonpb.Empty",
    "category": "Creds",
    "handler": "server/rpc/rpc-creds.go"
  },
  {
    "name": "GetCredByID",
    "request": "clientpb.Credential",
    "response": "clientpb.Credential",
    "category": "Creds",
    "handler": "server/rpc/rpc-creds.go"
  },
  {
    "name": "GetCredsByHashType",
    "request": "clientpb.Credential",
    "response": "clientpb.Credentials",
    "category": "Creds",
    "handler": "server/rpc/rpc-creds.go"
  },
  {
    "name": "GetPlaintextCredsByHashType",
    "request": "clientpb.Credential",
    "response": "clientpb.Credentials",
    "category": "Creds",
    "handler": "server/rpc/rpc-creds.go"
  },
  {
    "name": "CredsSniffHashType",
    "request": "clientpb.Credential",
    "response": "clientpb.Credential",
    "category": "Creds",
    "handler": "server/rpc/rpc-creds.go"
  },
  {
    "name": "Hosts",
    "request": "commonpb.Empty",
    "response": "clientpb.AllHosts",
    "category": "Hosts",
    "handler": "server/rpc/rpc-hosts.go"
  },
  {
    "name": "Host",
    "request": "clientpb.Host",
    "response": "clientpb.Host",
    "category": "Hosts",
    "handler": "server/rpc/rpc-hosts.go"
  },
  {
    "name": "HostRm",
    "request": "clientpb.Host",
    "response": "commonpb.Empty",
    "category": "Hosts",
    "handler": "server/rpc/rpc-hosts.go"
  },
  {
    "name": "HostIOCRm",
    "request": "clientpb.IOC",
    "response": "commonpb.Empty",
    "category": "Hosts",
    "handler": "server/rpc/rpc-hosts.go"
  },
  {
    "name": "Generate",
    "request": "clientpb.GenerateReq",
    "response": "clientpb.Generate",
    "category": "Implants",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "GenerateSpoofMetadata",
    "request": "clientpb.GenerateSpoofMetadataReq",
    "response": "commonpb.Empty",
    "category": "Implants",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "GenerateExternal",
    "request": "clientpb.ExternalGenerateReq",
    "response": "clientpb.ExternalImplantConfig",
    "category": "Implants",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "GenerateExternalSaveBuild",
    "request": "clientpb.ExternalImplantBinary",
    "response": "commonpb.Empty",
    "category": "Implants",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "GenerateExternalGetBuildConfig",
    "request": "clientpb.ImplantBuild",
    "response": "clientpb.ExternalImplantConfig",
    "category": "Implants",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "GenerateStage",
    "request": "clientpb.GenerateStageReq",
    "response": "clientpb.Generate",
    "category": "Implants",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "StageImplantBuild",
    "request": "clientpb.ImplantStageReq",
    "response": "commonpb.Empty",
    "category": "Implants",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "GetHTTPC2Profiles",
    "request": "commonpb.Empty",
    "response": "clientpb.HTTPC2Configs",
    "category": "HTTP C2 Profiles",
    "handler": "server/rpc/rpc-c2profile.go"
  },
  {
    "name": "GetHTTPC2ProfileByName",
    "request": "clientpb.C2ProfileReq",
    "response": "clientpb.HTTPC2Config",
    "category": "HTTP C2 Profiles",
    "handler": "server/rpc/rpc-c2profile.go"
  },
  {
    "name": "SaveHTTPC2Profile",
    "request": "clientpb.HTTPC2ConfigReq",
    "response": "commonpb.Empty",
    "category": "HTTP C2 Profiles",
    "handler": "server/rpc/rpc-c2profile.go"
  },
  {
    "name": "BuilderRegister",
    "request": "clientpb.Builder",
    "response": "stream clientpb.Event",
    "category": "Builders",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "BuilderTrigger",
    "request": "clientpb.Event",
    "response": "commonpb.Empty",
    "category": "Builders",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "Builders",
    "request": "commonpb.Empty",
    "response": "clientpb.Builders",
    "category": "Builders",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "GetCertificateInfo",
    "request": "clientpb.CertificatesReq",
    "response": "clientpb.CertificateInfo",
    "category": "Certificates",
    "handler": "server/rpc/rpc-certificates.go"
  },
  {
    "name": "GetCertificateAuthorityInfo",
    "request": "commonpb.Empty",
    "response": "clientpb.CertificateAuthorityInfo",
    "category": "Certificates",
    "handler": "server/rpc/rpc-certificates.go"
  },
  {
    "name": "Crack",
    "request": "clientpb.CrackCommand",
    "response": "clientpb.CrackResponse",
    "category": "Crackstation",
    "handler": "server/rpc/rpc-crack.go"
  },
  {
    "name": "CrackstationRegister",
    "request": "clientpb.Crackstation",
    "response": "stream clientpb.Event",
    "category": "Crackstation",
    "handler": "server/rpc/rpc-crackstations.go"
  },
  {
    "name": "CrackstationTrigger",
    "request": "clientpb.Event",
    "response": "commonpb.Empty",
    "category": "Crackstation",
    "handler": "server/rpc/rpc-crackstations.go"
  },
  {
    "name": "CrackstationBenchmark",
    "request": "clientpb.CrackBenchmark",
    "response": "commonpb.Empty",
    "category": "Crackstation",
    "handler": "server/rpc/rpc-crackstations.go"
  },
  {
    "name": "Crackstations",
    "request": "commonpb.Empty",
    "response": "clientpb.Crackstations",
    "category": "Crackstation",
    "handler": "server/rpc/rpc-crackstations.go"
  },
  {
    "name": "CrackTaskByID",
    "request": "clientpb.CrackTask",
    "response": "clientpb.CrackTask",
    "category": "Crackstation",
    "handler": "server/rpc/rpc-crackstations.go"
  },
  {
    "name": "CrackTaskUpdate",
    "request": "clientpb.CrackTask",
    "response": "commonpb.Empty",
    "category": "Crackstation",
    "handler": "server/rpc/rpc-crackstations.go"
  },
  {
    "name": "CrackFilesList",
    "request": "clientpb.CrackFile",
    "response": "clientpb.CrackFiles",
    "category": "Crackstation",
    "handler": "server/rpc/rpc-crackstations.go"
  },
  {
    "name": "CrackFileCreate",
    "request": "clientpb.CrackFile",
    "response": "clientpb.CrackFile",
    "category": "Crackstation",
    "handler": "server/rpc/rpc-crackstations.go"
  },
  {
    "name": "CrackFileChunkUpload",
    "request": "clientpb.CrackFileChunk",
    "response": "commonpb.Empty",
    "category": "Crackstation",
    "handler": "server/rpc/rpc-crackstations.go"
  },
  {
    "name": "CrackFileChunkDownload",
    "request": "clientpb.CrackFileChunk",
    "response": "clientpb.CrackFileChunk",
    "category": "Crackstation",
    "handler": "server/rpc/rpc-crackstations.go"
  },
  {
    "name": "CrackFileComplete",
    "request": "clientpb.CrackFile",
    "response": "commonpb.Empty",
    "category": "Crackstation",
    "handler": "server/rpc/rpc-crackstations.go"
  },
  {
    "name": "CrackFileDelete",
    "request": "clientpb.CrackFile",
    "response": "commonpb.Empty",
    "category": "Crackstation",
    "handler": "server/rpc/rpc-crackstations.go"
  },
  {
    "name": "Regenerate",
    "request": "clientpb.RegenerateReq",
    "response": "clientpb.Generate",
    "category": "Payloads",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "ImplantBuilds",
    "request": "commonpb.Empty",
    "response": "clientpb.ImplantBuilds",
    "category": "Payloads",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "DeleteImplantBuild",
    "request": "clientpb.DeleteReq",
    "response": "commonpb.Empty",
    "category": "Payloads",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "Canaries",
    "request": "commonpb.Empty",
    "response": "clientpb.Canaries",
    "category": "Payloads",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "GenerateWGClientConfig",
    "request": "commonpb.Empty",
    "response": "clientpb.WGClientConfig",
    "category": "Payloads",
    "handler": "server/rpc/rpc-wg.go"
  },
  {
    "name": "GenerateUniqueIP",
    "request": "commonpb.Empty",
    "response": "clientpb.UniqueWGIP",
    "category": "Payloads",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "ImplantProfiles",
    "request": "commonpb.Empty",
    "response": "clientpb.ImplantProfiles",
    "category": "Payloads",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "DeleteImplantProfile",
    "request": "clientpb.DeleteReq",
    "response": "commonpb.Empty",
    "category": "Payloads",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "SaveImplantProfile",
    "request": "clientpb.ImplantProfile",
    "response": "clientpb.ImplantProfile",
    "category": "Payloads",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "ShellcodeRDI",
    "request": "clientpb.ShellcodeRDIReq",
    "response": "clientpb.ShellcodeRDI",
    "category": "Payloads",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "GetCompiler",
    "request": "commonpb.Empty",
    "response": "clientpb.Compiler",
    "category": "Payloads",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "ShellcodeEncoder",
    "request": "clientpb.ShellcodeEncodeReq",
    "response": "clientpb.ShellcodeEncode",
    "category": "Payloads",
    "handler": "server/rpc/rpc-shellcode.go"
  },
  {
    "name": "ShellcodeEncoderMap",
    "request": "commonpb.Empty",
    "response": "clientpb.ShellcodeEncoderMap",
    "category": "Payloads",
    "handler": "server/rpc/rpc-shellcode.go"
  },
  {
    "name": "TrafficEncoderMap",
    "request": "commonpb.Empty",
    "response": "clientpb.TrafficEncoderMap",
    "category": "Payloads",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "TrafficEncoderAdd",
    "request": "clientpb.TrafficEncoder",
    "response": "clientpb.TrafficEncoderTests",
    "category": "Payloads",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "TrafficEncoderRm",
    "request": "clientpb.TrafficEncoder",
    "response": "commonpb.Empty",
    "category": "Payloads",
    "handler": "server/rpc/rpc-generate.go"
  },
  {
    "name": "Websites",
    "request": "commonpb.Empty",
    "response": "clientpb.Websites",
    "category": "Websites",
    "handler": "server/rpc/rpc-website.go"
  },
  {
    "name": "Website",
    "request": "clientpb.Website",
    "response": "clientpb.Website",
    "category": "Websites",
    "handler": "server/rpc/rpc-website.go"
  },
  {
    "name": "WebsiteRemove",
    "request": "clientpb.Website",
    "response": "commonpb.Empty",
    "category": "Websites",
    "handler": "server/rpc/rpc-website.go"
  },
  {
    "name": "WebsiteAddContent",
    "request": "clientpb.WebsiteAddContent",
    "response": "clientpb.Website",
    "category": "Websites",
    "handler": "server/rpc/rpc-website.go"
  },
  {
    "name": "WebsiteUpdateContent",
    "request": "clientpb.WebsiteAddContent",
    "response": "clientpb.Website",
    "category": "Websites",
    "handler": "server/rpc/rpc-website.go"
  },
  {
    "name": "WebsiteRemoveContent",
    "request": "clientpb.WebsiteRemoveContent",
    "response": "clientpb.Website",
    "category": "Websites",
    "handler": "server/rpc/rpc-website.go"
  },
  {
    "name": "Ping",
    "request": "sliverpb.Ping",
    "response": "sliverpb.Ping",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-ping.go"
  },
  {
    "name": "Ps",
    "request": "sliverpb.PsReq",
    "response": "sliverpb.Ps",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-process.go"
  },
  {
    "name": "Terminate",
    "request": "sliverpb.TerminateReq",
    "response": "sliverpb.Terminate",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-process.go"
  },
  {
    "name": "Ifconfig",
    "request": "sliverpb.IfconfigReq",
    "response": "sliverpb.Ifconfig",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-net.go"
  },
  {
    "name": "Netstat",
    "request": "sliverpb.NetstatReq",
    "response": "sliverpb.Netstat",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-net.go"
  },
  {
    "name": "Ls",
    "request": "sliverpb.LsReq",
    "response": "sliverpb.Ls",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-filesystem.go"
  },
  {
    "name": "Cd",
    "request": "sliverpb.CdReq",
    "response": "sliverpb.Pwd",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-filesystem.go"
  },
  {
    "name": "Pwd",
    "request": "sliverpb.PwdReq",
    "response": "sliverpb.Pwd",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-filesystem.go"
  },
  {
    "name": "Mv",
    "request": "sliverpb.MvReq",
    "response": "sliverpb.Mv",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-filesystem.go"
  },
  {
    "name": "Cp",
    "request": "sliverpb.CpReq",
    "response": "sliverpb.Cp",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-filesystem.go"
  },
  {
    "name": "Rm",
    "request": "sliverpb.RmReq",
    "response": "sliverpb.Rm",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-filesystem.go"
  },
  {
    "name": "Mkdir",
    "request": "sliverpb.MkdirReq",
    "response": "sliverpb.Mkdir",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-filesystem.go"
  },
  {
    "name": "Download",
    "request": "sliverpb.DownloadReq",
    "response": "sliverpb.Download",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-filesystem.go"
  },
  {
    "name": "Upload",
    "request": "sliverpb.UploadReq",
    "response": "sliverpb.Upload",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-filesystem.go"
  },
  {
    "name": "Grep",
    "request": "sliverpb.GrepReq",
    "response": "sliverpb.Grep",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-filesystem.go"
  },
  {
    "name": "Chmod",
    "request": "sliverpb.ChmodReq",
    "response": "sliverpb.Chmod",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-filesystem.go"
  },
  {
    "name": "Chown",
    "request": "sliverpb.ChownReq",
    "response": "sliverpb.Chown",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-filesystem.go"
  },
  {
    "name": "Chtimes",
    "request": "sliverpb.ChtimesReq",
    "response": "sliverpb.Chtimes",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-filesystem.go"
  },
  {
    "name": "MemfilesList",
    "request": "sliverpb.MemfilesListReq",
    "response": "sliverpb.Ls",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-filesystem.go"
  },
  {
    "name": "MemfilesAdd",
    "request": "sliverpb.MemfilesAddReq",
    "response": "sliverpb.MemfilesAdd",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-filesystem.go"
  },
  {
    "name": "MemfilesRm",
    "request": "sliverpb.MemfilesRmReq",
    "response": "sliverpb.MemfilesRm",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-filesystem.go"
  },
  {
    "name": "Mount",
    "request": "sliverpb.MountReq",
    "response": "sliverpb.Mount",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-filesystem.go"
  },
  {
    "name": "ProcessDump",
    "request": "sliverpb.ProcessDumpReq",
    "response": "sliverpb.ProcessDump",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-process.go"
  },
  {
    "name": "RunAs",
    "request": "sliverpb.RunAsReq",
    "response": "sliverpb.RunAs",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-priv.go"
  },
  {
    "name": "Impersonate",
    "request": "sliverpb.ImpersonateReq",
    "response": "sliverpb.Impersonate",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-priv.go"
  },
  {
    "name": "RevToSelf",
    "request": "sliverpb.RevToSelfReq",
    "response": "sliverpb.RevToSelf",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-priv.go"
  },
  {
    "name": "GetSystem",
    "request": "clientpb.GetSystemReq",
    "response": "sliverpb.GetSystem",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-priv.go"
  },
  {
    "name": "Task",
    "request": "sliverpb.TaskReq",
    "response": "sliverpb.Task",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-tasks.go"
  },
  {
    "name": "Msf",
    "request": "clientpb.MSFReq",
    "response": "sliverpb.Task",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-msf.go"
  },
  {
    "name": "MsfRemote",
    "request": "clientpb.MSFRemoteReq",
    "response": "sliverpb.Task",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-msf.go"
  },
  {
    "name": "ExecuteAssembly",
    "request": "sliverpb.ExecuteAssemblyReq",
    "response": "sliverpb.ExecuteAssembly",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-tasks.go"
  },
  {
    "name": "Migrate",
    "request": "clientpb.MigrateReq",
    "response": "sliverpb.Migrate",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-tasks.go"
  },
  {
    "name": "Execute",
    "request": "sliverpb.ExecuteReq",
    "response": "sliverpb.Execute",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-execute.go"
  },
  {
    "name": "ExecuteWindows",
    "request": "sliverpb.ExecuteWindowsReq",
    "response": "sliverpb.Execute",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-execute.go"
  },
  {
    "name": "ExecuteChildren",
    "request": "sliverpb.ExecuteChildrenReq",
    "response": "sliverpb.ExecuteChildren",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-execute-children.go"
  },
  {
    "name": "Sideload",
    "request": "sliverpb.SideloadReq",
    "response": "sliverpb.Sideload",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-tasks.go"
  },
  {
    "name": "SpawnDll",
    "request": "sliverpb.InvokeSpawnDllReq",
    "response": "sliverpb.SpawnDll",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-tasks.go"
  },
  {
    "name": "Screenshot",
    "request": "sliverpb.ScreenshotReq",
    "response": "sliverpb.Screenshot",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-screenshot.go"
  },
  {
    "name": "CurrentTokenOwner",
    "request": "sliverpb.CurrentTokenOwnerReq",
    "response": "sliverpb.CurrentTokenOwner",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-priv.go"
  },
  {
    "name": "Services",
    "request": "sliverpb.ServicesReq",
    "response": "sliverpb.Services",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-service.go"
  },
  {
    "name": "ServiceDetail",
    "request": "sliverpb.ServiceDetailReq",
    "response": "sliverpb.ServiceDetail",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-service.go"
  },
  {
    "name": "StartServiceByName",
    "request": "sliverpb.StartServiceByNameReq",
    "response": "sliverpb.ServiceInfo",
    "category": "Session Interactions",
    "handler": "server/rpc/rpc-service.go"
  },
  {
    "name": "PivotStartListener",
    "request": "sliverpb.PivotStartListenerReq",
    "response": "sliverpb.PivotListener",
    "category": "Pivots",
    "handler": "server/rpc/rpc-pivots.go"
  },
  {
    "name": "PivotStopListener",
    "request": "sliverpb.PivotStopListenerReq",
    "response": "commonpb.Empty",
    "category": "Pivots",
    "handler": "server/rpc/rpc-pivots.go"
  },
  {
    "name": "PivotSessionListeners",
    "request": "sliverpb.PivotListenersReq",
    "response": "sliverpb.PivotListeners",
    "category": "Pivots",
    "handler": "server/rpc/rpc-pivots.go"
  },
  {
    "name": "PivotGraph",
    "request": "commonpb.Empty",
    "response": "clientpb.PivotGraph",
    "category": "Pivots",
    "handler": "server/rpc/rpc-pivots.go"
  },
  {
    "name": "StartService",
    "request": "sliverpb.StartServiceReq",
    "response": "sliverpb.ServiceInfo",
    "category": "Pivots",
    "handler": "server/rpc/rpc-service.go"
  },
  {
    "name": "StopService",
    "request": "sliverpb.StopServiceReq",
    "response": "sliverpb.ServiceInfo",
    "category": "Pivots",
    "handler": "server/rpc/rpc-service.go"
  },
  {
    "name": "RemoveService",
    "request": "sliverpb.RemoveServiceReq",
    "response": "sliverpb.ServiceInfo",
    "category": "Pivots",
    "handler": "server/rpc/rpc-service.go"
  },
  {
    "name": "MakeToken",
    "request": "sliverpb.MakeTokenReq",
    "response": "sliverpb.MakeToken",
    "category": "Pivots",
    "handler": "server/rpc/rpc-priv.go"
  },
  {
    "name": "GetEnv",
    "request": "sliverpb.EnvReq",
    "response": "sliverpb.EnvInfo",
    "category": "Pivots",
    "handler": "server/rpc/rpc-env.go"
  },
  {
    "name": "SetEnv",
    "request": "sliverpb.SetEnvReq",
    "response": "sliverpb.SetEnv",
    "category": "Pivots",
    "handler": "server/rpc/rpc-env.go"
  },
  {
    "name": "UnsetEnv",
    "request": "sliverpb.UnsetEnvReq",
    "response": "sliverpb.UnsetEnv",
    "category": "Pivots",
    "handler": "server/rpc/rpc-env.go"
  },
  {
    "name": "Backdoor",
    "request": "clientpb.BackdoorReq",
    "response": "clientpb.Backdoor",
    "category": "Pivots",
    "handler": "server/rpc/rpc-backdoor.go"
  },
  {
    "name": "RegistryRead",
    "request": "sliverpb.RegistryReadReq",
    "response": "sliverpb.RegistryRead",
    "category": "Pivots",
    "handler": "server/rpc/rpc-registry.go"
  },
  {
    "name": "RegistryWrite",
    "request": "sliverpb.RegistryWriteReq",
    "response": "sliverpb.RegistryWrite",
    "category": "Pivots",
    "handler": "server/rpc/rpc-registry.go"
  },
  {
    "name": "RegistryCreateKey",
    "request": "sliverpb.RegistryCreateKeyReq",
    "response": "sliverpb.RegistryCreateKey",
    "category": "Pivots",
    "handler": "server/rpc/rpc-registry.go"
  },
  {
    "name": "RegistryDeleteKey",
    "request": "sliverpb.RegistryDeleteKeyReq",
    "response": "sliverpb.RegistryDeleteKey",
    "category": "Pivots",
    "handler": "server/rpc/rpc-registry.go"
  },
  {
    "name": "RegistryListSubKeys",
    "request": "sliverpb.RegistrySubKeyListReq",
    "response": "sliverpb.RegistrySubKeyList",
    "category": "Pivots",
    "handler": "server/rpc/rpc-registry.go"
  },
  {
    "name": "RegistryListValues",
    "request": "sliverpb.RegistryListValuesReq",
    "response": "sliverpb.RegistryValuesList",
    "category": "Pivots",
    "handler": "server/rpc/rpc-registry.go"
  },
  {
    "name": "RegistryReadHive",
    "request": "sliverpb.RegistryReadHiveReq",
    "response": "sliverpb.RegistryReadHive",
    "category": "Pivots",
    "handler": "server/rpc/rpc-registry.go"
  },
  {
    "name": "RunSSHCommand",
    "request": "sliverpb.SSHCommandReq",
    "response": "sliverpb.SSHCommand",
    "category": "Pivots",
    "handler": "server/rpc/rpc-shell.go"
  },
  {
    "name": "HijackDLL",
    "request": "clientpb.DllHijackReq",
    "response": "clientpb.DllHijack",
    "category": "Pivots",
    "handler": "server/rpc/rpc-hijack.go"
  },
  {
    "name": "GetPrivs",
    "request": "sliverpb.GetPrivsReq",
    "response": "sliverpb.GetPrivs",
    "category": "Pivots",
    "handler": "server/rpc/rpc-priv.go"
  },
  {
    "name": "StartRportFwdListener",
    "request": "sliverpb.RportFwdStartListenerReq",
    "response": "sliverpb.RportFwdListener",
    "category": "Pivots",
    "handler": "server/rpc/rpc-rportfwd.go"
  },
  {
    "name": "GetRportFwdListeners",
    "request": "sliverpb.RportFwdListenersReq",
    "response": "sliverpb.RportFwdListeners",
    "category": "Pivots",
    "handler": "server/rpc/rpc-rportfwd.go"
  },
  {
    "name": "StopRportFwdListener",
    "request": "sliverpb.RportFwdStopListenerReq",
    "response": "sliverpb.RportFwdListener",
    "category": "Pivots",
    "handler": "server/rpc/rpc-rportfwd.go"
  },
  {
    "name": "OpenSession",
    "request": "sliverpb.OpenSession",
    "response": "sliverpb.OpenSession",
    "category": "Beacon",
    "handler": "server/rpc/rpc-sessions.go"
  },
  {
    "name": "CloseSession",
    "request": "sliverpb.CloseSession",
    "response": "commonpb.Empty",
    "category": "Beacon",
    "handler": "server/rpc/rpc-sessions.go"
  },
  {
    "name": "RegisterExtension",
    "request": "sliverpb.RegisterExtensionReq",
    "response": "sliverpb.RegisterExtension",
    "category": "Extensions",
    "handler": "server/rpc/rpc-extensions.go"
  },
  {
    "name": "CallExtension",
    "request": "sliverpb.CallExtensionReq",
    "response": "sliverpb.CallExtension",
    "category": "Extensions",
    "handler": "server/rpc/rpc-extensions.go"
  },
  {
    "name": "ListExtensions",
    "request": "sliverpb.ListExtensionsReq",
    "response": "sliverpb.ListExtensions",
    "category": "Extensions",
    "handler": "server/rpc/rpc-extensions.go"
  },
  {
    "name": "RegisterWasmExtension",
    "request": "sliverpb.RegisterWasmExtensionReq",
    "response": "sliverpb.RegisterWasmExtension",
    "category": "Wasm Extensions",
    "handler": "server/rpc/rpc-wasm.go"
  },
  {
    "name": "ListWasmExtensions",
    "request": "sliverpb.ListWasmExtensionsReq",
    "response": "sliverpb.ListWasmExtensions",
    "category": "Wasm Extensions",
    "handler": "server/rpc/rpc-wasm.go"
  },
  {
    "name": "ExecWasmExtension",
    "request": "sliverpb.ExecWasmExtensionReq",
    "response": "sliverpb.ExecWasmExtension",
    "category": "Wasm Extensions",
    "handler": "server/rpc/rpc-wasm.go"
  },
  {
    "name": "WGStartPortForward",
    "request": "sliverpb.WGPortForwardStartReq",
    "response": "sliverpb.WGPortForward",
    "category": "Wireguard Specific",
    "handler": "server/rpc/rpc-wg.go"
  },
  {
    "name": "WGStopPortForward",
    "request": "sliverpb.WGPortForwardStopReq",
    "response": "sliverpb.WGPortForward",
    "category": "Wireguard Specific",
    "handler": "server/rpc/rpc-wg.go"
  },
  {
    "name": "WGStartSocks",
    "request": "sliverpb.WGSocksStartReq",
    "response": "sliverpb.WGSocks",
    "category": "Wireguard Specific",
    "handler": "server/rpc/rpc-wg.go"
  },
  {
    "name": "WGStopSocks",
    "request": "sliverpb.WGSocksStopReq",
    "response": "sliverpb.WGSocks",
    "category": "Wireguard Specific",
    "handler": "server/rpc/rpc-wg.go"
  },
  {
    "name": "WGListForwarders",
    "request": "sliverpb.WGTCPForwardersReq",
    "response": "sliverpb.WGTCPForwarders",
    "category": "Wireguard Specific",
    "handler": "server/rpc/rpc-wg.go"
  },
  {
    "name": "WGListSocksServers",
    "request": "sliverpb.WGSocksServersReq",
    "response": "sliverpb.WGSocksServers",
    "category": "Wireguard Specific",
    "handler": "server/rpc/rpc-wg.go"
  },
  {
    "name": "Shell",
    "request": "sliverpb.ShellReq",
    "response": "sliverpb.Shell",
    "category": "Realtime Commands",
    "handler": "server/rpc/rpc-shell.go"
  },
  {
    "name": "ShellResize",
    "request": "sliverpb.ShellResizeReq",
    "response": "commonpb.Empty",
    "category": "Realtime Commands",
    "handler": "server/rpc/rpc-shell.go"
  },
  {
    "name": "Portfwd",
    "request": "sliverpb.PortfwdReq",
    "response": "sliverpb.Portfwd",
    "category": "Realtime Commands",
    "handler": "server/rpc/rpc-portfwd.go"
  },
  {
    "name": "CreateSocks",
    "request": "sliverpb.Socks",
    "response": "sliverpb.Socks",
    "category": "Socks5",
    "handler": "server/rpc/rpc-socks.go"
  },
  {
    "name": "CloseSocks",
    "request": "sliverpb.Socks",
    "response": "commonpb.Empty",
    "category": "Socks5",
    "handler": "server/rpc/rpc-socks.go"
  },
  {
    "name": "SocksProxy",
    "request": "stream sliverpb.SocksData",
    "response": "stream sliverpb.SocksData",
    "category": "Socks5",
    "handler": "server/rpc/rpc-socks.go"
  },
  {
    "name": "CreateTunnel",
    "request": "sliverpb.Tunnel",
    "response": "sliverpb.Tunnel",
    "category": "Tunnels",
    "handler": "server/rpc/rpc-tunnel.go"
  },
  {
    "name": "CloseTunnel",
    "request": "sliverpb.Tunnel",
    "response": "commonpb.Empty",
    "category": "Tunnels",
    "handler": "server/rpc/rpc-tunnel.go"
  },
  {
    "name": "TunnelData",
    "request": "stream sliverpb.TunnelData",
    "response": "stream sliverpb.TunnelData",
    "category": "Tunnels",
    "handler": "server/rpc/rpc-tunnel.go"
  },
  {
    "name": "Events",
    "request": "commonpb.Empty",
    "response": "stream clientpb.Event",
    "category": "Events",
    "handler": "server/rpc/rpc-events.go"
  }
] as const;
