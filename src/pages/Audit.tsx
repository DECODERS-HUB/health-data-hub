import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
<<<<<<< HEAD
import { Search, Download, Filter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const auditLogs = [
  { id: 1, timestamp: "2024-11-23 14:25:30", user: "admin@moh.kwara", action: "FACILITY_APPROVED", resource: "Baptist Medical Centre", ip: "102.89.23.45", status: "success" },
  { id: 2, timestamp: "2024-11-23 14:23:15", user: "api_key_abc123", action: "PATIENT_CREATED", resource: "Patient/KW2024001234", ip: "41.203.12.88", status: "success" },
  { id: 3, timestamp: "2024-11-23 14:20:42", user: "facility_admin@hospital", action: "API_KEY_GENERATED", resource: "hkit_prod_xyz789", ip: "197.210.55.10", status: "success" },
  { id: 4, timestamp: "2024-11-23 14:18:08", user: "api_key_test456", action: "OBSERVATION_UPDATE", resource: "Observation/obs-12345", ip: "105.112.45.22", status: "failed" },
  { id: 5, timestamp: "2024-11-23 14:15:33", user: "admin@moh.kwara", action: "CONSENT_REVOKED", resource: "Consent/consent-789", ip: "102.89.23.45", status: "success" },
  { id: 6, timestamp: "2024-11-23 14:12:51", user: "api_key_prod999", action: "ENCOUNTER_CREATED", resource: "Encounter/enc-54321", ip: "197.255.88.99", status: "success" },
];

const Audit = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Audit Logs</h1>
        <p className="text-muted-foreground">Complete system activity and accountability trail</p>
=======
import { Search, Download, Filter, Loader2, AlertTriangle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuditLogs, useAuditMetrics } from "@/hooks/use-hkit-data";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

const Audit = () => {
  const { data: auditLogs, isLoading: isLoadingLogs, isError: isErrorLogs } = useAuditLogs();
  const { data: metrics, isLoading: isLoadingMetrics, isError: isErrorMetrics } = useAuditMetrics();
  const { role, user } = useAuth();

  const getTitle = () => {
    if (role === "FacilityAdmin") return `${user?.facilityName || 'Facility'} Audit Logs`;
    if (role === "Developer") return `${user?.name || 'Developer'} API Logs`;
    return "Audit Logs";
  };

  const getDescription = () => {
    if (role === "FacilityAdmin") return "Activity log for your facility's integration and user actions.";
    if (role === "Developer") return "Detailed log of API calls and key management actions.";
    return "Complete system activity and accountability trail";
  };

  useEffect(() => {
    document.title = `${getTitle()} | Hkit Portal`;
  }, [role, user?.facilityName, user?.name]);

  const renderMetricValue = (value: number | string, colorClass: string = 'text-foreground') => {
    if (isLoadingMetrics) {
      return <Loader2 className="w-6 h-6 animate-spin" />;
    }
    if (isErrorMetrics) {
      return "N/A";
    }
    return <span className={colorClass}>{value.toLocaleString()}</span>;
  };

  const renderAuditList = () => {
    if (isLoadingLogs) {
      return (
        <div className="space-y-2 p-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-4 border-border">
              <Skeleton className="h-10 w-full" />
            </Card>
          ))}
        </div>
      );
    }

    if (isErrorLogs || !auditLogs) {
      return (
        <div className="p-4 text-center text-destructive">
          <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
          Error loading audit logs.
        </div>
      );
    }
    
    if (auditLogs.length === 0) {
        return (
            <div className="p-4 text-center text-muted-foreground">
                No audit logs found for your current scope.
            </div>
        );
    }

    return (
      <div className="space-y-2">
        {auditLogs.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between p-4 rounded-lg bg-secondary border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-4 flex-1">
              <Badge
                variant="outline"
                className={
                  log.status === "success"
                    ? "bg-success/10 text-success border-success/20"
                    : "bg-destructive/10 text-destructive border-destructive/20"
                }
              >
                {log.status}
              </Badge>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-sm font-medium text-foreground">{log.action}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{log.resource}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>User: {log.user}</span>
                  <span>IP: {log.ip}</span>
                  <span>{log.timestamp}</span>
                </div>
              </div>
            </div>
            <Button size="sm" variant="ghost">
              Details
            </Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{getTitle()}</h1>
        <p className="text-muted-foreground">{getDescription()}</p>
>>>>>>> master
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">Total Events (24h)</p>
<<<<<<< HEAD
          <p className="text-2xl font-bold text-foreground">12,456</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">Successful</p>
          <p className="text-2xl font-bold text-success">12,289</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">Failed</p>
          <p className="text-2xl font-bold text-destructive">167</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">Unique Users</p>
          <p className="text-2xl font-bold text-foreground">248</p>
=======
          <p className="text-2xl font-bold text-foreground">
            {renderMetricValue(metrics?.total || 0)}
          </p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">Successful</p>
          <p className="text-2xl font-bold">
            {renderMetricValue(metrics?.successful || 0, "text-success")}
          </p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">Failed</p>
          <p className="text-2xl font-bold">
            {renderMetricValue(metrics?.failed || 0, "text-destructive")}
          </p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">Unique Users</p>
          <p className="text-2xl font-bold text-foreground">
            {renderMetricValue(metrics?.uniqueUsers || 0)}
          </p>
>>>>>>> master
        </Card>
      </div>

      <Card className="p-6 border-border">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search logs by user, action, or resource..."
              className="pl-10 bg-secondary border-border"
            />
          </div>
          <Button variant="outline" className="border-border">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" className="border-border">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        <ScrollArea className="h-[600px]">
<<<<<<< HEAD
          <div className="space-y-2">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <Badge
                    variant="outline"
                    className={
                      log.status === "success"
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-destructive/10 text-destructive border-destructive/20"
                    }
                  >
                    {log.status}
                  </Badge>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-medium text-foreground">{log.action}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{log.resource}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>User: {log.user}</span>
                      <span>IP: {log.ip}</span>
                      <span>{log.timestamp}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  Details
                </Button>
              </div>
            ))}
          </div>
=======
          {renderAuditList()}
>>>>>>> master
        </ScrollArea>
      </Card>
    </div>
  );
};

<<<<<<< HEAD
export default Audit;
=======
export default Audit;
>>>>>>> master
