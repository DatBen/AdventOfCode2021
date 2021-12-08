if [ $1==js ] 
then
    cd day$2/JavaScript
    npm run $3
fi 


if [ $1==go ] 
then
    cd day$2/Go
    npm run $3
fi 
