import { useState } from "react";
import { Language, uiTranslations, type Landmark } from "@/data/landmarks";

interface LandmarkPopupProps {
  landmark: Landmark;
  language: Language;
  onClose: () => void;
}

const LandmarkPopup = ({ landmark, language, onClose }: LandmarkPopupProps) => {
  const [showHistory, setShowHistory] = useState(false);
  const t = landmark.translations[language];
  const ui = uiTranslations[language];

  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-2xl max-w-sm w-full overflow-hidden border border-border">
      {/* Header */}
      <div className="px-5 pt-4 pb-2 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold leading-tight">{t.name}</h3>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {ui.categories[landmark.category]}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors text-xl leading-none p-1"
          aria-label={ui.close}
        >
          ×
        </button>
      </div>

      {/* Description */}
      <div className="px-5 pb-3">
        <p className="text-sm text-muted-foreground leading-relaxed">{t.description}</p>
      </div>

      {/* History toggle */}
      <div className="px-5 pb-4">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="text-sm font-semibold transition-colors flex items-center gap-1"
          style={{ color: "hsl(var(--accent))" }}
        >
          <span className="text-base">{showHistory ? "▾" : "▸"}</span>
          {ui.history}
        </button>
        {showHistory && (
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
            {t.history}
          </p>
        )}
      </div>
    </div>
  );
};

export default LandmarkPopup;
