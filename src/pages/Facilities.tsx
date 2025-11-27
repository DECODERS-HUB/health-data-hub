import { Card } from "@/components/ui/card";
<<<<<<< HEAD
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle2, Clock, XCircle, MapPin, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const facilities = [
  {
    id: 1,
    name: "General Hospital Ilorin",
    lga: "Ilorin West",
    type: "Public",
    status: "verified",
    compliance: 92,
    administrators: 3,
    apiActivity: "2.3k req/day",
    lastSync: "2 min ago",
  },
  {
    id: 2,
    name: "Baptist Medical Centre",
    lga: "Ilorin South",
    type: "Private",
    status: "verified",
    compliance: 88,
    administrators: 2,
    apiActivity: "1.8k req/day",
    lastSync: "5 min ago",
  },
  {
    id: 3,
    name: "Sobi Specialist Hospital",
    lga: "Ilorin East",
    type: "Public",
    status: "verified",
    compliance: 95,
    administrators: 4,
    apiActivity: "3.1k req/day",
    lastSync: "1 min ago",
  },
  {
    id: 4,
    name: "Private Clinic Offa",
    lga: "Offa",
    type: "Private",
    status: "pending",
    compliance: 0,
    administrators: 0,
    apiActivity: "N/A",
    lastSync: "N/A",
  },
];

const Facilities = () => {
=======
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FacilityCardList } from "@/components/facilities/FacilityCardList";
import { useState, useMemo, useEffect } from "react";
import { useFacilities, useApproveFacility, useRejectFacility } from "@/hooks/use-hkit-data";
import { Facility } from "@/api/hkit";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const Facilities = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const { data: facilities, isLoading, isError } = useFacilities();
  const approveMutation = useApproveFacility();
  const rejectMutation = useRejectFacility();

  useEffect(() => {
    document.title = "Facility Registry | Hkit Portal";
  }, []);

  const handleApprove = (id: number, name: string) => {
    approveMutation.mutate(id);
  };

  const handleReject = (id: number, name: string) => {
    rejectMutation.mutate(id);
  };

  const handleAddNewFacility = () => {
    toast.info("Action: Navigate to Facility Creation Form (Not Implemented)");
  };

  const handleFilterLGA = () => {
    toast.info("Action: Open LGA Filter Dialog (Not Implemented)");
  };

  const handleExportList = () => {
    toast.info("Action: Exporting Facility List (Mock Action)");
  };

  const filteredFacilities = useMemo(() => {
    if (!facilities) return [];
    switch (activeTab) {
      case 'verified':
        return facilities.filter(f => f.status === 'verified');
      case 'pending':
      case 'rejected':
        // Ensure pending and rejected are shown for MoH to manage
        return facilities.filter(f => f.status === activeTab);
      case 'all':
      default:
        return facilities;
    }
  }, [facilities, activeTab]);

  const verifiedCount = facilities?.filter(f => f.status === 'verified').length || 0;
  const pendingCount = facilities?.filter(f => f.status === 'pending').length || 0;
  const rejectedCount = facilities?.filter(f => f.status === 'rejected').length || 0;
  const totalCount = facilities?.length || 0;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6 border-border">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <div className="grid grid-cols-4 gap-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </Card>
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <Card className="p-8 border-destructive/20 bg-destructive/10 text-center">
          <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-3" />
          <p className="text-destructive">Error loading facility data. Please try refreshing.</p>
        </Card>
      );
    }

    return (
      <FacilityCardList 
        facilities={filteredFacilities} 
        showActions={true} 
        onApprove={handleApprove}
        onReject={handleReject}
      />
    );
  };

>>>>>>> master
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Facility Registry</h1>
          <p className="text-muted-foreground">Manage facility onboarding and compliance</p>
        </div>
<<<<<<< HEAD
        <Button className="bg-primary hover:bg-primary/90">
=======
        <Button className="bg-primary hover:bg-primary/90" onClick={handleAddNewFacility}>
>>>>>>> master
          Add New Facility
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search facilities..."
            className="pl-10 bg-secondary border-border"
          />
        </div>
<<<<<<< HEAD
        <Button variant="outline" className="border-border">
          Filter by LGA
        </Button>
        <Button variant="outline" className="border-border">
=======
        <Button variant="outline" className="border-border" onClick={handleFilterLGA}>
          Filter by LGA
        </Button>
        <Button variant="outline" className="border-border" onClick={handleExportList}>
>>>>>>> master
          Export List
        </Button>
      </div>

<<<<<<< HEAD
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-secondary">
          <TabsTrigger value="all">All Facilities (118)</TabsTrigger>
          <TabsTrigger value="verified">Verified (110)</TabsTrigger>
          <TabsTrigger value="pending">Pending (8)</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 gap-4">
            {facilities.map((facility) => (
              <Card key={facility.id} className="p-6 border-border hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{facility.name}</h3>
                      <Badge
                        variant="outline"
                        className={
                          facility.status === "verified"
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-warning/10 text-warning border-warning/20"
                        }
                      >
                        {facility.status === "verified" ? (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {facility.status === "verified" ? "Verified" : "Pending Approval"}
                      </Badge>
                      <Badge variant="outline" className="border-border">
                        {facility.type}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{facility.lga}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{facility.administrators} admins</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">API Activity: </span>
                        <span className="text-foreground font-medium">{facility.apiActivity}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Last Sync: </span>
                        <span className="text-foreground font-medium">{facility.lastSync}</span>
                      </div>
                    </div>

                    {facility.status === "verified" && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Compliance Score</span>
                          <span className="text-sm font-semibold text-foreground">{facility.compliance}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${facility.compliance}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    {facility.status === "pending" ? (
                      <>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="border-border">
                          Reject
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" className="border-border">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="border-border">
                          Manage
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="verified">
          <p className="text-muted-foreground text-center py-8">Showing verified facilities only</p>
        </TabsContent>

        <TabsContent value="pending">
          <p className="text-muted-foreground text-center py-8">Showing pending facilities only</p>
        </TabsContent>
      </Tabs>
=======
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-secondary">
          <TabsTrigger value="all">All Facilities ({totalCount})</TabsTrigger>
          <TabsTrigger value="verified">Verified ({verifiedCount})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedCount})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {renderContent()}
        </TabsContent>
      </Tabs>
      
      {(approveMutation.isPending || rejectMutation.isPending) && (
        <div className="fixed bottom-4 right-4 p-3 bg-primary text-primary-foreground rounded-lg shadow-lg flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Processing facility update...
        </div>
      )}
>>>>>>> master
    </div>
  );
};

<<<<<<< HEAD
export default Facilities;
=======
export default Facilities;
>>>>>>> master
