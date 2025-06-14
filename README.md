# **Solana Position Widget for Scriptable**

This repository contains a JavaScript script for the iOS app [Scriptable](https://scriptable.app). It creates a home screen widget to display a summary of your open liquidity pool position on the [DefiTuna](https://defituna.com/) platform on Solana.  
The widget provides a quick, at-a-glance view of your position's key metrics without needing to open a browser.

## **Widget Preview**

![Widget Screenshot](/assets/image.png)

## **Features**

* Displays key metrics for your position: Status, Collateral, Debt, Compounded Yield, PnL, and Age.  
* Refreshes automatically to fetch the latest data from the DeFiTuna API.

## **Installation & Setup**

Follow these steps to get the widget running on your iPhone.

### **Step 1: Install Scriptable**

If you haven't already, download the **Scriptable** app from the App Store.

* [**Download Scriptable from the App Store**](https://apps.apple.com/us/app/scriptable/id1405459188)

### **Step 2: Add the Script**

1. Copy the entire content of the `script.js` file from this repository.  
2. Open the Scriptable app on your iPhone and tap the `+` icon in the top-right to create a new script.  
3. Give the script a name (e.g., "Tuna Position").  
4. Paste the code you copied into the editor.

### **Step 3: Configure Your Wallet Address**

For the widget to display your data, you must add your public Solana wallet address to the script.  
In the script editor in Scriptable, find the following line at the top:

```javascript
const SOLANA_WALLET_ADDRESS = "YOUR_SOLANA_WALLET_ADDRESS_HERE";
```
Replace `YOUR_SOLANA_WALLET_ADDRESS_HERE` with your actual Solana address inside the quotes.

### **Step 4: Add the Widget to Your Home Screen**

1. Go to your iPhone's Home Screen and long-press anywhere to enter "jiggle mode".  
2. Tap the `Edit` icon in the top-left corner.  
3. Search for or scroll down to find **Scriptable**.  
4. Select the **medium-sized** widget and tap **"Add Widget"**.  
5. While the widgets are still jiggling, tap on the newly added Scriptable widget to configure it.  
6. In the configuration menu:  
   * For the **Script** option, choose the script you just created (e.g., "Tuna Position").  
   * For **When Interacting**, select **"Run Script"**.

You're all set! The widget should now be displaying your position data on your Home Screen.

## **Limitations & Future Work**

This script is in an early and primitive stage of development. Please be aware of the following limitations:

* **Only Displays First Position:** The script currently only fetches and displays the *first* open position returned by the API for the given wallet address. It does not yet support viewing multiple positions.  
* **Pool Names:** The pool name is hardcoded to SOL / USDC. The logic to dynamically fetch the correct token symbols from the API needs to be implemented.  
* **Price Range/Limit Orders:** The logic to convert a position's `tick_indexes` into a human-readable price is not yet implemented.
* **Refresh Rate:** The script requests a refresh from iOS every 60 seconds. However, iOS ultimately manages the refresh frequency to optimize battery life, so real-world updates may be less frequent. Tapping the widget will always force an immediate refresh.

## **License**

This project is licensed under the MIT License. See the LICENSE file for details.

## **Disclaimer**

This script is provided for informational purposes only and is not a financial tool. It relies on the public, unofficial API from DeFiTuna. Do not make financial decisions based solely on the data presented in this widget. The author is not responsible for any financial losses or inaccuracies in the data.