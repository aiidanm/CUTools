import React, { useState, useMemo } from 'react';


const AdverseCreditCategory = ({ title, placeholder, value, onChange, stats, theme }) => {

    return (
        <div className={`adverse-credit-category theme-${theme}`}>
            <h2 className="category-title">{title}</h2>
            <div className="stats-box">
                <div>
                    <span className="font-medium">Count:</span>
                    <span className="font-bold">{stats.count}</span>
                </div>
                <div>
                    <span className="font-medium">Sum:</span>
                    <span className="font-bold">£{stats.sum.toLocaleString()}</span>
                </div>
            </div>
            <label htmlFor={`${title}-input`} className="textarea-label">
                Enter amounts (one per line):
            </label>
            <textarea
                id={`${title}-input`}
                rows="5"
                className="textarea-input"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

// Main CreditSummary Component
function CreditSummary() {
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
        <div className="app-container credit-summary">
                <div className="calculator-card">
                    <header>
                        <h1>Debt Summary Calculator</h1>
                        <p>Enter amounts to see a real-time summary.</p>
                    </header>

                    <div className="input-group">
                        <label htmlFor="total-debt" className="input-label">Total Debt Amount (£)</label>
                        <input
                            type="number"
                            id="total-debt"
                            placeholder="e.g., 911"
                            className="number-input"
                            value={debtInputs.totalDebt}
                            onChange={(e) => handleInputChange(e, 'totalDebt')}
                        />
                    </div>

                    <div className="grid-container">
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

                    <div className="summary-container">
                        <h3>Generated Summary</h3>
                        <div className="summary-input-wrapper">
                            <input id="output-string" type="text" readOnly value={summaryString} className="summary-input" />
                            <button onClick={handleCopyToClipboard} className="copy-button">
                                Copy
                            </button>
                        </div>
                        <div className="copy-feedback">
                            {copyFeedback}
                        </div>
                    </div>

                </div>
        </div>
    );
}

export default CreditSummary;
