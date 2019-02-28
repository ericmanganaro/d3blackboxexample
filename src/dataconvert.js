const axios = require("axios");

let contractBytecode = {
  url: "https://ethql-alpha.infura.io/graphql",
  method: "post",
  headers: { "Content-Type": "application/graphql" },
  data: `{
 account(address: "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"){
    code
 }
}`
};

let acctQuery = {
  url: "https://ethql-alpha.infura.io/graphql",
  method: "post",
  data: {
    query: ` {
			account(address: "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"){
			address
			balance
			code
			type
			transactionCount
		  }
		}
      `
  }
};

let erc20EventLogs = {
  url: "https://ethql-alpha.infura.io/graphql",
  method: "post",
  data: {
    query: ` {
  block(number: 3100102) {
    transactions(filter: { withInput: true }) {
      decoded {
        ... on ERC20Transfer {
          entity
          standard
	  operation
          from {
            account {
              address
            }
            tokenBalance
          }
          to {
            account {
              address
            }
            tokenBalance
          }
    	  value
          tokenContract {
            account {
              address
            }
            symbol
            totalSupply
          }
        }
      }
    }
  }
}
      `
  }
};
blocksRange = null;

function flareAdapter(arry) {
  var entity = null,
    operation = null,
    standard = null,
    buffer = null,
    adaptedString = "";

  const head = `{	"name": "BlockInformation",
					"children": [ `;
  //const template = `{"name": "${element}","size": ${qoutientofsomething}}`
  const tail = `]}`;

  //Add the header to the adapted string
  adaptedString = adaptedString.concat(head);

  arry
    .filter(stuff => stuff != null)
    .map((trx, iter, jawn) => {
      try {
        adaptedString = adaptedString.concat(
          `{
				      "name": "${trx.decoded.operation}",
				      "children": [
					    {
					      "name": "${trx.decoded.tokenContract.symbol}",
					      "size": 6714
					   	},
					   	{
					      "name": "${trx.decoded.from.tokenBalance}",
					      "size": 6714
					   	},{
					      "name": "${trx.decoded.from.account.address}",
					      "size": 6714
					  
					   	}]
					},`
        );
        /*            	console.log(trx.decoded.standard);
                console.log(trx.decoded.operation);
                console.log(trx.decoded.entity);
                console.log(trx.decoded.from.account.address);
                console.log(trx.decoded.from.tokenBalance);
                console.log(trx.decoded.tokenContract.symbol);*/
      } catch (e) {
        console.log(e instanceof TypeError); // true
      }
    });

  //Put the tail of the string on there
  //console.log(adaptedString.substr(0, adaptedString.length -1))
  adaptedString = adaptedString
    .substr(0, adaptedString.length - 1) //take off the last comma
    .concat(tail);

  console.log(adaptedString);
  return adaptedString;
}

function getData(query) {
  axios(query)
    .then(response => {
      console.log("graphql response:", response.data);
      blocksRange = response.data;
      flareAdapter(blocksRange.data.block.transactions);
    })
    .catch(err => {
      console.log("graphql error:", err);
    });
}

getData(erc20EventLogs);

/*`
	{
	  "name": "BlockInformation",
	  "children": [
	    {
	      "name": "${operation}",
	      "children": [
		    {
		      "name": "HierarchicalCluster",
		      "size": 6714
		   	},
		   	{
		      "name": "HierarchicalCluster",
		      "size": 6714
		   	},{
		      "name": "HierarchicalCluster",
		      "size": 6714
		   	}
		   }
	   
	}
	`
*/

/*

console.log(trx.decoded.standard);
console.log(trx.decoded.operation);
console.log(trx.decoded.entity);
console.log(trx.decoded.from.account.address);
console.log(trx.decoded.from.tokenBalance);
console.log(trx.decoded.tokenContract.symbol);
*/

/*
console.log(blocksRange.data.map((trx) => { console.log(trx)}))
console.log(flareAdapter(blocksRange.data.block.transactions))*/
/*var generaterecursivehierarchy = (array) => 
(array.length === 0)
 ? 0 
 : array[0] + sum(array.slice(1));
*/

//Load the graphic for this block
//What exactly do we want to see?
//Amount transfered
//Token

// blocksRange.data.block.transactions.map((trx, iter) => {
// 	trx.decoded
// }

/*{ entity: 'token',
   standard: 'ERC20',
   operation: 'transfer',
   from: 
    { account: { address: '0x9e0B9dDbA97Dd4f7aDdab0B5F67036EEBE687606' },
      tokenBalance: 5.808409295652579e+22 },
   to: 
    { account: { address: '0x60623835fcbb0cf3e909cea55009b31bb431dd28' },
      tokenBalance: 20018400000000000000 },
   value: '1749200000000000000',
   tokenContract: 
    { account: { address: '0x37a9679c41e99dB270Bda88DE8FF50c0Cd23f326' },
      symbol: 'YOC',
      totalSupply: 3.1e+24 } }*/

/*blocksRange.data.blocksRange.map( (trx) => {
	console.log(trx[0])	
})
*/

//console.log(blocksRange.data.blocksRange.map((trx) => { console.log(trx.transactions[1].hash)}))

//2F486ZCNMJGDVW65

//2F486ZCNMJGDVW65

// application/json example
/* eslint-disable no-unused-vars */
/*let configJson = {
	url: 'https://ethql-alpha.infura.io/graphql',
	method: 'post', 
	data: {
		query: ` {BlocksRange(numberRange: [5400000, 5400005]) {
        transactions{
          hash
          value
          from {
            address
            balance
          }
          to {
            address
          }
        }
      }
        }
      `
	}
};
var */
