import { useState } from "react";
import { Brain, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export function AnomalyExplanation({ anomaly }) {
    const [explanation, setExplanation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getExplanation = async () => {
        setLoading(true);
        setError(null);

        try {
            const { data, error: fnError } = await supabase.functions.invoke('explain-anomaly', {
                body: {
                    anomaly: {
                        type: anomaly.type,
                        description: anomaly.description,
                        anomalyScore: anomaly.anomalyScore,
                        severity: anomaly.severity,
                        features: anomaly.features,
                        userName: anomaly.userName,
                    }
                }
            });

            if (fnError) throw fnError;
            setExplanation(data.explanation);
        } catch (err) {
            console.error('Error getting explanation:', err);
            setError('Failed to generate explanation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
                <Brain className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">AI-Powered Explanation</h3>
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">ML</span>
            </div>

            {!explanation && !loading && (
                <div className="text-center py-8">
                    <Sparkles className="h-12 w-12 text-primary/40 mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                        Get an AI-powered explanation of why this activity was flagged as anomalous
                    </p>
                    <Button onClick={getExplanation} className="gap-2">
                        <Brain className="h-4 w-4" />
                        Generate Explanation
                    </Button>
                </div>
            )}

            {loading && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-3 text-muted-foreground">Analyzing anomaly patterns...</span>
                </div>
            )}

            {error && (
                <div className="bg-danger/10 border border-danger/20 rounded-lg p-4 text-danger">
                    {error}
                    <Button variant="outline" size="sm" className="mt-2" onClick={getExplanation}>
                        Retry
                    </Button>
                </div>
            )}

            {explanation && (
                <div className="space-y-4">
                    <div className="prose prose-invert max-w-none">
                        <div className="bg-muted/30 rounded-lg p-4 border border-border">
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{explanation}</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={getExplanation}>
                        Regenerate
                    </Button>
                </div>
            )}
        </div>
    );
}
