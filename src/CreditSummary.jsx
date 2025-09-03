import React, { useState, useMemo } from 'react';

const AdverseCreditCategory = ({ title, placeholder, value, onChange, stats, theme }) => {
    const themeClasses = {
        bg: `bg-${theme}-50`,
        text: `text-${theme}-800`,
        ring: `focus:ring-${theme}-500`,
        border: `focus:border-${theme}-500`,
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>
            <div className={`flex justify-between items-center ${themeClasses.bg} ${themeClasses.text} p-3 rounded-lg mb-3`}>
                <div>
                    <span className="font-medium">Count:</span>
                    <span className="font-bold ml-1">{stats.count}</span>
                </div>
                <div>
                    <span className="font-medium">Sum:</span>
                    <span className="font-bold ml-1">£{stats.sum.toLocaleString()}</span>
                </div>
            </div>
            <label htmlFor={`${title}-input`} className="block text-sm font-medium text-gray-600 mb-1">
                Enter amounts (one per line):
            </label>
            <textarea
                id={`${title}-input`}
                rows="5"
                className={`w-full p-2 border border-gray-300 rounded-md transition ${themeClasses.ring} ${themeClasses.border}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

// Main App Component
export default function CreditSummary() {
    const [debtInputs, setDebtInputs] = useState({
        totalDebt: '',
        defaults: '',
        delinquencies: '',
        arrears: '',
        ccjs: ''
    });
    const [copyFeedback, setCopyFeedback] = useState('');

    // Memoized calculation function to avoid re-calculating on every render
    const calculateStats = (text) => {
        if (!text) return { count: 0, sum: 0 };
        const numbers = text
            .split('\n')
            .map(line => parseFloat(line.trim()))
            .filter(num => !isNaN(num) && num > 0);
        const count = numbers.length;
        const sum = numbers.reduce((acc, val) => acc + val, 0);
        return { count, sum };
    };

    // Use useMemo to derive stats from inputs
    const defaultsStats = useMemo(() => calculateStats(debtInputs.defaults), [debtInputs.defaults]);
    const delinquenciesStats = useMemo(() => calculateStats(debtInputs.delinquencies), [debtInputs.delinquencies]);
    const arrearsStats = useMemo(() => calculateStats(debtInputs.arrears), [debtInputs.arrears]);
    const ccjsStats = useMemo(() => calculateStats(debtInputs.ccjs), [debtInputs.ccjs]);

    // Generate the final summary string, also memoized
    const summaryString = useMemo(() => {
        const parts = [];
        const totalDebtNum = parseFloat(debtInputs.totalDebt);
        if (!isNaN(totalDebtNum) && totalDebtNum > 0) parts.push(`TD=£${totalDebtNum.toLocaleString()}`);
        if (defaultsStats.count > 0) parts.push(`${defaultsStats.count}xDEF=£${defaultsStats.sum.toLocaleString()}`);
        if (delinquenciesStats.count > 0) parts.push(`${delinquenciesStats.count}xDEL=£${delinquenciesStats.sum.toLocaleString()}`);
        if (arrearsStats.count > 0) parts.push(`${arrearsStats.count}xARR=£${arrearsStats.sum.toLocaleString()}`);
        if (ccjsStats.count > 0) parts.push(`${ccjsStats.count}xCCJ=£${ccjsStats.sum.toLocaleString()}`);
        return parts.join(', ');
    }, [debtInputs.totalDebt, defaultsStats, delinquenciesStats, arrearsStats, ccjsStats]);

    const handleInputChange = (e, field) => {
        setDebtInputs(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleCopyToClipboard = () => {
        if (!summaryString) return;
        
        // Using document.execCommand for broader compatibility in sandboxed environments
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = summaryString;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        try {
            document.execCommand('copy');
            setCopyFeedback('Copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
            setCopyFeedback('Failed to copy!');
        }
        document.body.removeChild(tempTextArea);
        
        setTimeout(() => setCopyFeedback(''), 2000);
    };

    return (
        <div className="bg-gray-100 text-gray-800 flex items-center justify-center min-h-screen p-4 font-sans">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
                <header className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Debt Summary Calculator</h1>
                    <p className="text-gray-600 mt-1">Enter amounts to see a real-time summary.</p>
                </header>

                <div className="space-y-2">
                    <label htmlFor="total-debt" className="text-lg font-semibold text-gray-700">Total Debt Amount (£)</label>
                    <input
                        type="number"
                        id="total-debt"
                        placeholder="e.g., 911"
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        value={debtInputs.totalDebt}
                        onChange={(e) => handleInputChange(e, 'totalDebt')}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AdverseCreditCategory
                        title="Defaults (DEF)"
                        placeholder="1231&#10;12&#10;31"
                        value={debtInputs.defaults}
                        onChange={(e) => handleInputChange(e, 'defaults')}
                        stats={defaultsStats}
                        theme="blue"
                    />
                    <AdverseCreditCategory
                        title="Delinquencies (DEL)"
                        placeholder="100"
                        value={debtInputs.delinquencies}
                        onChange={(e) => handleInputChange(e, 'delinquencies')}
                        stats={delinquenciesStats}
                        theme="green"
                    />
                    <AdverseCreditCategory
                        title="Arrears (ARR)"
                        placeholder="200"
                        value={debtInputs.arrears}
                        onChange={(e) => handleInputChange(e, 'arrears')}
                        stats={arrearsStats}
                        theme="yellow"
                    />
                    <AdverseCreditCategory
                        title="CCJs"
                        placeholder="300"
                        value={debtInputs.ccjs}
                        onChange={(e) => handleInputChange(e, 'ccjs')}
                        stats={ccjsStats}
                        theme="red"
                    />
                </div>

                <div className="bg-gray-800 text-white rounded-xl p-5 space-y-3">
                    <h3 className="text-lg font-semibold">Generated Summary</h3>
                    <div className="relative">
                        <input id="output-string" type="text" readOnly value={summaryString} className="w-full bg-gray-700 text-gray-200 font-mono p-3 pr-24 rounded-lg border-2 border-gray-600" />
                        <button onClick={handleCopyToClipboard} className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
                            Copy
                        </button>
                    </div>
                    <div className="text-sm text-green-400 h-4 transition-opacity duration-300 opacity-100">
                        {copyFeedback}
                    </div>
                </div>

            </div>
        </div>
    );
}
