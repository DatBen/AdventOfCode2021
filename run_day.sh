if [ $1 = 'js' ] 
then
    cd day$2/JavaScript
    npm run $3
fi 


if [ $1 = 'go' ] 
then
    cd day$2/Go
    go run src/p$3.go
fi 



