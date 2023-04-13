#!/bin/bash
LISTSA=$(az storage account list)
LISTLENGTH=$(echo $LISTSA | jq length)

# echo $LISTSA
echo $LISTLENGTH

printf $LISTSA >> list.txt
# i=0
# RED='\033[0;31m'

# while item -r $LISTSA; do
#   printf "${item}"\n >> list.items.txt
# done

# # echo $i
# if [ -f "result.txt" ]
# then rm result.txt
# fi

# while [ "$i" -le "$LISTLENGTH" ]

# do
#   echo $RED$LISTSA | jq .[$i].resourceGroup >> result.txt
#   echo " " >> result.txt
#   echo $LISTSA | jq .[$i].privateEndpointConnections[0].id >> result.txt
#   echo " " >> result.txt
#   # echo $i
#   i=$((i + 1))


# done
