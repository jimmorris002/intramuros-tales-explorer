import { useState } from "react";
import MapSidebar from "@/components/MapSidebar";
import IntramurosMap from "@/components/IntramurosMap";
import { Language, type Landmark } from "@/data/landmarks";

const Index = () => {
  const [language, setLanguage] = useState<Language>("en");
  const [activeLandmark, setActiveLandmark] = useState<Landmark | null>(null);

  const handleLandmarkClick = (landmark: Landmark) => {
    setActiveLandmark(landmark);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <MapSidebar
        language={language}
        onLanguageChange={setLanguage}
        activeLandmark={activeLandmark?.id ?? null}
        onLandmarkClick={handleLandmarkClick}
      />
      <main className="flex-1 relative">
        <IntramurosMap
          language={language}
          activeLandmark={activeLandmark}
          onLandmarkSelect={setActiveLandmark}
        />
      </main>
    </div>
  );
};

export default Index;
