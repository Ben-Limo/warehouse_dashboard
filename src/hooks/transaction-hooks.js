import { useCallback } from 'react';

const today = new Date()
    const currentMonth = today.getMonth() + 1
    const monthOffset = today.getMonth() - 5
    
    const salesPerMonth = [{name: 'Jan', total: 0}, {name: 'Feb', total: 0}, {name: 'Mar', total: 0}, 
                            {name: 'Apr', total: 0}, {name: 'May', total: 0}, {name: 'Jun', total: 0}, 
                            {name: 'Jul', total: 0}, {name: 'Aug', total: 0}, {name: 'Sep', total: 0},
                            {name: 'Oct', total: 0}, {name: 'Nov', total: 0}, {name: 'Dec', total: 0}]

    const salesPerDayDict = {}

export const useLoadedTransactions = () => {
    
    
    
    const cleanLoadedTransactions = useCallback((loadedTransactions) => {
        
        const currentPeriodTransactions = []
        let numberOfCustomers = [...new Set(loadedTransactions.map(item => item.customer.id))].length
        let numberOfTransactions = 0
        
        let totalSales = 0
        let numOfCurrPeriodProducts = 0
        let numOfPrevPeriodProducts = 0

        let now = new Date()
        const currentPeriod = new Date(now.setHours(0,0,0,0))

        loadedTransactions.forEach(transaction => {
            let transactionDate = new Date(transaction.createdAt + '')
            
            if(transactionDate > currentPeriod) {
                
                let record = {
                    "trackId" : transaction.id.substr(0,18),
                    "imageURL": "",
                    "products": [],
                    "customer": transaction.customer.name,
                    "date": transactionDate, 
                    "amount": transaction.totalPrice,
                    "paymentMethod" : transaction.paymentMethod,
                    "status": transaction.status
            
                }
                
                transaction.products.forEach(product => {
                    record["imageURL"] += product.imageURL
                    record["products"].push(product.name)
                    numOfCurrPeriodProducts++;
                })
                
                numberOfTransactions++
                currentPeriodTransactions.push(record)
            }

            if (salesPerDayDict[transactionDate.getDate()]) {
                salesPerDayDict[transactionDate.getDate()].total += transaction.totalPrice
            } 
            else {
                salesPerDayDict[transactionDate.getDate()] =  {
                    day: transactionDate.getDate() + '', total: 0
                }
            }

            totalSales +=  transaction.totalPrice
            
            

        })

        const salesPerDay = []
        let sevenDaysAgo = new Date().getDate()-6

        for(let i =0; i < 7; i++) {
            salesPerDay[i] = {day: sevenDaysAgo++, total: 0} 
        }

        

        let sevenDays = new Date().getDate()-6

        for (var key in salesPerDayDict) {
            if (salesPerDayDict.hasOwnProperty(key)) {
                salesPerDay[key-sevenDays] = salesPerDayDict[key];
            }
        }

        return [currentPeriodTransactions, totalSales, numOfCurrPeriodProducts, 
            numberOfCustomers, numberOfTransactions, salesPerDay]
    }, [])

    return { cleanLoadedTransactions };
}
