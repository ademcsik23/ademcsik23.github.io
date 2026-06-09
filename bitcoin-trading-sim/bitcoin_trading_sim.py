import pandas as pd
import numpy as np

def simulate_bitcoin_prices(days=60, initial_price=60000, mu=0.01, sigma=0.08):
    """
    Simulates Bitcoin price data using Geometric Brownian Motion.
    """
    np.random.seed(1)  # For reproducibility
    returns = np.random.normal(mu - 0.5 * sigma**2, sigma, days)
    price_path = initial_price * np.exp(np.cumsum(returns))
    # Prepend the initial price to have a full 'days' length or
    # just use the price path. Let's make it exactly 'days' long.
    return price_path

def run_simulation():
    days = 60
    prices = simulate_bitcoin_prices(days)

    df = pd.DataFrame({
        'Day': range(1, days + 1),
        'Price': prices
    })

    # Calculate Moving Averages
    df['MA7'] = df['Price'].rolling(window=7).mean()
    df['MA30'] = df['Price'].rolling(window=30).mean()

    # Trading Strategy Parameters
    initial_cash = 10000.0
    cash = initial_cash
    btc_held = 0.0

    ledger = []

    for i in range(len(df)):
        day = int(df.iloc[i]['Day'])
        price = df.iloc[i]['Price']
        ma7 = df.iloc[i]['MA7']
        ma30 = df.iloc[i]['MA30']

        action = "HOLD"

        # Golden Cross Strategy
        # We need both MAs to be available
        if not np.isnan(ma7) and not np.isnan(ma30):
            if ma7 > ma30 and btc_held == 0:
                # BUY
                btc_held = cash / price
                cash = 0
                action = "BUY"
            elif ma7 < ma30 and btc_held > 0:
                # SELL
                cash = btc_held * price
                btc_held = 0
                action = "SELL"

        total_value = cash + (btc_held * price)

        ledger.append({
            'Day': day,
            'Price': price,
            'MA7': ma7,
            'MA30': ma30,
            'Action': action,
            'Cash': cash,
            'BTC': btc_held,
            'Total Value': total_value
        })

    ledger_df = pd.DataFrame(ledger)

    print("--- Daily Trading Ledger ---")
    print(ledger_df.to_string(index=False, formatters={
        'Price': '{:,.2f}'.format,
        'MA7': '{:,.2f}'.format,
        'MA30': '{:,.2f}'.format,
        'Cash': '{:,.2f}'.format,
        'BTC': '{:,.4f}'.format,
        'Total Value': '{:,.2f}'.format
    }))

    final_value = ledger[-1]['Total Value']
    performance = ((final_value - initial_cash) / initial_cash) * 100

    print("\n--- Final Performance ---")
    print(f"Initial Portfolio Value: ${initial_cash:,.2f}")
    print(f"Final Portfolio Value:   ${final_value:,.2f}")
    print(f"Total Return:            {performance:.2f}%")

if __name__ == "__main__":
    run_simulation()
