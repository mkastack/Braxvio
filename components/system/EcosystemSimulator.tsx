'use client';

import React, { useState } from 'react';
import { Play, CheckCircle2, ArrowRight, Activity, Building2, Pill, Truck, Landmark, RefreshCw } from 'lucide-react';
import BraxvioLogo from '@/components/ui/BraxvioLogo';

interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  steps: {
    node: string;
    action: string;
    status: string;
    color: string;
    icon: 'kampus' | 'pharmora' | 'ecolift' | 'devpay' | 'braxvio';
  }[];
}

const SCENARIOS: SimulationScenario[] = [
  {
    id: 'student-ecosystem',
    title: 'Student Housing & Campus Commerce',
    description: 'How Kampus verifies student identity, DevPay locks peer escrow, and Ecolift manages campus waste telemetry.',
    steps: [
      {
        node: 'Braxvio Core',
        action: 'Dispatches cryptographic student identity schema',
        status: 'Identity Issued',
        color: '#002F5B',
        icon: 'braxvio'
      },
      {
        node: 'Kampus',
        action: 'Vets Bani Hall hostel room booking reservation',
        status: 'Lease Confirmed',
        color: '#11AFC1',
        icon: 'kampus'
      },
      {
        node: 'DevPay Africa',
        action: 'Holds semester rent in milestone escrow until check-in',
        status: 'Escrow Secured',
        color: '#006EAA',
        icon: 'devpay'
      },
      {
        node: 'Ecolift',
        action: 'Provisions student hostel recycling bins with sorting credits',
        status: 'Telemetry Active',
        color: '#42D6C5',
        icon: 'ecolift'
      }
    ]
  },
  {
    id: 'healthcare-dispatch',
    title: 'Cold-Chain Medicine Fulfillment',
    description: 'How Pharmora queries authentic pharmacy inventory, DevPay processes clinical payment, and Ecolift tracks zero-emission dispatch.',
    steps: [
      {
        node: 'Pharmora',
        action: 'Queries 14 licensed pharmacies for rare insulin batch',
        status: 'Stock Located (1.2km)',
        color: '#008FC4',
        icon: 'pharmora'
      },
      {
        node: 'Braxvio Core',
        action: 'Validates pharmacist clinical digital signature',
        status: 'FDA Compliant',
        color: '#002F5B',
        icon: 'braxvio'
      },
      {
        node: 'DevPay Africa',
        action: 'Splits instant payout between community pharmacy & courier',
        status: 'Settled Instant',
        color: '#006EAA',
        icon: 'devpay'
      },
      {
        node: 'Ecolift',
        action: 'Optimizes courier dispatch route maintaining 3.4°C temp',
        status: 'Delivered in 18m',
        color: '#42D6C5',
        icon: 'ecolift'
      }
    ]
  }
];

export default function EcosystemSimulator() {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const scenario = SCENARIOS[activeScenarioIdx];

  const handleRunSimulation = () => {
    setIsRunning(true);
    setCurrentStep(0);

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= scenario.steps.length - 1) {
          clearInterval(interval);
          setIsRunning(false);
          return scenario.steps.length;
        }
        return prev + 1;
      });
    }, 900);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'kampus':
        return <Building2 className="w-4 h-4 text-[#11AFC1]" />;
      case 'pharmora':
        return <Pill className="w-4 h-4 text-[#008FC4]" />;
      case 'ecolift':
        return <Truck className="w-4 h-4 text-[#42D6C5]" />;
      case 'devpay':
        return <Landmark className="w-4 h-4 text-[#006EAA]" />;
      case 'braxvio':
      default:
        return <BraxvioLogo variant="mark" size="sm" />;
    }
  };

  return (
    <div className="rounded-3xl p-8 sm:p-12 bg-[#071C2B] border border-[#11AFC1]/30 text-white shadow-2xl relative overflow-hidden space-y-8">
      {/* Background System Grid */}
      <div className="absolute inset-0 braxvio-grid-dark opacity-35 pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#42D6C5] animate-ping" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#42D6C5] font-bold">
              THE BRAXVIO SYSTEM SIMULATOR / INTERCONNECTED MESH
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Watch How the Ecosystem Communicates
          </h3>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex gap-2 bg-black/40 p-1.5 rounded-xl border border-white/10">
          {SCENARIOS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveScenarioIdx(idx);
                setCurrentStep(0);
                setIsRunning(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeScenarioIdx === idx
                  ? 'bg-[#11AFC1] text-[#002F5B] font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Scenario 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Overview & Trigger Button */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/5 p-5 rounded-2xl border border-white/10">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-[#42D6C5]">{scenario.title}</h4>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">{scenario.description}</p>
        </div>

        <button
          onClick={handleRunSimulation}
          disabled={isRunning}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#11AFC1] to-[#42D6C5] text-[#002F5B] font-bold text-xs font-mono uppercase tracking-wider hover:opacity-95 transition-all shadow-md flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Transmitting Signals...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Run Live Simulation</span>
            </>
          )}
        </button>
      </div>

      {/* Dynamic Visual Pipeline Steps */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {scenario.steps.map((step, idx) => {
          const isPassed = currentStep > idx;
          const isCurrent = currentStep === idx && isRunning;

          return (
            <div
              key={step.node}
              className={`p-5 rounded-2xl border transition-all duration-500 space-y-3 flex flex-col justify-between ${
                isPassed
                  ? 'bg-[#002F5B]/80 border-[#42D6C5] shadow-[0_0_20px_rgba(66,214,197,0.25)]'
                  : isCurrent
                  ? 'bg-[#002F5B] border-[#11AFC1] ring-2 ring-[#42D6C5]/50 animate-pulse'
                  : 'bg-black/30 border-white/10 opacity-70'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                    {getIcon(step.icon)}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">STEP 0{idx + 1}</span>
                </div>

                <div className="text-sm font-bold text-white tracking-tight">{step.node}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{step.action}</p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                <span className={isPassed ? 'text-[#42D6C5] font-bold' : 'text-slate-400'}>
                  {step.status}
                </span>
                {isPassed && <CheckCircle2 className="w-4 h-4 text-[#42D6C5]" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
