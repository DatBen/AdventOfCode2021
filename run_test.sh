if [ $1 = 'go' ] 
then
    cd day$2/Go/src
    go test 
    
fi 

if [ $1 = 'js' ] 
then
    cd day$2/JavaScript/src
    npm run test 
    
fi 


