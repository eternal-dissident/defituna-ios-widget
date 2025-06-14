// DeFiTuna Position Widget for Scriptable

// --- CONFIGURATION ---
// PASTE YOUR SOLANA WALLET ADDRESS HERE
const SOLANA_WALLET_ADDRESS = "YOUR_SOLANA_WALLET_ADDRESS_HERE"; // Replace with your actual wallet address

// --- WIDGET CODE ---
async function createWidget() {
    const widget = new ListWidget();
    widget.backgroundColor = new Color("#1C1C1E");
    widget.setPadding(14, 14, 14, 14);

    try {
        const positionData = await fetchPositionData(SOLANA_WALLET_ADDRESS);

        if (!positionData) {
            const errorText = widget.addText("Could not load data. Check wallet address or network.");
            errorText.centerAlignText();
            errorText.textColor = Color.white();
            return widget;
        }

        // --- Title and Status ---
        const titleStack = widget.addStack();
        titleStack.layoutHorizontally();
        titleStack.centerAlignContent();

        const poolText = titleStack.addText("SOL / USDC");
        poolText.font = Font.boldSystemFont(16);
        poolText.textColor = Color.white();

        titleStack.addSpacer();

        const statusPill = titleStack.addStack();
        statusPill.setPadding(3, 5, 3, 5);
        statusPill.backgroundColor = new Color("#30D158");
        statusPill.cornerRadius = 4;

        const statusText = statusPill.addText(positionData.state.toUpperCase());
        statusText.font = Font.semiboldSystemFont(12);
        statusText.textColor = Color.white();

        widget.addSpacer(8);

        // --- Key Metrics ---
        const pnlPercent = positionData.pnl.bps / 100;
        const pnlPercentString = `${pnlPercent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;

        addRow(widget, "Collateral", formatCurrency(positionData.deposited_collateral_usd.amount));
        addRow(widget, "Debt", formatCurrency(positionData.loan_funds_a.usd + positionData.loan_funds_b.usd));
        addRow(widget, "Compounded Yield", formatCurrency(positionData.compounded_yield_a.usd + positionData.compounded_yield_b.usd));
        addRow(widget, "PnL", `${formatCurrency(positionData.pnl.usd)} (${pnlPercentString})`, positionData.pnl.usd >= 0 ? new Color("#30D158") : new Color("#FF453A"));

        widget.addSpacer();

        // --- Time ---
        const timeLabel = widget.addText(`Opened ${formatTimeAgo(new Date(positionData.opened_at))}`);
        timeLabel.font = Font.regularSystemFont(10);
        timeLabel.textColor = new Color("#8E8E93");
        timeLabel.rightAlignText();

    } catch (error) {
        console.error(error);
        const errorText = widget.addText("Error loading widget.");
        errorText.centerAlignText();
        errorText.textColor = Color.white();
    }

    const now = new Date();
    widget.refreshAfterDate = new Date(now.getTime() + 60 * 1000);

    return widget;
}

// Function to add a labeled row to the widget
function addRow(widget, label, value, valueColor = Color.white()) {
    const stack = widget.addStack();
    stack.layoutHorizontally();
    stack.centerAlignContent();

    const labelText = stack.addText(label);
    labelText.font = Font.mediumSystemFont(12);
    labelText.textColor = new Color("#8E8E93");

    stack.addSpacer();

    const valueText = stack.addText(String(value));
    valueText.font = Font.semiboldSystemFont(14);
    valueText.textColor = valueColor;

    widget.addSpacer(4);
}

// Fetch data from DeFiTuna API
async function fetchPositionData(wallet) {
    const positionUrl = `https://api.defituna.com/api/v1/users/${wallet}/tuna-positions`;
    try {
        const req = new Request(positionUrl);
        const res = await req.loadJSON();
        const position = res.data[0];

        if (!position) return null;

        return position;
    } catch (e) {
        console.error(`Failed to fetch data: ${e}`);
        return null;
    }
}

// --- FORMATTING HELPERS ---
function formatCurrency(amount) {
    if (amount === undefined || amount === null) return "$0.00";
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}

// --- SCRIPT EXECUTION ---
const widget = await createWidget();

if (config.runsInWidget) {
    Script.setWidget(widget);
} else {
    widget.presentMedium();
}

Script.complete();
