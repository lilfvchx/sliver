# Fase 1 - Inventario RPC y mapeo funcional

Total de RPC identificados: **186**.

## Cobertura por dominio
- **Version**: 1 métodos
- **Client Logs**: 1 métodos
- **Operator Commands**: 1 métodos
- **Generic**: 3 métodos
- **Sessions**: 1 métodos
- **Threat monitoring**: 5 métodos
- **Listeners**: 5 métodos
- **Beacons**: 7 métodos
- **Jobs**: 3 métodos
- **Stager Listener**: 1 métodos
- **Loot**: 5 métodos
- **Creds**: 8 métodos
- **Hosts**: 4 métodos
- **Implants**: 7 métodos
- **HTTP C2 Profiles**: 3 métodos
- **Builders**: 3 métodos
- **Certificates**: 2 métodos
- **Crackstation**: 13 métodos
- **Payloads**: 16 métodos
- **Websites**: 6 métodos
- **Session Interactions**: 42 métodos
- **Pivots**: 25 métodos
- **Beacon**: 2 métodos
- **Extensions**: 3 métodos
- **Wasm Extensions**: 3 métodos
- **Wireguard Specific**: 6 métodos
- **Realtime Commands**: 3 métodos
- **Socks5**: 3 métodos
- **Tunnels**: 3 métodos
- **Events**: 1 métodos

## Inventario completo (RPC -> valor de producto)
### Version
Característica de usuario: **Panel de control y compatibilidad de plataforma**.

- `GetVersion` → req `commonpb.Empty` / res `clientpb.Version` (handler `server/rpc/rpc.go`)

### Client Logs
Característica de usuario: **Auditoría y trazabilidad del operador**.

- `ClientLog` → req `stream clientpb.ClientLogData` / res `commonpb.Empty` (handler `server/rpc/rpc-client-logs.go`)

### Operator Commands
Característica de usuario: **Gestión de operadores y permisos**.

- `GetOperators` → req `commonpb.Empty` / res `clientpb.Operators` (handler `server/rpc/rpc-operators.go`)

### Generic
Característica de usuario: **Control de identidad/reconfiguración de nodo**.

- `Kill` → req `sliverpb.KillReq` / res `commonpb.Empty` (handler `server/rpc/rpc-kill.go`)
- `Reconfigure` → req `sliverpb.ReconfigureReq` / res `sliverpb.Reconfigure` (handler `server/rpc/rpc-reconfig.go`)
- `Rename` → req `clientpb.RenameReq` / res `commonpb.Empty` (handler `server/rpc/rpc-reconfig.go`)

### Sessions
Característica de usuario: **Inventario de conexión directa**.

- `GetSessions` → req `commonpb.Empty` / res `clientpb.Sessions` (handler `server/rpc/rpc-sessions.go`)

### Threat monitoring
Característica de usuario: **Monitoreo de amenazas y proveedores**.

- `MonitorStart` → req `commonpb.Empty` / res `commonpb.Response` (handler `server/rpc/rpc-monitor.go`)
- `MonitorStop` → req `commonpb.Empty` / res `commonpb.Empty` (handler `server/rpc/rpc-monitor.go`)
- `MonitorListConfig` → req `commonpb.Empty` / res `clientpb.MonitoringProviders` (handler `server/rpc/rpc-monitor.go`)
- `MonitorAddConfig` → req `clientpb.MonitoringProvider` / res `commonpb.Response` (handler `server/rpc/rpc-monitor.go`)
- `MonitorDelConfig` → req `clientpb.MonitoringProvider` / res `commonpb.Response` (handler `server/rpc/rpc-monitor.go`)

### Listeners
Característica de usuario: **Centro de red C2**.

- `StartMTLSListener` → req `clientpb.MTLSListenerReq` / res `clientpb.ListenerJob` (handler `server/rpc/rpc-jobs.go`)
- `StartWGListener` → req `clientpb.WGListenerReq` / res `clientpb.ListenerJob` (handler `server/rpc/rpc-jobs.go`)
- `StartDNSListener` → req `clientpb.DNSListenerReq` / res `clientpb.ListenerJob` (handler `server/rpc/rpc-jobs.go`)
- `StartHTTPSListener` → req `clientpb.HTTPListenerReq` / res `clientpb.ListenerJob` (handler `server/rpc/rpc-jobs.go`)
- `StartHTTPListener` → req `clientpb.HTTPListenerReq` / res `clientpb.ListenerJob` (handler `server/rpc/rpc-jobs.go`)

### Beacons
Característica de usuario: **Inventario de verificación programada**.

- `GetBeacons` → req `commonpb.Empty` / res `clientpb.Beacons` (handler `server/rpc/rpc-beacons.go`)
- `GetBeacon` → req `clientpb.Beacon` / res `clientpb.Beacon` (handler `server/rpc/rpc-beacons.go`)
- `RmBeacon` → req `clientpb.Beacon` / res `commonpb.Empty` (handler `server/rpc/rpc-beacons.go`)
- `GetBeaconTasks` → req `clientpb.Beacon` / res `clientpb.BeaconTasks` (handler `server/rpc/rpc-beacons.go`)
- `GetBeaconTaskContent` → req `clientpb.BeaconTask` / res `clientpb.BeaconTask` (handler `server/rpc/rpc-beacons.go`)
- `CancelBeaconTask` → req `clientpb.BeaconTask` / res `clientpb.BeaconTask` (handler `server/rpc/rpc-beacons.go`)
- `UpdateBeaconIntegrityInformation` → req `clientpb.BeaconIntegrity` / res `commonpb.Empty` (handler `server/rpc/rpc-beacons.go`)

### Jobs
Característica de usuario: **Orquestación de trabajos de backend**.

- `GetJobs` → req `commonpb.Empty` / res `clientpb.Jobs` (handler `server/rpc/rpc-jobs.go`)
- `KillJob` → req `clientpb.KillJobReq` / res `clientpb.KillJob` (handler `server/rpc/rpc-jobs.go`)
- `RestartJobs` → req `clientpb.RestartJobReq` / res `commonpb.Empty` (handler `server/rpc/rpc-jobs.go`)

### Stager Listener
Característica de usuario: **Infraestructura de staging**.

- `StartTCPStagerListener` → req `clientpb.StagerListenerReq` / res `clientpb.StagerListener` (handler `server/rpc/rpc-stager.go`)

### Loot
Característica de usuario: **Bóveda de datos recuperados**.

- `LootAdd` → req `clientpb.Loot` / res `clientpb.Loot` (handler `server/rpc/rpc-loot.go`)
- `LootRm` → req `clientpb.Loot` / res `commonpb.Empty` (handler `server/rpc/rpc-loot.go`)
- `LootUpdate` → req `clientpb.Loot` / res `clientpb.Loot` (handler `server/rpc/rpc-loot.go`)
- `LootContent` → req `clientpb.Loot` / res `clientpb.Loot` (handler `server/rpc/rpc-loot.go`)
- `LootAll` → req `commonpb.Empty` / res `clientpb.AllLoot` (handler `server/rpc/rpc-loot.go`)

### Creds
Característica de usuario: **Bóveda de credenciales**.

- `Creds` → req `commonpb.Empty` / res `clientpb.Credentials` (handler `server/rpc/rpc-creds.go`)
- `CredsAdd` → req `clientpb.Credentials` / res `commonpb.Empty` (handler `server/rpc/rpc-creds.go`)
- `CredsRm` → req `clientpb.Credentials` / res `commonpb.Empty` (handler `server/rpc/rpc-creds.go`)
- `CredsUpdate` → req `clientpb.Credentials` / res `commonpb.Empty` (handler `server/rpc/rpc-creds.go`)
- `GetCredByID` → req `clientpb.Credential` / res `clientpb.Credential` (handler `server/rpc/rpc-creds.go`)
- `GetCredsByHashType` → req `clientpb.Credential` / res `clientpb.Credentials` (handler `server/rpc/rpc-creds.go`)
- `GetPlaintextCredsByHashType` → req `clientpb.Credential` / res `clientpb.Credentials` (handler `server/rpc/rpc-creds.go`)
- `CredsSniffHashType` → req `clientpb.Credential` / res `clientpb.Credential` (handler `server/rpc/rpc-creds.go`)

### Hosts
Característica de usuario: **Gestión de activos e IOC**.

- `Hosts` → req `commonpb.Empty` / res `clientpb.AllHosts` (handler `server/rpc/rpc-hosts.go`)
- `Host` → req `clientpb.Host` / res `clientpb.Host` (handler `server/rpc/rpc-hosts.go`)
- `HostRm` → req `clientpb.Host` / res `commonpb.Empty` (handler `server/rpc/rpc-hosts.go`)
- `HostIOCRm` → req `clientpb.IOC` / res `commonpb.Empty` (handler `server/rpc/rpc-hosts.go`)

### Implants
Característica de usuario: **Provisionamiento y generación de agentes**.

- `Generate` → req `clientpb.GenerateReq` / res `clientpb.Generate` (handler `server/rpc/rpc-generate.go`)
- `GenerateSpoofMetadata` → req `clientpb.GenerateSpoofMetadataReq` / res `commonpb.Empty` (handler `server/rpc/rpc-generate.go`)
- `GenerateExternal` → req `clientpb.ExternalGenerateReq` / res `clientpb.ExternalImplantConfig` (handler `server/rpc/rpc-generate.go`)
- `GenerateExternalSaveBuild` → req `clientpb.ExternalImplantBinary` / res `commonpb.Empty` (handler `server/rpc/rpc-generate.go`)
- `GenerateExternalGetBuildConfig` → req `clientpb.ImplantBuild` / res `clientpb.ExternalImplantConfig` (handler `server/rpc/rpc-generate.go`)
- `GenerateStage` → req `clientpb.GenerateStageReq` / res `clientpb.Generate` (handler `server/rpc/rpc-generate.go`)
- `StageImplantBuild` → req `clientpb.ImplantStageReq` / res `commonpb.Empty` (handler `server/rpc/rpc-generate.go`)

### HTTP C2 Profiles
Característica de usuario: **Perfiles C2 HTTP**.

- `GetHTTPC2Profiles` → req `commonpb.Empty` / res `clientpb.HTTPC2Configs` (handler `server/rpc/rpc-c2profile.go`)
- `GetHTTPC2ProfileByName` → req `clientpb.C2ProfileReq` / res `clientpb.HTTPC2Config` (handler `server/rpc/rpc-c2profile.go`)
- `SaveHTTPC2Profile` → req `clientpb.HTTPC2ConfigReq` / res `commonpb.Empty` (handler `server/rpc/rpc-c2profile.go`)

### Builders
Característica de usuario: **Builders externos y pipeline**.

- `BuilderRegister` → req `clientpb.Builder` / res `stream clientpb.Event` (handler `server/rpc/rpc-generate.go`)
- `BuilderTrigger` → req `clientpb.Event` / res `commonpb.Empty` (handler `server/rpc/rpc-generate.go`)
- `Builders` → req `commonpb.Empty` / res `clientpb.Builders` (handler `server/rpc/rpc-generate.go`)

### Certificates
Característica de usuario: **Gestión criptográfica PKI**.

- `GetCertificateInfo` → req `clientpb.CertificatesReq` / res `clientpb.CertificateInfo` (handler `server/rpc/rpc-certificates.go`)
- `GetCertificateAuthorityInfo` → req `commonpb.Empty` / res `clientpb.CertificateAuthorityInfo` (handler `server/rpc/rpc-certificates.go`)

### Crackstation
Característica de usuario: **Cracking distribuido**.

- `Crack` → req `clientpb.CrackCommand` / res `clientpb.CrackResponse` (handler `server/rpc/rpc-crack.go`)
- `CrackstationRegister` → req `clientpb.Crackstation` / res `stream clientpb.Event` (handler `server/rpc/rpc-crackstations.go`)
- `CrackstationTrigger` → req `clientpb.Event` / res `commonpb.Empty` (handler `server/rpc/rpc-crackstations.go`)
- `CrackstationBenchmark` → req `clientpb.CrackBenchmark` / res `commonpb.Empty` (handler `server/rpc/rpc-crackstations.go`)
- `Crackstations` → req `commonpb.Empty` / res `clientpb.Crackstations` (handler `server/rpc/rpc-crackstations.go`)
- `CrackTaskByID` → req `clientpb.CrackTask` / res `clientpb.CrackTask` (handler `server/rpc/rpc-crackstations.go`)
- `CrackTaskUpdate` → req `clientpb.CrackTask` / res `commonpb.Empty` (handler `server/rpc/rpc-crackstations.go`)
- `CrackFilesList` → req `clientpb.CrackFile` / res `clientpb.CrackFiles` (handler `server/rpc/rpc-crackstations.go`)
- `CrackFileCreate` → req `clientpb.CrackFile` / res `clientpb.CrackFile` (handler `server/rpc/rpc-crackstations.go`)
- `CrackFileChunkUpload` → req `clientpb.CrackFileChunk` / res `commonpb.Empty` (handler `server/rpc/rpc-crackstations.go`)
- `CrackFileChunkDownload` → req `clientpb.CrackFileChunk` / res `clientpb.CrackFileChunk` (handler `server/rpc/rpc-crackstations.go`)
- `CrackFileComplete` → req `clientpb.CrackFile` / res `commonpb.Empty` (handler `server/rpc/rpc-crackstations.go`)
- `CrackFileDelete` → req `clientpb.CrackFile` / res `commonpb.Empty` (handler `server/rpc/rpc-crackstations.go`)

### Payloads
Característica de usuario: **Capacidad operativa especializada**.

- `Regenerate` → req `clientpb.RegenerateReq` / res `clientpb.Generate` (handler `server/rpc/rpc-generate.go`)
- `ImplantBuilds` → req `commonpb.Empty` / res `clientpb.ImplantBuilds` (handler `server/rpc/rpc-generate.go`)
- `DeleteImplantBuild` → req `clientpb.DeleteReq` / res `commonpb.Empty` (handler `server/rpc/rpc-generate.go`)
- `Canaries` → req `commonpb.Empty` / res `clientpb.Canaries` (handler `server/rpc/rpc-generate.go`)
- `GenerateWGClientConfig` → req `commonpb.Empty` / res `clientpb.WGClientConfig` (handler `server/rpc/rpc-wg.go`)
- `GenerateUniqueIP` → req `commonpb.Empty` / res `clientpb.UniqueWGIP` (handler `server/rpc/rpc-generate.go`)
- `ImplantProfiles` → req `commonpb.Empty` / res `clientpb.ImplantProfiles` (handler `server/rpc/rpc-generate.go`)
- `DeleteImplantProfile` → req `clientpb.DeleteReq` / res `commonpb.Empty` (handler `server/rpc/rpc-generate.go`)
- `SaveImplantProfile` → req `clientpb.ImplantProfile` / res `clientpb.ImplantProfile` (handler `server/rpc/rpc-generate.go`)
- `ShellcodeRDI` → req `clientpb.ShellcodeRDIReq` / res `clientpb.ShellcodeRDI` (handler `server/rpc/rpc-generate.go`)
- `GetCompiler` → req `commonpb.Empty` / res `clientpb.Compiler` (handler `server/rpc/rpc-generate.go`)
- `ShellcodeEncoder` → req `clientpb.ShellcodeEncodeReq` / res `clientpb.ShellcodeEncode` (handler `server/rpc/rpc-shellcode.go`)
- `ShellcodeEncoderMap` → req `commonpb.Empty` / res `clientpb.ShellcodeEncoderMap` (handler `server/rpc/rpc-shellcode.go`)
- `TrafficEncoderMap` → req `commonpb.Empty` / res `clientpb.TrafficEncoderMap` (handler `server/rpc/rpc-generate.go`)
- `TrafficEncoderAdd` → req `clientpb.TrafficEncoder` / res `clientpb.TrafficEncoderTests` (handler `server/rpc/rpc-generate.go`)
- `TrafficEncoderRm` → req `clientpb.TrafficEncoder` / res `commonpb.Empty` (handler `server/rpc/rpc-generate.go`)

### Websites
Característica de usuario: **Hosting y gestión de contenido web**.

- `Websites` → req `commonpb.Empty` / res `clientpb.Websites` (handler `server/rpc/rpc-website.go`)
- `Website` → req `clientpb.Website` / res `clientpb.Website` (handler `server/rpc/rpc-website.go`)
- `WebsiteRemove` → req `clientpb.Website` / res `commonpb.Empty` (handler `server/rpc/rpc-website.go`)
- `WebsiteAddContent` → req `clientpb.WebsiteAddContent` / res `clientpb.Website` (handler `server/rpc/rpc-website.go`)
- `WebsiteUpdateContent` → req `clientpb.WebsiteAddContent` / res `clientpb.Website` (handler `server/rpc/rpc-website.go`)
- `WebsiteRemoveContent` → req `clientpb.WebsiteRemoveContent` / res `clientpb.Website` (handler `server/rpc/rpc-website.go`)

### Session Interactions
Característica de usuario: **Operaciones live sobre endpoint**.

- `Ping` → req `sliverpb.Ping` / res `sliverpb.Ping` (handler `server/rpc/rpc-ping.go`)
- `Ps` → req `sliverpb.PsReq` / res `sliverpb.Ps` (handler `server/rpc/rpc-process.go`)
- `Terminate` → req `sliverpb.TerminateReq` / res `sliverpb.Terminate` (handler `server/rpc/rpc-process.go`)
- `Ifconfig` → req `sliverpb.IfconfigReq` / res `sliverpb.Ifconfig` (handler `server/rpc/rpc-net.go`)
- `Netstat` → req `sliverpb.NetstatReq` / res `sliverpb.Netstat` (handler `server/rpc/rpc-net.go`)
- `Ls` → req `sliverpb.LsReq` / res `sliverpb.Ls` (handler `server/rpc/rpc-filesystem.go`)
- `Cd` → req `sliverpb.CdReq` / res `sliverpb.Pwd` (handler `server/rpc/rpc-filesystem.go`)
- `Pwd` → req `sliverpb.PwdReq` / res `sliverpb.Pwd` (handler `server/rpc/rpc-filesystem.go`)
- `Mv` → req `sliverpb.MvReq` / res `sliverpb.Mv` (handler `server/rpc/rpc-filesystem.go`)
- `Cp` → req `sliverpb.CpReq` / res `sliverpb.Cp` (handler `server/rpc/rpc-filesystem.go`)
- `Rm` → req `sliverpb.RmReq` / res `sliverpb.Rm` (handler `server/rpc/rpc-filesystem.go`)
- `Mkdir` → req `sliverpb.MkdirReq` / res `sliverpb.Mkdir` (handler `server/rpc/rpc-filesystem.go`)
- `Download` → req `sliverpb.DownloadReq` / res `sliverpb.Download` (handler `server/rpc/rpc-filesystem.go`)
- `Upload` → req `sliverpb.UploadReq` / res `sliverpb.Upload` (handler `server/rpc/rpc-filesystem.go`)
- `Grep` → req `sliverpb.GrepReq` / res `sliverpb.Grep` (handler `server/rpc/rpc-filesystem.go`)
- `Chmod` → req `sliverpb.ChmodReq` / res `sliverpb.Chmod` (handler `server/rpc/rpc-filesystem.go`)
- `Chown` → req `sliverpb.ChownReq` / res `sliverpb.Chown` (handler `server/rpc/rpc-filesystem.go`)
- `Chtimes` → req `sliverpb.ChtimesReq` / res `sliverpb.Chtimes` (handler `server/rpc/rpc-filesystem.go`)
- `MemfilesList` → req `sliverpb.MemfilesListReq` / res `sliverpb.Ls` (handler `server/rpc/rpc-filesystem.go`)
- `MemfilesAdd` → req `sliverpb.MemfilesAddReq` / res `sliverpb.MemfilesAdd` (handler `server/rpc/rpc-filesystem.go`)
- `MemfilesRm` → req `sliverpb.MemfilesRmReq` / res `sliverpb.MemfilesRm` (handler `server/rpc/rpc-filesystem.go`)
- `Mount` → req `sliverpb.MountReq` / res `sliverpb.Mount` (handler `server/rpc/rpc-filesystem.go`)
- `ProcessDump` → req `sliverpb.ProcessDumpReq` / res `sliverpb.ProcessDump` (handler `server/rpc/rpc-process.go`)
- `RunAs` → req `sliverpb.RunAsReq` / res `sliverpb.RunAs` (handler `server/rpc/rpc-priv.go`)
- `Impersonate` → req `sliverpb.ImpersonateReq` / res `sliverpb.Impersonate` (handler `server/rpc/rpc-priv.go`)
- `RevToSelf` → req `sliverpb.RevToSelfReq` / res `sliverpb.RevToSelf` (handler `server/rpc/rpc-priv.go`)
- `GetSystem` → req `clientpb.GetSystemReq` / res `sliverpb.GetSystem` (handler `server/rpc/rpc-priv.go`)
- `Task` → req `sliverpb.TaskReq` / res `sliverpb.Task` (handler `server/rpc/rpc-tasks.go`)
- `Msf` → req `clientpb.MSFReq` / res `sliverpb.Task` (handler `server/rpc/rpc-msf.go`)
- `MsfRemote` → req `clientpb.MSFRemoteReq` / res `sliverpb.Task` (handler `server/rpc/rpc-msf.go`)
- `ExecuteAssembly` → req `sliverpb.ExecuteAssemblyReq` / res `sliverpb.ExecuteAssembly` (handler `server/rpc/rpc-tasks.go`)
- `Migrate` → req `clientpb.MigrateReq` / res `sliverpb.Migrate` (handler `server/rpc/rpc-tasks.go`)
- `Execute` → req `sliverpb.ExecuteReq` / res `sliverpb.Execute` (handler `server/rpc/rpc-execute.go`)
- `ExecuteWindows` → req `sliverpb.ExecuteWindowsReq` / res `sliverpb.Execute` (handler `server/rpc/rpc-execute.go`)
- `ExecuteChildren` → req `sliverpb.ExecuteChildrenReq` / res `sliverpb.ExecuteChildren` (handler `server/rpc/rpc-execute-children.go`)
- `Sideload` → req `sliverpb.SideloadReq` / res `sliverpb.Sideload` (handler `server/rpc/rpc-tasks.go`)
- `SpawnDll` → req `sliverpb.InvokeSpawnDllReq` / res `sliverpb.SpawnDll` (handler `server/rpc/rpc-tasks.go`)
- `Screenshot` → req `sliverpb.ScreenshotReq` / res `sliverpb.Screenshot` (handler `server/rpc/rpc-screenshot.go`)
- `CurrentTokenOwner` → req `sliverpb.CurrentTokenOwnerReq` / res `sliverpb.CurrentTokenOwner` (handler `server/rpc/rpc-priv.go`)
- `Services` → req `sliverpb.ServicesReq` / res `sliverpb.Services` (handler `server/rpc/rpc-service.go`)
- `ServiceDetail` → req `sliverpb.ServiceDetailReq` / res `sliverpb.ServiceDetail` (handler `server/rpc/rpc-service.go`)
- `StartServiceByName` → req `sliverpb.StartServiceByNameReq` / res `sliverpb.ServiceInfo` (handler `server/rpc/rpc-service.go`)

### Pivots
Característica de usuario: **Pivoting y rutas laterales**.

- `PivotStartListener` → req `sliverpb.PivotStartListenerReq` / res `sliverpb.PivotListener` (handler `server/rpc/rpc-pivots.go`)
- `PivotStopListener` → req `sliverpb.PivotStopListenerReq` / res `commonpb.Empty` (handler `server/rpc/rpc-pivots.go`)
- `PivotSessionListeners` → req `sliverpb.PivotListenersReq` / res `sliverpb.PivotListeners` (handler `server/rpc/rpc-pivots.go`)
- `PivotGraph` → req `commonpb.Empty` / res `clientpb.PivotGraph` (handler `server/rpc/rpc-pivots.go`)
- `StartService` → req `sliverpb.StartServiceReq` / res `sliverpb.ServiceInfo` (handler `server/rpc/rpc-service.go`)
- `StopService` → req `sliverpb.StopServiceReq` / res `sliverpb.ServiceInfo` (handler `server/rpc/rpc-service.go`)
- `RemoveService` → req `sliverpb.RemoveServiceReq` / res `sliverpb.ServiceInfo` (handler `server/rpc/rpc-service.go`)
- `MakeToken` → req `sliverpb.MakeTokenReq` / res `sliverpb.MakeToken` (handler `server/rpc/rpc-priv.go`)
- `GetEnv` → req `sliverpb.EnvReq` / res `sliverpb.EnvInfo` (handler `server/rpc/rpc-env.go`)
- `SetEnv` → req `sliverpb.SetEnvReq` / res `sliverpb.SetEnv` (handler `server/rpc/rpc-env.go`)
- `UnsetEnv` → req `sliverpb.UnsetEnvReq` / res `sliverpb.UnsetEnv` (handler `server/rpc/rpc-env.go`)
- `Backdoor` → req `clientpb.BackdoorReq` / res `clientpb.Backdoor` (handler `server/rpc/rpc-backdoor.go`)
- `RegistryRead` → req `sliverpb.RegistryReadReq` / res `sliverpb.RegistryRead` (handler `server/rpc/rpc-registry.go`)
- `RegistryWrite` → req `sliverpb.RegistryWriteReq` / res `sliverpb.RegistryWrite` (handler `server/rpc/rpc-registry.go`)
- `RegistryCreateKey` → req `sliverpb.RegistryCreateKeyReq` / res `sliverpb.RegistryCreateKey` (handler `server/rpc/rpc-registry.go`)
- `RegistryDeleteKey` → req `sliverpb.RegistryDeleteKeyReq` / res `sliverpb.RegistryDeleteKey` (handler `server/rpc/rpc-registry.go`)
- `RegistryListSubKeys` → req `sliverpb.RegistrySubKeyListReq` / res `sliverpb.RegistrySubKeyList` (handler `server/rpc/rpc-registry.go`)
- `RegistryListValues` → req `sliverpb.RegistryListValuesReq` / res `sliverpb.RegistryValuesList` (handler `server/rpc/rpc-registry.go`)
- `RegistryReadHive` → req `sliverpb.RegistryReadHiveReq` / res `sliverpb.RegistryReadHive` (handler `server/rpc/rpc-registry.go`)
- `RunSSHCommand` → req `sliverpb.SSHCommandReq` / res `sliverpb.SSHCommand` (handler `server/rpc/rpc-shell.go`)
- `HijackDLL` → req `clientpb.DllHijackReq` / res `clientpb.DllHijack` (handler `server/rpc/rpc-hijack.go`)
- `GetPrivs` → req `sliverpb.GetPrivsReq` / res `sliverpb.GetPrivs` (handler `server/rpc/rpc-priv.go`)
- `StartRportFwdListener` → req `sliverpb.RportFwdStartListenerReq` / res `sliverpb.RportFwdListener` (handler `server/rpc/rpc-rportfwd.go`)
- `GetRportFwdListeners` → req `sliverpb.RportFwdListenersReq` / res `sliverpb.RportFwdListeners` (handler `server/rpc/rpc-rportfwd.go`)
- `StopRportFwdListener` → req `sliverpb.RportFwdStopListenerReq` / res `sliverpb.RportFwdListener` (handler `server/rpc/rpc-rportfwd.go`)

### Beacon
Característica de usuario: **Transición beacon <-> sesión**.

- `OpenSession` → req `sliverpb.OpenSession` / res `sliverpb.OpenSession` (handler `server/rpc/rpc-sessions.go`)
- `CloseSession` → req `sliverpb.CloseSession` / res `commonpb.Empty` (handler `server/rpc/rpc-sessions.go`)

### Extensions
Característica de usuario: **Ecosistema de extensiones nativas**.

- `RegisterExtension` → req `sliverpb.RegisterExtensionReq` / res `sliverpb.RegisterExtension` (handler `server/rpc/rpc-extensions.go`)
- `CallExtension` → req `sliverpb.CallExtensionReq` / res `sliverpb.CallExtension` (handler `server/rpc/rpc-extensions.go`)
- `ListExtensions` → req `sliverpb.ListExtensionsReq` / res `sliverpb.ListExtensions` (handler `server/rpc/rpc-extensions.go`)

### Wasm Extensions
Característica de usuario: **Ecosistema de módulos WASM**.

- `RegisterWasmExtension` → req `sliverpb.RegisterWasmExtensionReq` / res `sliverpb.RegisterWasmExtension` (handler `server/rpc/rpc-wasm.go`)
- `ListWasmExtensions` → req `sliverpb.ListWasmExtensionsReq` / res `sliverpb.ListWasmExtensions` (handler `server/rpc/rpc-wasm.go`)
- `ExecWasmExtension` → req `sliverpb.ExecWasmExtensionReq` / res `sliverpb.ExecWasmExtension` (handler `server/rpc/rpc-wasm.go`)

### Wireguard Specific
Característica de usuario: **Capacidad operativa especializada**.

- `WGStartPortForward` → req `sliverpb.WGPortForwardStartReq` / res `sliverpb.WGPortForward` (handler `server/rpc/rpc-wg.go`)
- `WGStopPortForward` → req `sliverpb.WGPortForwardStopReq` / res `sliverpb.WGPortForward` (handler `server/rpc/rpc-wg.go`)
- `WGStartSocks` → req `sliverpb.WGSocksStartReq` / res `sliverpb.WGSocks` (handler `server/rpc/rpc-wg.go`)
- `WGStopSocks` → req `sliverpb.WGSocksStopReq` / res `sliverpb.WGSocks` (handler `server/rpc/rpc-wg.go`)
- `WGListForwarders` → req `sliverpb.WGTCPForwardersReq` / res `sliverpb.WGTCPForwarders` (handler `server/rpc/rpc-wg.go`)
- `WGListSocksServers` → req `sliverpb.WGSocksServersReq` / res `sliverpb.WGSocksServers` (handler `server/rpc/rpc-wg.go`)

### Realtime Commands
Característica de usuario: **Capacidad operativa especializada**.

- `Shell` → req `sliverpb.ShellReq` / res `sliverpb.Shell` (handler `server/rpc/rpc-shell.go`)
- `ShellResize` → req `sliverpb.ShellResizeReq` / res `commonpb.Empty` (handler `server/rpc/rpc-shell.go`)
- `Portfwd` → req `sliverpb.PortfwdReq` / res `sliverpb.Portfwd` (handler `server/rpc/rpc-portfwd.go`)

### Socks5
Característica de usuario: **Capacidad operativa especializada**.

- `CreateSocks` → req `sliverpb.Socks` / res `sliverpb.Socks` (handler `server/rpc/rpc-socks.go`)
- `CloseSocks` → req `sliverpb.Socks` / res `commonpb.Empty` (handler `server/rpc/rpc-socks.go`)
- `SocksProxy` → req `stream sliverpb.SocksData` / res `stream sliverpb.SocksData` (handler `server/rpc/rpc-socks.go`)

### Tunnels
Característica de usuario: **Capacidad operativa especializada**.

- `CreateTunnel` → req `sliverpb.Tunnel` / res `sliverpb.Tunnel` (handler `server/rpc/rpc-tunnel.go`)
- `CloseTunnel` → req `sliverpb.Tunnel` / res `commonpb.Empty` (handler `server/rpc/rpc-tunnel.go`)
- `TunnelData` → req `stream sliverpb.TunnelData` / res `stream sliverpb.TunnelData` (handler `server/rpc/rpc-tunnel.go`)

### Events
Característica de usuario: **Capacidad operativa especializada**.

- `Events` → req `commonpb.Empty` / res `stream clientpb.Event` (handler `server/rpc/rpc-events.go`)

## Fase 1B - Análisis semántico por entidad e intención

### Entidad Nodo/Agente
Incluye interacción viva y administración del endpoint: `GetSessions`, `GetBeacons`, `OpenSession`, `CloseSession`, `Shell`, `Execute`, `Screenshot`, `Ps`, `Services`, `GetPrivs`, `MakeToken`.

### Entidad Sistema de Archivos
Acciones de exploración y transferencia contextual: `Ls`, `Cd`, `Pwd`, `Download`, `Upload`, `Rm`, `Mkdir`, `Mv`, `Cp`, `Chmod`, `Chown`, `Chtimes`, `Grep`.

### Entidad Red
Canales, pivots y redirecciones: `StartHTTPListener`, `StartHTTPSListener`, `StartDNSListener`, `StartMTLSListener`, `StartWGListener`, `CreateSocks`, `Portfwd`, `PivotStartListener`, `CreateTunnel`, `WGStartPortForward`.

### Entidad Infraestructura
Orquestación de backend y provisión: `GetJobs`, `KillJob`, `Generate`, `GenerateStage`, `Regenerate`, `ShellcodeEncoder`, `Builders`, `Crack*`, `Events`.

### Agrupación natural aplicada en UI
- **Administrador de nodos**: inventario + menú contextual por nodo (terminal, archivos, screenshot, procesos, túneles).
- **Panel lateral por intención**: pestañas `Sistema`, `Archivos`, `Red`, `Seguridad` para reducir carga cognitiva.
- **File Manager remoto**: navegación visual con acciones inline (upload/download/delete), evitando barras globales ambiguas.
- **Wizard de deployment**: flujo en pasos para empaquetar RPC técnicos en decisiones operativas guiadas.

## Fase 1C - Endpoints de scripting/extensiones (Starlark Runtime)

Para el flujo de automatización y sandbox de ejecución se detectaron los RPC que habilitan extensibilidad:

- `RegisterExtension` (`server/rpc/rpc-extensions.go`) para registrar extensiones nativas.
- `ListExtensions` (`server/rpc/rpc-extensions.go`) para inventario de capacidades cargadas.
- `CallExtension` (`server/rpc/rpc-extensions.go`) para invocar funciones exportadas por extensiones.
- `RegisterWasmExtension` (`server/rpc/rpc-wasm.go`) para registrar módulos wasm en endpoint.
- `ListWasmExtensions` (`server/rpc/rpc-wasm.go`) para catálogo de módulos wasm disponibles.
- `ExecWasmExtension` (`server/rpc/rpc-wasm.go`) para ejecutar módulos wasm en contexto del nodo.

Estos endpoints se mapearon en la UI premium dentro de la sección **Automatización** como base del motor Starlark/sandbox: biblioteca de scripts, editor integrado y ejecución contextual sobre nodo.

## Fase 1D - Inventario técnico detallado (Listeners, Deployment, Armory/BOF)

### Campos de configuración por servicio de red (Listeners)
Derivado de `clientpb.client.proto`:
- **MTLSListenerReq**: `Host`, `Port`.
- **WGListenerReq**: `Host`, `Port`, `TunIP`, `NPort`, `KeyPort`.
- **DNSListenerReq**: `Domains[]`, `Canaries`, `Host`, `Port`, `EnforceOTP`.
- **HTTPListenerReq/HTTPS**: `Domain`, `Host`, `Port`, `Secure`, `Website`, `Cert`, `Key`, `ACME`, `EnforceOTP`, `LongPollTimeout`, `LongPollJitter`, `RandomizeJARM`.
- **StagerListenerReq**: `Protocol`, `Host`, `Port`, `Data`, `ProfileName`.

### Parámetros exactos de generación de instaladores
Derivado de `ImplantConfig`, `GenerateReq` y `GenerateStageReq`:
- Objetivo: `GOOS`, `GOARCH`, `Format` (`EXECUTABLE`, `SERVICE`, `SHARED_LIB`, `SHELLCODE`, `THIRD_PARTY`).
- Operación: `IsBeacon`, `BeaconInterval`, `BeaconJitter`, `ReconnectInterval`, `MaxConnectionErrors`, `PollTimeout`.
- Evasión/seguridad: `Evasion`, `ObfuscateSymbols`, `SGNEnabled`, `CanaryDomains`, límites de sandbox (`LimitDomainJoined`, `LimitDatetime`, `LimitHostname`, `LimitUsername`, `LimitFileExists`, `LimitLocale`).
- Transporte embebido: `IncludeMTLS`, `IncludeHTTP`, `IncludeWG`, `IncludeDNS`, `IncludeNamePipe`, `IncludeTCP`.
- C2: lista `C2[]` (`URL`, `Priority`, `Options`) y `ConnectionStrategy`.
- Stage: `AESEncryptKey`, `AESEncryptIv`, `RC4EncryptKey`, `PrependSize`, `Compress`, `CompressF`.

### API localizada para Armory y BOF
- **Armory CLI/API cliente**: `client/command/armory/*.go` (gestión de repositorios, búsqueda, instalación, refresh, enable/disable).
- **BOF helpers**: `client/core/bof.go` (buffer de argumentos para ejecución de módulos en memoria).
- **RPC de extensiones runtime**: `RegisterExtension`, `ListExtensions`, `CallExtension`, `RegisterWasmExtension`, `ListWasmExtensions`, `ExecWasmExtension`.

Esta base se tradujo en módulos de UI: `Network Gateways`, `Deployment Wizard`, `Armory Marketplace`, `BOF Runner`, y flujo de ejecución contextual por nodo.

## Fase 2B - Interacción de comandos Sliver (individual y grupal)

Se añadió un centro de interacción operacional para ejecutar comandos de Sliver de forma:
- **Individual**: un comando contra un nodo activo.
- **Grupal**: el mismo comando sobre múltiples nodos seleccionados (batch interactivo).

### Comandos operativos modelados en la UI
- Descubrimiento/Sistema: `info`, `whoami`, `pwd`, `ls`, `ps`, `ifconfig`, `netstat`.
- Operaciones: `execute`, `screenshot`, `download`.

### RPC backend relacionados con la ejecución interactiva
- Shell y terminal: `Shell`, `ShellResize`.
- Comandos/ejecución: `Execute`, `ExecuteWindows`, `Task`.
- Sistema/diagnóstico: `Ps`, `Ifconfig`, `Netstat`, `Pwd`, `Ls`.
- Operaciones de captura y archivos: `Screenshot`, `Download`, `Upload`.

Esta capa permite al operador usar comandos Sliver por activo o por lote, manteniendo trazabilidad de salida por nodo en la consola del frontend.

## Fase 3 - Ajustes UX solicitados (seleccionar y actuar)

- Se reorganizó la pantalla por **contexto operativo** con tabs principales: `Operaciones` y `Infraestructura` para reducir scroll y carga cognitiva.
- Se añadieron **tarjetas de estado clickeables** con indicador visual (punto verde pulsante) y mini-donut de activos/inactivos.
- La interacción de comandos pasó a flujo **seleccionar objetivos + ejecutar** con chips de nodos objetivo y terminal embebida con colores por estado.
- Se añadió panel lateral derecho colapsable de **Actividad Reciente** (últimos eventos).
- La sidebar ahora soporta **contraer/expandir** para maximizar área de trabajo.
