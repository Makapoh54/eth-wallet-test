ARGS="--ws --wsorigins="213.226.141.108" --wsaddr 0.0.0.0 --wsapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum --emitcheckpoints"

nohup geth --rinkeby --datadir ./dd1 $ARGS --wsport 8545 2>>./1.log &