import { useState, useEffect, useCallback, useRef } from "react";
import { Shield, Target, Zap, Lock, AlertTriangle, Terminal, ChevronRight } from "lucide-react";

interface Node {
    id: number;
    x: number;
    y: number;
    isNeutralized: boolean;
    type: 'core' | 'buffer' | 'cache';
}

type Stage = 'intro' | 'game' | 'cleared';

const INTRO_TEXT = [
    "INITIALIZING AMMY_PROJECT_v2...",
    "USER_IDENTIFIED: VISITOR",
    "CORE_OBJECTIVE: LOCATE_AND_NEUTRALIZE_SECURITY_FRAGMENTS",
    "THREAT_LEVEL: ELEVATED",
    "DECRYPTION_PROTOCOL: TERMINATE 3 INTERFERENCE NODES TO GAIN ACCESS.",
    "SYNC_INITIATED..."
];

export const SmokeOverlay = ({ onClear }: { onClear?: () => void }) => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [stage, setStage] = useState<Stage>('intro');
    const [reticlePos, setReticlePos] = useState({ x: 0, y: 0 });
    const [neutralizedCount, setNeutralizedCount] = useState(0);
    const [introIndex, setIntroIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

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

    // Initialize random nodes (reduced to 3 for easier gameplay)
    useEffect(() => {
        const newNodes: Node[] = Array.from({ length: 3 }).map((_, i) => ({
            id: i,
            x: 15 + Math.random() * 70, // Slightly wider spread
            y: 15 + Math.random() * 70,
            isNeutralized: false,
            type: i === 0 ? 'core' : i === 1 ? 'buffer' : 'cache'
        }));
        setNodes(newNodes);
    }, []);

    const handleNodeHover = (id: number) => {
        if (stage !== 'game') return;
        setNodes(prev => prev.map(node => {
            if (node.id === id && !node.isNeutralized) {
                setNeutralizedCount(c => {
                    const next = c + 1;
                    if (next === nodes.length) {
                        setTimeout(() => {
                            setStage('cleared');
                            if (onClear) onClear();
                        }, 600);
                    }
                    return next;
                });
                return { ...node, isNeutralized: true };
            }
            return node;
        }));
    };

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        setReticlePos({ x: e.clientX, y: e.clientY });
    }, []);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className={`fixed inset-0 z-[99999] flex items-center justify-center cursor-none transition-all duration-1000 ${stage === 'cleared' ? "animate-clear-smoke pointer-events-none" : "smoke-glass"
                }`}
        >
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

            {/* Stage: Intro */}
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

            {/* Stage: Game */}
            {stage === 'game' && (
                <>
                    {/* Interference Nodes */}
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

                    {/* Central UI (Game Mode) */}
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
                        opacity: Math.random() * 0.4
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
