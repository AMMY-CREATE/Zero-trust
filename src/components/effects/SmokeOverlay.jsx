import { useState, useEffect, useCallback, useRef } from "react";
import { Shield, Target, Zap, Lock, AlertTriangle, Terminal, ChevronRight } from "lucide-react";

/**
 * Enhanced SmokeOverlay component.
 * Implements progressive glass cracking and shattering effect.
 */
const INTRO_TEXT = [
    "INITIALIZING ZERO_TRUST_SYSTEM_v2...",
    "USER_IDENTIFIED: VISITOR",
    "CORE_OBJECTIVE: LOCATE_AND_NEUTRALIZE_SECURITY_FRAGMENTS",
    "THREAT_LEVEL: ELEVATED",
    "DECRYPTION_PROTOCOL: TERMINATE 4 INTERFERENCE NODES TO GAIN ACCESS.",
    "SYNC_INITIATED..."
];

export const SmokeOverlay = ({ onClear }) => {
    const [nodes, setNodes] = useState([]);
    const [stage, setStage] = useState('intro');
    const [reticlePos, setReticlePos] = useState({ x: 0, y: 0 });
    const [neutralizedCount, setNeutralizedCount] = useState(0);
    const [introIndex, setIntroIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isShattering, setIsShattering] = useState(false);
    const containerRef = useRef(null);
    const progress = nodes.length > 0 ? (neutralizedCount / nodes.length) * 100 : 0;

    // Terminal Typewriter Logic
    useEffect(() => {
        if (stage !== 'intro') return;

        if (introIndex < INTRO_TEXT.length) {
            if (charIndex < INTRO_TEXT[introIndex].length) {
                const timer = setTimeout(() => setCharIndex(charIndex + 1), 30);
                return () => clearTimeout(timer);
            } else {
                const timer = setTimeout(() => {
                    setIntroIndex(introIndex + 1);
                    setCharIndex(0);
                }, 500);
                return () => clearTimeout(timer);
            }
        }
    }, [stage, introIndex, charIndex]);

    // Initialize random nodes (4 nodes for 25% granularity)
    useEffect(() => {
        const newNodes = Array.from({ length: 4 }).map((_, i) => ({
            id: i,
            x: 15 + Math.random() * 70,
            y: 15 + Math.random() * 70,
            isNeutralized: false,
            type: i === 0 ? 'core' : i === 1 ? 'buffer' : i === 2 ? 'cache' : 'core'
        }));
        setNodes(newNodes);
    }, []);

    const handleNodeHover = (id) => {
        if (stage !== 'game' || isShattering) return;
        setNodes(prev => prev.map(node => {
            if (node.id === id && !node.isNeutralized) {
                setNeutralizedCount(c => {
                    const next = c + 1;
                    if (next === nodes.length) {
                        setIsShattering(true);
                        setTimeout(() => {
                            setStage('cleared');
                            if (onClear) onClear();
                        }, 1200);
                    }
                    return next;
                });
                return { ...node, isNeutralized: true };
            }
            return node;
        }));
    };

    const handleMouseMove = useCallback((e) => {
        setReticlePos({ x: e.clientX, y: e.clientY });
    }, []);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className={`fixed inset-0 z-[99999] flex items-center justify-center cursor-none transition-all duration-1000 ${stage === 'cleared' ? "animate-clear-smoke pointer-events-none" : "smoke-glass"} ${isShattering ? 'shattering' : ''}`}
        >
            {/* Glass Cracks SVG - Progressive reveal */}
            <div className={`glass-crack ${progress >= 25 ? 'visible' : ''}`}>
                <svg viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 0 8px rgba(var(--primary-rgb), 0.4))' }}>
                    {/* 25% Cracks */}
                    <path d="M50 50 L40 30 M50 50 L60 35 M50 50 L45 70 M50 50 L65 60" stroke="rgba(var(--primary-rgb), 0.6)" strokeWidth="0.5" />
                    {/* 50% More Cracks */}
                    {progress >= 50 && (
                        <path d="M40 30 L20 25 M60 35 L80 40 M45 70 L30 85 M65 60 L85 75 M40 30 L35 15 M60 35 L65 20" stroke="rgba(var(--primary-rgb), 0.5)" strokeWidth="0.3" />
                    )}
                    {/* 75% Full Screen Cracks */}
                    {progress >= 75 && (
                        <path d="M20 25 L5 10 M80 40 L95 45 M30 85 L15 95 M85 75 L95 85 M35 15 L25 5 M65 20 L75 5 M15 95 L5 80" stroke="rgba(var(--primary-rgb), 0.4)" strokeWidth="0.2" />
                    )}
                </svg>
            </div>

            {/* Shards for shattering animation */}
            {isShattering && (
                <div className="shatter-overlay">
                    {[...Array(24)].map((_, i) => (
                        <div
                            key={i}
                            className="shard"
                            style={{
                                width: `${Math.random() * 120 + 40}px`,
                                height: `${Math.random() * 120 + 40}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                '--tx': `${(Math.random() - 0.5) * 1200}px`,
                                '--ty': `${(Math.random() - 0.5) * 1200}px`,
                                '--tr': `${Math.random() * 720}deg`,
                                transitionDelay: `${Math.random() * 0.2}s`
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Custom Scanner Reticle */}
            {stage !== 'cleared' && (
                <div
                    className="scanner-reticle"
                    style={{ left: reticlePos.x - 40, top: reticlePos.y - 40 }}
                >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-mono text-primary uppercase tracking-tighter">
                        {stage === 'intro' ? 'SCANNER_STBY' : 'SCANNER_ACTV'} [x:{Math.round(reticlePos.x)} y:{Math.round(reticlePos.y)}]
                    </div>
                </div>
            )}


            {stage === 'intro' && (
                <div className="w-full max-w-2xl px-8 z-[100001]">
                    <div className="bg-black/80 border border-primary/30 p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                        <div className="flex items-center gap-2 mb-6 text-primary">
                            <Terminal className="h-4 w-4" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em]">System_Authorization_Protocol</span>
                        </div>

                        <div className="space-y-3 mb-10 min-h-[160px]">
                            {INTRO_TEXT.slice(0, introIndex).map((line, i) => (
                                <div key={i} className="terminal-text text-sm flex gap-3">
                                    <ChevronRight className="h-4 w-4 flex-shrink-0 mt-1 opacity-50" />
                                    <span>{line}</span>
                                </div>
                            ))}
                            {introIndex < INTRO_TEXT.length && (
                                <div className="terminal-text text-sm flex gap-3">
                                    <ChevronRight className="h-4 w-4 flex-shrink-0 mt-1 opacity-50" />
                                    <span className="typing-cursor">{INTRO_TEXT[introIndex].slice(0, charIndex)}</span>
                                </div>
                            )}
                        </div>

                        {introIndex >= INTRO_TEXT.length && (
                            <button
                                onClick={() => setStage('game')}
                                className="group relative w-full py-4 bg-primary/10 border border-primary/40 hover:bg-primary/20 transition-all duration-300"
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-primary font-mono text-xs uppercase tracking-[0.5em] group-hover:tracking-[0.6em] transition-all">Initiate_Handshake</span>
                                </div>
                                <div className="h-full w-0 bg-primary/20 group-hover:w-full transition-all duration-500 absolute left-0 top-0" />
                            </button>
                        )}
                    </div>
                </div>
            )}


            {stage === 'game' && (
                <>

                    {nodes.map((node) => (
                        <div
                            key={node.id}
                            className={`threat-node ${node.isNeutralized ? 'neutralized' : ''}`}
                            style={{ left: `${node.x}%`, top: `${node.y}%` }}
                            onMouseEnter={() => handleNodeHover(node.id)}
                            onClick={() => handleNodeHover(node.id)}
                        >
                            {node.type === 'core' ? <Shield className="h-6 w-6 text-primary" /> :
                                node.type === 'buffer' ? <Zap className="h-6 w-6 text-primary" /> :
                                    <Target className="h-6 w-6 text-primary" />}

                            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-mono text-primary/60 uppercase">
                                {node.type}_node_0x0{node.id}
                            </div>
                        </div>
                    ))}


                    <div className="text-center relative z-[100001] transition-all duration-700 pointer-events-none">
                        <div className="mb-8 relative">
                            <div className="w-32 h-32 border border-primary/20 rounded-full mx-auto flex items-center justify-center">
                                <div className="absolute inset-0 border-2 border-primary/10 rounded-full animate-pulse" />
                                <AlertTriangle className="h-8 w-8 text-primary animate-pulse" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-primary font-black text-3xl tracking-[15px] uppercase">NEUTRALIZE</h2>
                            <p className="text-primary/60 font-mono text-[10px] uppercase tracking-[0.4em]">
                                Locate_{nodes.length - neutralizedCount}_fragments_remaining
                            </p>
                        </div>

                        <div className="mt-12 w-64 h-[2px] bg-white/5 mx-auto relative overflow-hidden">
                            <div
                                className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary),1)] transition-all duration-500 ease-out"
                                style={{ width: `${(neutralizedCount / nodes.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </>
            )}

            {/* Smoke Particles */}
            {stage !== 'cleared' && [...Array(15)].map((_, i) => (
                <div
                    key={i}
                    className="smoke-particle"
                    style={{
                        width: `${Math.random() * 600 + 300}px`,
                        height: `${Math.random() * 600 + 300}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 15}s`,
                        opacity: Math.random() * 0.3
                    }}
                />
            ))}

            {/* Decorative Info (Bottom Left) */}
            {stage !== 'cleared' && (
                <div className="absolute bottom-8 left-8 font-mono text-[8px] text-primary/30 uppercase space-y-1">
                    <div>User: Ammy_Project</div>
                    <div>Session: {stage.toUpperCase()}</div>
                    <div>Encryption: AES-256_OVERRIDE</div>
                </div>
            )}
        </div>
    );
};
