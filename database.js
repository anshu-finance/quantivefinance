const projectData = [
    // --- EQUITY REPORTS ---
    {
        category: "equity",
        title: "APL Apollo Tubes Ltd",
        status: "Valuation & Risk",
        desc: "Comprehensive analysis including DCF, Relative Valuation, and Monte-Carlo simulation. Stock currently trading at a premium.",
        pdf: "APL_Apollo_Report.pdf",
        metrics: [
            { label: "P/E Ratio", value: "55.9x" },
            { label: "5Y Avg ROE", value: "18.53%" },
            { label: "DCF Value", value: "₹514.75" },
            { label: "Verdict", value: "2.07x Premium", highlight: true }
        ]
    },
    {
        category: "equity",
        title: "Dabur India Ltd.",
        status: "DCF & Relative Pricing",
        desc: "10-year financial analysis and valuation model. Stock trading at significant premium to intrinsic value.",
        pdf: "Dabur India Ltd. Financial Report-1.pdf",
        metrics: [
            { label: "P/E Ratio", value: "51.58x" },
            { label: "ROE", value: "16.11%" },
            { label: "DCF Value", value: "₹135.03" },
            { label: "Verdict", value: "2.73x Premium", highlight: true }
        ]
    },
    {
        category: "equity",
        title: "Caplin Point Laboratories",
        status: "Healthcare Sector",
        desc: "High growth healthcare valuation. Noted massive divergence between DCF value and market price.",
        pdf: "Caplin Point Lab Financial Report-1.pdf",
        metrics: [
            { label: "P/E Ratio", value: "28.09x" },
            { label: "Growth", value: "20.77%" },
            { label: "DCF Value", value: "₹806.57" },
            { label: "Verdict", value: "1.49x Premium", highlight: true }
        ]
    },

    // --- MUTUAL FUND REPORTS ---
    {
        category: "mf",
        title: "SBI Focused Equity Fund",
        status: "Multi-Cap / High Risk",
        desc: "Assessment of a multi-cap, high-conviction fund strategy. Analysis confirms a high P/E ratio and concentration risk.",
        pdf: "SBI Focused Equity Fund_ Performance & Analysis Report.pdf",
        metrics: [
            { label: "10Y CAGR", value: "12.81%" },
            { label: "P/E Ratio", value: "20.7x" },
            { label: "Beta", value: "0.72%" },
            { label: "Top Sector", value: "33.90%", highlight: true }
        ]
    },
    {
        category: "mf",
        title: "Nippon India Growth Fund",
        status: "Mid-Cap / Moderately High Risk",
        desc: "Review of a mid-cap focused fund. Analysis compares its volatility and return against Nifty Midcap 150 - TRI.",
        pdf: "Nippon India Growth Fund Analysis & Performance Review.pdf",
        metrics: [
            { label: "5Y CAGR", value: "24.07%" },
            { label: "P/E Ratio", value: "24.3x" },
            { label: "Beta", value: "0.93%" },
            { label: "Top Sector", value: "21.77%" }
        ]
    },

    // --- IPO REPORTS ---
    {
        category: "ipo",
        title: "IPO Analysis Framework",
        status: "Methodology",
        desc: "Standard framework for analyzing DRHP, Grey Market trends, and Financial health.",
        // No PDF for this generic card, or add one if needed
        pdf: "#", 
        metrics: [
            { label: "Focus", value: "Litigation" },
            { label: "Check", value: "Promoter Hold" },
            { label: "Issue Type", value: "OFS vs Fresh" },
            { label: "Moat", value: "Peer Gap" }
        ]
    }
];
