import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { Download, TrendingUp, TrendingDown } from "lucide-react";

const facilityScores = [
  { name: "General Hospital Ilorin", score: 95, trend: "up", change: "+3%" },
  { name: "Baptist Medical Centre", score: 92, trend: "up", change: "+1%" },
  { name: "Sobi Specialist Hospital", score: 88, trend: "down", change: "-2%" },
  { name: "Private Clinic Offa", score: 85, trend: "up", change: "+5%" },
  { name: "Community Health Centre", score: 78, trend: "down", change: "-4%" },
  { name: "Maternity Hospital", score: 72, trend: "up", change: "+2%" },
];

const missingFields = [
  { field: "Patient.birthDate", count: 234, percentage: 12 },
  { field: "Observation.effectiveDateTime", count: 189, percentage: 9 },
  { field: "Encounter.serviceProvider", count: 156, percentage: 8 },
  { field: "MedicationRequest.dosageInstruction", count: 142, percentage: 7 },
  { field: "Condition.onsetDateTime", count: 128, percentage: 6 },
];

const DataQuality = () => {
=======
import { Download, TrendingUp, TrendingDown, Loader2, AlertTriangle } from "lucide-react";
import { CompletenessTrendChart } from "@/components/data-quality/CompletenessTrendChart";
import { ErrorDistributionChart } from "@/components/data-quality/ErrorDistributionChart";
import { DataQualityHeatmap } from "@/components/data-quality/DataQualityHeatmap";
import { useAuth } from "@/hooks/use-auth";
import { 
  useFacilityScores, 
  useDataQualityHeatmap, 
  useCompletenessTrend, 
  useErrorDistribution,
  useValidationErrorsCount, // Import new hook
} from "@/hooks/use-hkit-data";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

const DataQuality = () => {
  const { role, user } = useAuth();
  const facilityName = user?.facilityName;

  // Data Hooks
  const { data: facilityScores, isLoading: isLoadingScores, isError: isErrorScores } = useFacilityScores();
  const { data: heatmapData, isLoading: isLoadingHeatmap, isError: isErrorHeatmap } = useDataQualityHeatmap();
  const { data: trendData, isLoading: isLoadingTrend } = useCompletenessTrend();
  const { data: errorDistData, isLoading: isLoadingErrorDist } = useErrorDistribution();
  const { data: validationErrorsCount, isLoading: isLoadingErrorsCount } = useValidationErrorsCount(); // Use new hook

  const getTitle = () => {
    if (role === "FacilityAdmin") return `${facilityName || 'Your Facility'} Data Quality Score`;
    return "Data Quality Center";
  };

  const getDescription = () => {
    if (role === "FacilityAdmin") return "Monitor your facility's compliance with the Minimum Dataset Standard.";
    return "Monitor and enforce minimum dataset compliance";
  };

  useEffect(() => {
    document.title = `${getTitle()} | Hkit Portal`;
  }, [role, facilityName]);

  // Calculate overall metrics based on fetched data
  const overallCompleteness = facilityScores?.length 
    ? (facilityScores.reduce((sum, f) => sum + f.score, 0) / facilityScores.length).toFixed(1)
    : "N/A";

  // Calculate facilities meeting MDS
  const totalFacilities = facilityScores?.length || 0;
  const facilitiesMeetingMDS = facilityScores?.filter(f => f.score >= 80).length || 0;
  
  const complianceRate = totalFacilities > 0 
    ? `${((facilitiesMeetingMDS / totalFacilities) * 100).toFixed(1)}% compliance rate`
    : "N/A";
    
  const facilitiesMeetingMDSLabel = role === "FacilityAdmin"
    ? (totalFacilities > 0 && facilitiesMeetingMDS > 0 ? "1/1" : "0/1")
    : `${facilitiesMeetingMDS}/${totalFacilities}`;


  const renderFacilityScores = () => {
    if (isLoadingScores) {
      return (
        <div className="space-y-4">
          {[...Array(role === 'FacilityAdmin' ? 1 : 3)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      );
    }
    
    if (isErrorScores || !facilityScores) {
        return (
            <Card className="p-8 border-destructive/20 bg-destructive/10 text-center">
                <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-3" />
                <p className="text-destructive">Error loading facility scores.</p>
            </Card>
        );
    }

    return (
      <div className="space-y-4">
        {facilityScores.map((facility, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">{facility.name}</span>
                <div className="flex items-center gap-1">
                  {facility.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-success" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  )}
                  <span
                    className={`text-xs ${
                      facility.trend === "up" ? "text-success" : "text-destructive"
                    }`}
                  >
                    {facility.change}
                  </span>
                </div>
              </div>
              <span className="text-sm font-semibold text-foreground">{facility.score}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  facility.score >= 90
                    ? "bg-success"
                    : facility.score >= 80
                    ? "bg-primary"
                    : facility.score >= 70
                    ? "bg-warning"
                    : "bg-destructive"
                }`}
                style={{ width: `${facility.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

>>>>>>> master
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
<<<<<<< HEAD
          <h1 className="text-3xl font-bold text-foreground mb-2">Data Quality Center</h1>
          <p className="text-muted-foreground">Monitor and enforce minimum dataset compliance</p>
=======
          <h1 className="text-3xl font-bold text-foreground mb-2">{getTitle()}</h1>
          <p className="text-muted-foreground">{getDescription()}</p>
>>>>>>> master
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border-border">
          <p className="text-sm text-muted-foreground mb-2">Overall Completeness</p>
<<<<<<< HEAD
          <p className="text-3xl font-bold text-foreground mb-4">87.3%</p>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: "87.3%" }} />
=======
          <p className="text-3xl font-bold text-foreground mb-4">
            {isLoadingScores ? <Loader2 className="w-6 h-6 animate-spin" /> : `${overallCompleteness}%`}
          </p>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${parseFloat(overallCompleteness as string) || 0}%` }} />
>>>>>>> master
          </div>
        </Card>
        <Card className="p-6 border-border">
          <p className="text-sm text-muted-foreground mb-2">Validation Errors (24h)</p>
<<<<<<< HEAD
          <p className="text-3xl font-bold text-destructive mb-2">342</p>
          <p className="text-sm text-muted-foreground">-15% from yesterday</p>
        </Card>
        <Card className="p-6 border-border">
          <p className="text-sm text-muted-foreground mb-2">Facilities Meeting MDS</p>
          <p className="text-3xl font-bold text-success mb-2">94/118</p>
          <p className="text-sm text-muted-foreground">79.7% compliance rate</p>
        </Card>
      </div>

      <Card className="p-6 border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Facility Completeness Scores</h3>
        <div className="space-y-4">
          {facilityScores.map((facility, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">{facility.name}</span>
                  <div className="flex items-center gap-1">
                    {facility.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-success" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-destructive" />
                    )}
                    <span
                      className={`text-xs ${
                        facility.trend === "up" ? "text-success" : "text-destructive"
                      }`}
                    >
                      {facility.change}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground">{facility.score}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    facility.score >= 90
                      ? "bg-success"
                      : facility.score >= 80
                      ? "bg-primary"
                      : facility.score >= 70
                      ? "bg-warning"
                      : "bg-destructive"
                  }`}
                  style={{ width: `${facility.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Common Missing Fields</h3>
          <div className="space-y-4">
            {missingFields.map((field, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground font-mono">{field.field}</span>
                  <span className="text-sm text-muted-foreground">{field.count} records</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-destructive rounded-full"
                    style={{ width: `${field.percentage * 8}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Benchmarking Insights</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm font-medium text-foreground mb-2">Top Performer</p>
              <p className="text-lg font-bold text-primary">General Hospital Ilorin</p>
              <p className="text-xs text-muted-foreground mt-1">95% completeness score</p>
            </div>
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <p className="text-sm font-medium text-foreground mb-2">Needs Attention</p>
              <p className="text-lg font-bold text-warning">5 facilities below 75%</p>
              <p className="text-xs text-muted-foreground mt-1">Outreach recommended</p>
            </div>
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <p className="text-sm font-medium text-foreground mb-2">Most Improved</p>
              <p className="text-lg font-bold text-success">Private Clinic Offa</p>
              <p className="text-xs text-muted-foreground mt-1">+5% this week</p>
            </div>
          </div>
        </Card>
=======
          <p className="text-3xl font-bold text-destructive mb-2">
            {isLoadingErrorsCount ? <Loader2 className="w-6 h-6 animate-spin" /> : validationErrorsCount?.toLocaleString() || 0}
          </p>
          <p className="text-sm text-muted-foreground">-15% from yesterday (Mock)</p>
        </Card>
        <Card className="p-6 border-border">
          <p className="text-sm text-muted-foreground mb-2">Facilities Meeting MDS</p>
          <p className="text-3xl font-bold text-success mb-2">
            {isLoadingScores ? <Loader2 className="w-6 h-6 animate-spin" /> : facilitiesMeetingMDSLabel}
          </p>
          <p className="text-sm text-muted-foreground">{complianceRate}</p>
        </Card>
      </div>

      {/* Heatmap is only relevant for MoH, so we hide it for Facility Admin */}
      {role === "MoH" && (
        <DataQualityHeatmap 
          data={heatmapData || []} 
          isLoading={isLoadingHeatmap} 
          isError={isErrorHeatmap} 
        />
      )}

      <Card className="p-6 border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {role === "FacilityAdmin" ? "Your Facility Score" : "Facility Completeness Scores"}
        </h3>
        {renderFacilityScores()}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ErrorDistributionChart 
          data={errorDistData || []} 
          isLoading={isLoadingErrorDist} 
        /> 
        <CompletenessTrendChart 
          data={trendData || []} 
          isLoading={isLoadingTrend} 
        />
>>>>>>> master
      </div>
    </div>
  );
};

export default DataQuality;
