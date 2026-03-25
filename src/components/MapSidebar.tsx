import { Language, languageLabels, uiTranslations, landmarks, type Landmark } from "@/data/landmarks";

interface MapSidebarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeLandmark: string | null;
  onLandmarkClick: (landmark: Landmark) => void;
}

const categoryIcons: Record<string, string> = {
  fortress: "🏰",
  church: "⛪",
  historic: "🏛️",
  plaza: "🏞️",
  gate: "🚪",
};

const AdPlaceholder = ({ position }: { position: number }) => (
  <div className="mx-3 my-2 rounded-lg overflow-hidden border border-dashed flex flex-col items-center justify-center py-4 px-3 gap-1" style={{ borderColor: "hsl(var(--sidebar-hover))", background: "hsl(var(--sidebar-hover) / 0.4)" }}>
    <span className="text-[10px] font-semibold uppercase tracking-widest opacity-40">Ad</span>
    <div className="w-full aspect-[3/1] rounded bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center">
      <span className="text-xs opacity-30">Advertisement {position}</span>
    </div>
  </div>
);

const MapSidebar = ({ language, onLanguageChange, activeLandmark, onLandmarkClick }: MapSidebarProps) => {
  const ui = uiTranslations[language];

  return (
    <aside className="w-64 h-full flex flex-col overflow-hidden" style={{ background: "hsl(var(--sidebar-bg))", color: "hsl(var(--sidebar-fg))" }}>
      {/* Header */}
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-xl font-bold tracking-tight">{ui.title}</h1>
        <p className="text-sm opacity-70">{ui.subtitle}</p>
      </div>

      {/* Language Selector */}
      <div className="px-4 pb-3">
        <label className="text-xs font-medium opacity-70 block mb-1.5">{ui.selectLanguage}</label>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as Language)}
          className="w-full rounded-md px-3 py-2 text-sm font-medium border-0 focus:ring-2 focus:outline-none"
          style={{
            background: "hsl(var(--sidebar-hover))",
            color: "hsl(var(--sidebar-fg))",
          }}
        >
          {(Object.keys(languageLabels) as Language[]).map((lang) => (
            <option key={lang} value={lang}>{languageLabels[lang]}</option>
          ))}
        </select>
      </div>

      {/* Landmarks List */}
      <div className="px-4 pb-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider opacity-60">{ui.landmarks}</h2>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5">
        {landmarks.map((lm, index) => (
          <div key={lm.id}>
            <button
              onClick={() => onLandmarkClick(lm)}
              className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
              style={{
                background: activeLandmark === lm.id ? "hsl(var(--landmark-active))" : "transparent",
                color: activeLandmark === lm.id ? "hsl(0 0% 100%)" : "hsl(var(--sidebar-fg))",
              }}
              onMouseEnter={(e) => {
                if (activeLandmark !== lm.id) e.currentTarget.style.background = "hsl(var(--sidebar-hover))";
              }}
              onMouseLeave={(e) => {
                if (activeLandmark !== lm.id) e.currentTarget.style.background = "transparent";
              }}
            >
              <span>{categoryIcons[lm.category]}</span>
              <span className="truncate">{lm.translations[language].name}</span>
            </button>

            {/* Ad after every 4th landmark */}
            {(index + 1) % 4 === 0 && <AdPlaceholder position={Math.floor((index + 1) / 4)} />}
          </div>
        ))}

        {/* Bottom ad */}
        <AdPlaceholder position={0} />
      </nav>

      {/* Footer hint */}
      <div className="px-4 py-3 text-xs opacity-50 border-t" style={{ borderColor: "hsl(var(--sidebar-hover))" }}>
        {ui.clickHint}
      </div>
    </aside>
  );
};

export default MapSidebar;
