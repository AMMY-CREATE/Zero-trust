import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { anomaly } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Generating explanation for anomaly:', anomaly.type);

    const systemPrompt = `You are a cybersecurity AI analyst specializing in Zero-Trust security and anomaly detection. 
You explain detected anomalies in clear, concise language suitable for security professionals. 
Focus on:
1. Why this behavior was flagged as anomalous
2. The potential security implications
3. Recommended actions
Keep explanations professional but accessible, around 150-200 words.`;

    const userPrompt = `Analyze this security anomaly and provide an explanation:

Anomaly Type: ${anomaly.type}
Description: ${anomaly.description}
Severity: ${anomaly.severity}
Anomaly Score: ${(anomaly.anomalyScore * 100).toFixed(1)}%
User: ${anomaly.userName}

Feature Weights:
${Object.entries(anomaly.features || {}).map(([k, v]) => `- ${k}: ${((v as number) * 100).toFixed(0)}%`).join('\n')}

Explain why this activity was detected as anomalous by the Isolation Forest ML model and what actions should be taken.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('Failed to generate explanation');
    }

    const data = await response.json();
    const explanation = data.choices[0].message.content;

    console.log('Explanation generated successfully');

    return new Response(JSON.stringify({ explanation }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in explain-anomaly function:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
