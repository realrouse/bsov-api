const path = require('path')
const express = require('express');
const router = express.Router();
const Web3 = require("web3")
const axios = require("axios")

const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/1209a87da88d49e4b201ed55bc6761f6"))
const abi = [{ "constant": true, "inputs": [], "name": "burnPercent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "tokens", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "lastRewardEthBlockNumber", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getMiningDifficulty", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "nonce", "type": "uint256" }, { "name": "challenge_digest", "type": "bytes32" }], "name": "mint", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokens", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "rewardEra", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getMiningTarget", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getMiningReward", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getChallengeNumber", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "maxSupplyForEra", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "tokensMinted", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "lastRewardTo", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "tokenOwner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "acceptOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "nonce", "type": "uint256" }, { "name": "challenge_digest", "type": "bytes32" }, { "name": "challenge_number", "type": "bytes32" }, { "name": "testTarget", "type": "uint256" }], "name": "checkMintSolution", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "epochCount", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_MAXIMUM_TARGET", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "miningTarget", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "challengeNumber", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "nonce", "type": "uint256" }, { "name": "challenge_digest", "type": "bytes32" }, { "name": "challenge_number", "type": "bytes32" }], "name": "getMintDigest", "outputs": [{ "name": "digesttest", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }, { "name": "tokens", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "_BLOCKS_PER_READJUSTMENT", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "lastRewardAmount", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "tokens", "type": "uint256" }, { "name": "data", "type": "bytes" }], "name": "approveAndCall", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "latestDifficultyPeriodStarted", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "newOwner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "tokenAddress", "type": "address" }, { "name": "tokens", "type": "uint256" }], "name": "transferAnyERC20Token", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "_MINIMUM_TARGET", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "tokenOwner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "reward_amount", "type": "uint256" }, { "indexed": false, "name": "epochCount", "type": "uint256" }, { "indexed": false, "name": "newChallengeNumber", "type": "bytes32" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "tokens", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "tokenOwner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "tokens", "type": "uint256" }], "name": "Approval", "type": "event" }]
const URL = 'https://etherscan.io/address/0x26946adA5eCb57f3A1F91605050Ce45c482C9Eb1'
const address = "0x26946adA5eCb57f3A1F91605050Ce45c482C9Eb1" //BSOV contract address
const contract = new web3.eth.Contract(abi, address)
const decimalPlaces = 100000000
const ETHdecimalPlaces = 1000000000000000000
const supply = 21000000
const bigSupply = 2100000000000000
const _ = contract.methods
const parse = input => { return JSON.parse(input) }
const formatted = input => { return parse(input) / decimalPlaces }
const formattedETH = input => { return parse(input) / ETHdecimalPlaces }
module.exports = router;

router.get('/api', (__, res) => {
    _.name().call((__, name) => { 
        _.totalSupply().call((__, totalSupply) => {
	 _._totalSupply().call((__, _totalSupply) => { 
            _.symbol().call((__, symbol) => { 
                _.decimals().call((__, decimals) => { 
                    _._MINIMUM_TARGET().call((__, minimumTarget) => { 
                        _._MAXIMUM_TARGET().call((__, maximumTarget) => { 
                            _.getMiningDifficulty().call((__, difficulty) => { 
                                _.getMiningTarget().call((__, miningTarget) => { 
                                    _.getChallengeNumber().call((__, challengeNumber) => { 
                                        _.epochCount().call((__, epochCount) => { 
                                            _.rewardEra().call((__, rewardEra) => { 
                                                _.maxSupplyForEra().call((__, maxSupplyForEra) => { 
                                                    _._BLOCKS_PER_READJUSTMENT().call((__, blocksPerReadjustment) => { 
                                                        _.latestDifficultyPeriodStarted().call((__, latestDifficultyPeriodStarted) => { 
                                                            _.tokensMinted().call((__, tokensMinted) => { 
                                                                _.lastRewardTo().call((__, lastRewardTo) => { 
                                                                    _.lastRewardAmount().call((__, lastRewardAmount) => { 
                                                                        _.lastRewardEthBlockNumber().call((__, lastRewardEthBlockNumber) => { 
                                                                            _.getMiningReward().call((__, currentMiningReward) => { 
                                                                                web3.eth.getBlockNumber((__, block) => {
										  
										    const frozenURL18 = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x26946adA5eCb57f3A1F91605050Ce45c482C9Eb1&address=0x19E6BF254aBf5ABC925ad72d32bac44C6c03d3a4&tag=latest&apikey=3WU7U7EIMED8U9AYRUNVSPPYGQ7CESGDDP';
    axios.get(frozenURL18).then(function (response) {
											const {result} = response.data
                                                                                    const burn = supply - formatted(totalSupply)
										    const bigBurn = bigSupply - parse(totalSupply)
                                                                                    res.send({
											
                                                                                        name,
                                                                                        symbol,
                                                                                        circulatingSupply: parse(tokensMinted) - bigBurn - result,
                                                                                        circulatingSupplyFormatted: formatted(tokensMinted) - burn - formatted(result),
											TimelockedTokensFormatted: formatted(result),
                                                                                        totalSupply: parse(bigSupply) - burn,
                                                                                        totalSupplyFormatted: formatted(bigSupply) - burn,
                                                                                        maxSupplyFormatted: supply, 
											tokensMinted: parse(tokensMinted),
                                                                                        tokensMintedFormatted: formatted(tokensMinted),
                                                                                        tokensBurned: bigSupply - parse(totalSupply),
                                                                                        tokensBurnedFormatted: burn,
                                                                                        tokensBurnedPercent: burn / supply,
                                                                                        contractURL: URL,
                                                                                        decimals: parse(decimals),
                                                                                        minimumTarget,
                                                                                        maximumTarget,
                                                                                        miningTarget,
                                                                                        difficulty: parse(difficulty),
                                                                                        challengeNumber,
                                                                                        epochCount: parse(epochCount),
                                                                                        rewardEra,
                                                                                        maxSupplyForEra: parse(maxSupplyForEra),
                                                                                        maxSupplyForEraFormatted: formatted(maxSupplyForEra),
                                                                                        blocksPerReadjustment: parse(blocksPerReadjustment),
                                                                                        latestDifficultyPeriodStarted: parse(latestDifficultyPeriodStarted),
                                                                                        lastRewardTo,
                                                                                        lastRewardAmount: parse(lastRewardAmount),
                                                                                        lastRewardAmountFormatted: formatted(lastRewardAmount),
                                                                                        lastRewardEthBlockNumber: parse(lastRewardEthBlockNumber),
                                                                                        currentMiningReward: parse(currentMiningReward),
                                                                                        currentMiningRewardFormatted: formatted(currentMiningReward),
                                                                                        currentEthBlockNumber: block,
                                                                                        apiMainPage: "https://api.bsovtoken.com/"

											})
                                                                                     })
										   }) 
                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
});




router.get('/circulating-text', (__, res) => {
    _.totalSupply().call((__, totalSupply) => { 
        _.tokensMinted().call((__, tokensMinted) => {
            const burn = supply - formatted(totalSupply)
            res.set('text/html').send(
                (formatted(tokensMinted) - burn).toString()
            )
        })
    })
});


router.get('/circulating', (__, res) => {
    _.totalSupply().call((__, totalSupply) => { 
        _.tokensMinted().call((__, tokensMinted) => {
            const burn = supply - formatted(totalSupply)
            res.send({
                circulatingSupply: formatted(tokensMinted) - burn
            })
        })
    })
});

router.get('/totalsupply-text', (__, res) => {
    _.totalSupply().call((__, totalSupply) => { 
        _.tokensMinted().call((__, tokensMinted) => {
            const burn = supply - formatted(totalSupply)
            res.set('text/html').send(
                (formatted(totalSupply) - burn).toString()
            )
        })
    })
});

router.get('/frozen', (__, res) => {
    const frozenURL18 = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x26946adA5eCb57f3A1F91605050Ce45c482C9Eb1&address=0x19E6BF254aBf5ABC925ad72d32bac44C6c03d3a4&tag=latest&apikey=3WU7U7EIMED8U9AYRUNVSPPYGQ7CESGDDP';
    axios.get(frozenURL18).then(function (response) {
        console.log(response.data.result)
        const {result} = response.data
        res.send({
            timeLockedTokens: parse(result),
            timeLockedTokensFormatted: formatted(result)
        })
    })
});

 router.get('/liquidity-eth', (__, res) => {
    const UniswapBsovEthAmountOfEth = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&address=0xfac49a3524a99c90defb63571b2dfff70d12b1e2&tag=latest&apikey=VFXCIKBK33QVIW42AM7153EANCA3YT7Q7V';
    axios.get(UniswapBsovEthAmountOfEth).then(function (response) {
        console.log(response.data.result)
       const {result} = response.data
        res.send({
            UniswapBsovEthAmountOfEth: formattedETH(result)
        })
    })
 });

 router.get('/liquidity-bsov', (__, res) => {
    const UniswapBsovEthAmountOfBsov = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x26946adA5eCb57f3A1F91605050Ce45c482C9Eb1&address=0xfac49a3524a99c90defb63571b2dfff70d12b1e2&tag=latest&apikey=VFXCIKBK33QVIW42AM7153EANCA3YT7Q7V';
    axios.get(UniswapBsovEthAmountOfBsov).then(function (response) {
        console.log(response.data.result)
       const {result} = response.data
        res.send({
            UniswapBsovEthAmountOfBsov: formatted(result)
        })
    })
 });


router.get('/price', (__, res) => {
    const priceURL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoinsov&vs_currencies=usd';
    axios.get(priceURL).then( function (response) {
        const { usd } = response.data.bitcoinsov
        console.log(usd)
        res.send({
            currentPrice: usd
        })
    })
});


router.get('/', (__, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});


