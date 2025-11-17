# Creator Coin App ($BOOMCHAINLABS)

A Next.js Web3 dApp for the **$BOOMCHAINLABS token** on Base/Zora. The app provides live token stats, interactive charts, tokenomics, roadmap, social links, and a **daily reward claiming system** for logged-in users.

---

## Features

- **Live Token Stats**: Price, 24h change, holders, volume, ATH.  
- **Wallet Integration**: Connect/Disconnect MetaMask or other Ethereum wallets.  
- **Tokenomics & Roadmap**: Supply, liquidity, community rewards, and project phases.  
- **Daily Reward System**: Claim $BOOMCHAINLABS tokens by logging in daily.  
- **CTA Buttons**: GeckoTerminal, Trade on Zora, View Chart.  
- **Social Links**: Twitter & Zora profile.  
- **Modern UI**: Animated gradients, hover effects, and responsive design.  
- **Reward Extensions**: Optional streak bonuses, referral rewards, and loyalty multipliers.

---

## Project Structure
creator-coin-app/
├─ components/
│  └─ DailyReward.js      # Component to claim daily rewards
├─ pages/
│  └─ index.js            # Main application page
├─ abi/
│  └─ TokenABI.json       # ERC-20 ABI including claim() function
├─ styles/
│  └─ globals.css         # Tailwind or custom styles
├─ public/
│  └─ favicon.ico
├─ .env                   # Environment variables
├─ .gitignore
├─ package.json
├─ README.md


---

## Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xcd96b6aded93fb64c295bdba10865765f5e7acbe
NEXT_PUBLIC_GECKO_URL=https://www.geckoterminal.com/base/pools/0xcd96b6aded93fb64c295bdba10865765f5e7acbe
NEXT_PUBLIC_TWITTER_URL=https://x.com/boomchainlab?s=21
NEXT_PUBLIC_ZORA_URL=https://zora.co/@boomchainlabs
NEXT_PUBLIC_REWARD_CONTRACT_ADDRESS=0xcd96b6aded93fb64c295bdba10865765f5e7acbe


Installation & Development
	1.	Clone the repository
git clone https://github.com/BoomchainLabs/creator-coin-app.git
cd creator-coin-app


	2.	Install dependencies
npm install


3.	Start the development server
npm run dev



Open http://localhost:3000￼ in your browser.


Daily Reward System
	•	Users can claim daily $BOOMCHAINLABS tokens by connecting their wallet and clicking the Claim Reward button.
	•	Uses NEXT_PUBLIC_REWARD_CONTRACT_ADDRESS to interact with the reward token contract.
	•	Rewards reset every 24 hours to encourage daily engagement.
	•	Optional reward extensions:
	•	Streak Bonus: Increase reward if user claims multiple days in a row.
	•	Referral Bonus: Users earn extra tokens for inviting friends.
	•	Loyalty Multiplier: Higher rewards for long-term holders.
	•	The DailyReward.js component handles smart contract interactions and wallet connection.

⸻

Deployment

0v.dev
	1.	Zip the project folder.
	2.	Upload the ZIP to 0v.dev￼.
	3.	Set the environment variables in the platform dashboard.

Vercel
vercel



Configure the same environment variables in Vercel.

⸻

Usage
	•	Connect your wallet to view live stats and claim daily rewards.
	•	Use GeckoTerminal or Trade on Zora buttons for token trading.
	•	View Chart displays historical performance.
	•	Explore Tokenomics and Roadmap sections for project updates.
	•	Daily login rewards incentivize consistent engagement.

⸻

Social Links
	•	Twitter: https://x.com/boomchainlab?s=21￼
	•	Zora: https://zora.co/@boomchainlabs￼

⸻

License

MIT License © 2025 BoomchainLabs
This single file covers **everything**, including:  

- Full project overview and features  
- Folder structure  
- Environment variable setup  
- Local development instructions  
- Daily reward claiming system + optional extensions  
- Deployment instructions for 0v.dev and Vercel  
- Usage guide and social links  
