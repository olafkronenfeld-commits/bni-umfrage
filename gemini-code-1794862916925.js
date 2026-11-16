import React, { useState } from 'react';
import { 
  Users, 
  Send, 
  BarChart3, 
  QrCode, 
  CheckCircle2, 
  DollarSign, 
  Briefcase, 
  TrendingUp, 
  HelpCircle, 
  Share2, 
  RefreshCw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  const [view, setView] = useState('survey'); // 'survey' | 'presentation' | 'success'
  const [currentStep, setCurrentStep] = useState(1);
  
  // Lokaler Speicher für eingereichte Antworten (Simulierte Echtzeit-Datenbank)
  const [responses, setResponses] = useState([
    {
      revenue: '500k - 1M €',
      hourlyRate: 85,
      bniPricingType: 'discount',
      bniPricingValue: 15,
      networkPotential: 45000,
      cooperationModel: 'Rahmenvertrag',
      ticketSize: 5000,
      hurdle: 'Kapazitäten & Auslastung',
      targetEarnings: 20000,
      topic: 'Suche feste Handwerkspartner für wiederkehrende Altbau-Sanierungen'
    },
    {
      revenue: '250k - 500k €',
      hourlyRate: 75,
      bniPricingType: 'rate',
      bniPricingValue: 65,
      networkPotential: 25000,
      cooperationModel: 'Festpreis per Projekt',
      ticketSize: 2500,
      hurdle: 'Fehlende Preistransparenz',
      targetEarnings: 15000,
      topic: 'Biete 10% Sonderrabatt für alle Chapter-Mitglieder auf Gewerbe-Reinigungen'
    }
  ]);

  // Formular-Zustand für ein Mitglied
  const [formData, setFormData] = useState({
    revenue: '',
    hourlyRate: 75,
    bniPricingType: 'discount',
    bniPricingValue: 10,
    networkPotential: 20000,
    cooperationModel: '',
    ticketSize: 3000,
    hurdle: '',
    targetEarnings: 10000,
    topic: ''
  });

  const totalSteps = 9;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      setResponses(prev => [...prev, formData]);
      setView('success');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  // Aggregierte Berechnungen für das Beamer-Dashboard
  const totalResponses = responses.length;
  const avgHourlyRate = totalResponses 
    ? Math.round(responses.reduce((sum, r) => sum + Number(r.hourlyRate), 0) / totalResponses) 
    : 0;
  
  const totalNetworkPotential = responses.reduce((sum, r) => sum + Number(r.networkPotential), 0);
  
  const avgBniDiscount = totalResponses 
    ? Math.round(responses.filter(r => r.bniPricingType === 'discount').reduce((sum, r) => sum + Number(r.bniPricingValue), 0) / (responses.filter(r => r.bniPricingType === 'discount').length || 1)) 
    : 0;

  const shareText = `*BNI Live-Umfrage im Chapter*%0A%0ABitte macht kurz alle mit (unter 60 Sek., 100% anonym). Wir werten die Ergebnisse direkt auf dem Beamer aus!%0A%0AHier klicken: ${window.location.href}`;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Header / Navigation */}
      <header className="bg-[#CF142B] text-white shadow-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white text-[#CF142B] font-black text-xl px-2.5 py-1 rounded shadow-inner">
              BNI
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Chapter Live-Umfrage</h1>
              <p className="text-xs text-red-100">100% Anonym • Sofortige Auswertung</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView(view === 'presentation' ? 'survey' : 'presentation')}
              className="flex items-center space-x-1.5 bg-black/20 hover:bg-black/30 text-white text-xs font-semibold px-3 py-2 rounded-lg transition"
            >
              {view === 'presentation' ? (
                <>
                  <Users className="w-4 h-4" />
                  <span>Teilnehmer-Ansicht</span>
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4" />
                  <span>Beamer-Ansicht</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hauptinhalt */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6">
        
        {/* 1. UMFRAGE (Handy-Optimiert) */}
        {view === 'survey' && (
          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            {/* Fortschrittsbalken */}
            <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Frage {currentStep} von {totalSteps}
              </span>
              <div className="w-32 bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#CF142B] h-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="p-6">
              {/* Frage 1: Jahresumsatz */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">1. Jahresumsatz deines Unternehmens</h2>
                  <p className="text-sm text-slate-500 mb-6">Hilft uns, die Unternehmensgrößen im Chapter anonym einzuordnen.</p>
                  <div className="space-y-3">
                    {['< 100.000 €', '100.000 € - 250.000 €', '250.000 € - 500.000 €', '500.000 € - 1 Mio €', '> 1 Mio €'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setFormData({ ...formData, revenue: opt })}
                        className={`w-full text-left px-4 py-3.5 rounded-xl border-2 font-medium transition ${
                          formData.revenue === opt
                            ? 'border-[#CF142B] bg-red-50 text-[#CF142B]'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Frage 2: Regulärer Stundensatz */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">2. Dein regulärer Stundensatz (€)</h2>
                  <p className="text-sm text-slate-500 mb-6">Welcher Stundensatz liegt deiner regulären Kalkulation zugrunde?</p>
                  <div className="text-center py-6 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
                    <span className="text-4xl font-extrabold text-[#CF142B]">{formData.hourlyRate} €</span>
                    <span className="text-slate-500 text-sm font-semibold"> / Std. (netto)</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="250"
                    step="5"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                    className="w-full accent-[#CF142B] h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                    <span>30 €</span>
                    <span>140 €</span>
                    <span>250 €+</span>
                  </div>
                </div>
              )}

              {/* Frage 3: Fairer BNI-Mitgliederpreis / Provision */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">3. Fairer BNI-Mitgliederpreis / Vorteil</h2>
                  <p className="text-sm text-slate-500 mb-4">Welchen Vorteil wärst du bereit, Chapter-Kollegen einzuräumen?</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      onClick={() => setFormData({ ...formData, bniPricingType: 'discount' })}
                      className={`p-3 rounded-xl border-2 text-sm font-bold transition ${
                        formData.bniPricingType === 'discount'
                          ? 'border-[#CF142B] bg-red-50 text-[#CF142B]'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      Prozent-Rabatt / Provision (%)
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, bniPricingType: 'rate' })}
                      className={`p-3 rounded-xl border-2 text-sm font-bold transition ${
                        formData.bniPricingType === 'rate'
                          ? 'border-[#CF142B] bg-red-50 text-[#CF142B]'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      BNI-Stundensatz (€)
                    </button>
                  </div>

                  {formData.bniPricingType === 'discount' ? (
                    <div className="text-center py-6 bg-slate-50 rounded-2xl border border-slate-200">
                      <span className="text-4xl font-extrabold text-[#CF142B]">{formData.bniPricingValue} %</span>
                      <p className="text-xs text-slate-500 mt-1">Rabatt oder Erfolgs-Provision</p>
                      <input
                        type="range"
                        min="0"
                        max="30"
                        step="1"
                        value={formData.bniPricingValue}
                        onChange={(e) => setFormData({ ...formData, bniPricingValue: Number(e.target.value) })}
                        className="w-full accent-[#CF142B] mt-4 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-slate-50 rounded-2xl border border-slate-200">
                      <span className="text-4xl font-extrabold text-[#CF142B]">{formData.bniPricingValue} €</span>
                      <p className="text-xs text-slate-500 mt-1">Spezieller BNI-Stundensatz</p>
                      <input
                        type="range"
                        min="30"
                        max="200"
                        step="5"
                        value={formData.bniPricingValue}
                        onChange={(e) => setFormData({ ...formData, bniPricingValue: Number(e.target.value) })}
                        className="w-full accent-[#CF142B] mt-4 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Frage 4: Umsatzpotenzial im Chapter */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">4. Geschätztes Umsatzpotenzial im Chapter</h2>
                  <p className="text-sm text-slate-500 mb-6">Wie viel Umsatz (€/Jahr) könntest du hypothetisch durch Aufträge/Kooperationen DIREKT an Mitglieder vergeben?</p>
                  <div className="text-center py-6 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
                    <span className="text-4xl font-extrabold text-[#CF142B]">{formData.networkPotential.toLocaleString('de-DE')} €</span>
                    <span className="text-slate-500 text-sm font-semibold"> / Jahr</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="2500"
                    value={formData.networkPotential}
                    onChange={(e) => setFormData({ ...formData, networkPotential: Number(e.target.value) })}
                    className="w-full accent-[#CF142B] h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                    <span>1.000 €</span>
                    <span>50.000 €</span>
                    <span>100.000 €+</span>
                  </div>
                </div>
              )}

              {/* Frage 5: Kooperationsmodell */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">5. Bevorzugtes Kooperationsmodell</h2>
                  <p className="text-sm text-slate-500 mb-6">Wie machst du am liebsten Geschäft mit anderen Mitgliedern?</p>
                  <div className="space-y-3">
                    {[
                      'Festpreis per Projekt',
                      'Stundenbasis / Nach Aufwand',
                      'Rahmenvertrag / Abo-Modell',
                      'Provisionsmodell / Vermittlung'
                    ].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setFormData({ ...formData, cooperationModel: opt })}
                        className={`w-full text-left px-4 py-3.5 rounded-xl border-2 font-medium transition ${
                          formData.cooperationModel === opt
                            ? 'border-[#CF142B] bg-red-50 text-[#CF142B]'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Frage 6: Ticket Size / Auftragswert */}
              {currentStep === 6 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">6. Idealer Einzel-Auftragswert (€)</h2>
                  <p className="text-sm text-slate-500 mb-6">Was ist für dich eine ideale Auftragsgröße bei einer Empfehlung?</p>
                  <div className="text-center py-6 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
                    <span className="text-4xl font-extrabold text-[#CF142B]">{formData.ticketSize.toLocaleString('de-DE')} €</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="50000"
                    step="500"
                    value={formData.ticketSize}
                    onChange={(e) => setFormData({ ...formData, ticketSize: Number(e.target.value) })}
                    className="w-full accent-[#CF142B] h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              )}

              {/* Frage 7: Größte Hürde */}
              {currentStep === 7 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">7. Größte Hürde bei der Vergabe</h2>
                  <p className="text-sm text-slate-500 mb-6">Was hält dich am ehesten davon ab, Aufträge intern im Chapter zu vergeben?</p>
                  <div className="space-y-3">
                    {[
                      'Fehlende Preistransparenz',
                      'Kapazitäten & Auslastung',
                      'Unklare Leistungsangebote',
                      'Bedenken bei Gewährleistung / Haftung',
                      'Keine passenden Gewerke im Chapter'
                    ].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setFormData({ ...formData, hurdle: opt })}
                        className={`w-full text-left px-4 py-3.5 rounded-xl border-2 font-medium transition ${
                          formData.hurdle === opt
                            ? 'border-[#CF142B] bg-red-50 text-[#CF142B]'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Frage 8: Gewünschter Zusatzverdienst */}
              {currentStep === 8 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">8. Gewünschter BNI-Mehrumsatz (€/Jahr)</h2>
                  <p className="text-sm text-slate-500 mb-6">Welchen Mehrumsatz möchtest du dieses Jahr über das BNI-Netzwerk generieren?</p>
                  <div className="text-center py-6 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
                    <span className="text-4xl font-extrabold text-[#CF142B]">{formData.targetEarnings.toLocaleString('de-DE')} €</span>
                    <span className="text-slate-500 text-sm font-semibold"> / Jahr</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="150000"
                    step="5000"
                    value={formData.targetEarnings}
                    onChange={(e) => setFormData({ ...formData, targetEarnings: Number(e.target.value) })}
                    className="w-full accent-[#CF142B] h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              )}

              {/* Frage 9: Freitext Impuls */}
              {currentStep === 9 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">9. Dein konkretes Angebot / Gesuch für heute</h2>
                  <p className="text-sm text-slate-500 mb-4">Ein Satz für die anschließende Diskussion auf dem Beamer (anonym).</p>
                  <textarea
                    rows={4}
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    placeholder="Z. B. Ich suche aktuell einen Elektriker für 3 Objekt-Projekte ODER Biete Chapter-Mitgliedern Vorzugskonditionen auf..."
                    className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-[#CF142B] focus:outline-none text-slate-800"
                  ></textarea>
                </div>
              )}

              {/* Button Navigation */}
              <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-100">
                {currentStep > 1 ? (
                  <button
                    onClick={handlePrev}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-semibold text-sm hover:bg-slate-50"
                  >
                    Zurück
                  </button>
                ) : <div></div>}

                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 bg-[#CF142B] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-red-700 shadow-md shadow-red-200 transition"
                >
                  <span>{currentStep === totalTotalSteps ? 'Absenden' : 'Weiter'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. SUCCESS-BILDSCHIRM (Nach Absenden) */}
        {view === 'success' && (
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">Vielen Dank!</h2>
            <p className="text-slate-600 mb-6 text-sm">
              Deine Antworten wurden anonym an das Dashboard übermittelt. Wir besprechen die Live-Ergebnisse jetzt gemeinsam auf dem Beamer.
            </p>

            <a
              href={`https://wa.me/?text=${shareText}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 bg-emerald-600 text-white font-bold px-5 py-3 rounded-xl hover:bg-emerald-700 shadow-md text-sm transition mb-4 w-full justify-center"
            >
              <Share2 className="w-4 h-4" />
              <span>Umfrage in WhatsApp teilen</span>
            </a>

            <button
              onClick={() => { setView('survey'); setCurrentStep(1); }}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 block mx-auto"
            >
              Neue Antwort eingeben
            </button>
          </div>
        )}

        {/* 3. BEAMER- & PRÄSENTATIONS-DASHBOARD */}
        {view === 'presentation' && (
          <div className="space-y-6">
            
            {/* Kopfzeile Beamer */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between border border-slate-800 gap-4">
              <div>
                <span className="bg-red-600 text-white font-bold text-xs px-2.5 py-1 rounded tracking-wider uppercase mb-2 inline-block">
                  Live Dashboard
                </span>
                <h2 className="text-2xl font-black">Geschäft & Stundensätze im Chapter</h2>
                <p className="text-slate-400 text-sm mt-1">Echtzeit-Auswertung für die gemeinsame Diskussion</p>
              </div>

              {/* QR Code Simulation & WhatsApp Link */}
              <div className="flex items-center space-x-4 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <div className="bg-white p-2 rounded-lg text-slate-900">
                  <QrCode className="w-12 h-12" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-300">Jetzt mitmachen:</div>
                  <div className="text-xs font-semibold text-red-400">Scan den QR-Code</div>
                  <a
                    href={`https://wa.me/?text=${shareText}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-emerald-400 text-xs font-bold hover:underline mt-1"
                  >
                    <Share2 className="w-3 h-3" />
                    <span>WhatsApp-Link senden</span>
                  </a>
                </div>
              </div>
            </div>

            {/* KPI KARTEN */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Teilnehmer</span>
                  <Users className="w-5 h-5 text-[#CF142B]" />
                </div>
                <div className="text-3xl font-black text-slate-800">{totalResponses}</div>
                <span className="text-xs text-slate-400 font-medium">Abgegebene Stimmen</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Ø Stundensatz</span>
                  <DollarSign className="w-5 h-5 text-[#CF142B]" />
                </div>
                <div className="text-3xl font-black text-slate-800">{avgHourlyRate} €</div>
                <span className="text-xs text-slate-400 font-medium">Kalkulatorischer Schnitt</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Ø BNI-Vorteil</span>
                  <TrendingUp className="w-5 h-5 text-[#CF142B]" />
                </div>
                <div className="text-3xl font-black text-slate-800">{avgBniDiscount} %</div>
                <span className="text-xs text-slate-400 font-medium">Erfolgsrabatt / Vorteil</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Netzwerk-Potenzial</span>
                  <Briefcase className="w-5 h-5 text-[#CF142B]" />
                </div>
                <div className="text-3xl font-black text-slate-800">{totalNetworkPotential.toLocaleString('de-DE')} €</div>
                <span className="text-xs text-slate-400 font-medium">Gesamt-Vergabevolumen/Jahr</span>
              </div>
            </div>

            {/* DETAIL-GRAFIKEN & IMPULSE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Themen & Angebote für die Diskussion */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm md:col-span-2">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-[#CF142B]" />
                  <span>Anonyme Impulse & Angebote aus dem Chapter</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {responses.map((r, idx) => r.topic ? (
                    <div key={idx} className="bg-red-50/60 border border-red-100 p-4 rounded-xl">
                      <p className="text-sm font-semibold text-slate-800 italic">"{r.topic}"</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-slate-500 font-medium">
                        <span>Gewünscht: {Number(r.targetEarnings).toLocaleString('de-DE')} € Mehrumsatz</span>
                        <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-bold text-[#CF142B]">
                          {r.cooperationModel}
                        </span>
                      </div>
                    </div>
                  ) : null)}
                </div>
              </div>

            </div>

            {/* Reset Button */}
            <div className="text-center pt-4">
              <button
                onClick={() => setResponses([])}
                className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-red-600 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Datenbank zurücksetzen</span>
              </button>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}