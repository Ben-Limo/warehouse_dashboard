import { useCallback } from 'react';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { BsBoxSeam } from 'react-icons/bs';
import { FiBarChart } from 'react-icons/fi';
import { FaHandshake } from 'react-icons/fa';


const today = new Date()
const monthOffset = today.getMonth() - 6

const salesPerMonth = [{period: 'Jan', total: 0}, {period: 'Feb', total: 0}, {period: 'Mar', total: 0}, 
                        {period: 'Apr', total: 0}, {period: 'May', total: 0}, {period: 'Jun', total: 0}, 
                        {period: 'Jul', total: 0}, {period: 'Aug', total: 0}, {period: 'Sep', total: 0},
                        {period: 'Oct', total: 0}, {period: 'Nov', total: 0}, {period: 'Dec', total: 0}]

const stackedChartData = {};
stackedChartData.sales = JSON.parse(JSON.stringify(salesPerMonth.slice(new Date().getMonth() - 6, new Date().getMonth() + 1)))
stackedChartData.transactions = JSON.parse(JSON.stringify(salesPerMonth.slice(new Date().getMonth() - 6, new Date().getMonth() + 1)))


export const useTransactionsRawData = () => {
    
    
    const transformTransactionsRawData = useCallback((transactionsRawData) => {
        
        const currentTransactions = []
        const priorTransactions = []

        let numberOfcurrentTransactions = 0
        let numberOfPriorTransactions = 0
        
        let numOfCurrentProducts = 0
        let numOfPriorProducts = 0

        let priorTotalSales = 0
        let currentTotalSales = 0

        let now = new Date()
        const filterBy = new Date(now.setDate(now.getDate()-10)).toISOString().slice(0,11)+'00:00:00'

        transactionsRawData.forEach(transaction => {
            let transactionDate = new Date(transaction.createdAt + '')
            stackedChartData.sales[transactionDate.getMonth() - monthOffset].total += transaction.totalPrice
            stackedChartData.transactions[transactionDate.getMonth() - monthOffset].total++
            
            let record = {
                "trackId" : transaction.id.substr(0,18),
                "imageURL": "",
                "products": [],
                "customerId": transaction.customer.name,
                "customer": transaction.customer.name,
                "date": transactionDate, 
                "amount": transaction.totalPrice,
                "paymentMethod" : transaction.paymentMethod,
                "status": transaction.status
        
            }

            transaction.products.forEach(product => {
                record["imageURL"] += product.imageURL
                record["products"].push(product.name)
                transactionDate > filterBy ?
                    numOfCurrentProducts++ : numOfPriorProducts++

            })

            if( transactionDate > filterBy) {
                numberOfcurrentTransactions++
                currentTransactions.push(record)
                currentTotalSales +=  transaction.totalPrice
            }
            
            else {
                numberOfPriorTransactions++
                priorTransactions.push(record)
                priorTotalSales += transaction.totalPrice
            }
        })

        let numberOfCurrentCustomers = [...new Set(currentTransactions.map(item => item.customerId))].length
        let numberOfPriorCustomers = [...new Set(priorTransactions.map(item => item.customerId))].length

        const getGrowthRate = (priorVal, currentVal) => {
            let growthRate = (currentVal - priorVal) / priorVal * 100
             if (growthRate > 0) 
                growthRate =  '+' + growthRate

            return growthRate
        }

        const widgetsData = [
            {
                icon: <MdOutlineSupervisorAccount />,
                amount: numberOfCurrentCustomers,
                percentage: getGrowthRate(numberOfPriorCustomers, numberOfCurrentCustomers) + '%',
                title: 'Customers',
                iconColor: '#03C9D7',
                iconBg: '#E5FAFB',
                pcColor: 'red-600',
            },
            {
            icon: <BsBoxSeam />,
            amount: numOfCurrentProducts,
            percentage: getGrowthRate(numOfPriorProducts, numOfCurrentProducts) + '%',
            title: 'Products',
            iconColor: 'rgb(255, 244, 229)',
            iconBg: 'rgb(254, 201, 15)',
            pcColor: 'green-600',
          },
          {
            icon: <FiBarChart />,
            amount: currentTotalSales,
            percentage: getGrowthRate(priorTotalSales, currentTotalSales) + '%',
            title: 'Sales',
            iconColor: 'rgb(228, 106, 118)',
            iconBg: 'rgb(255, 244, 229)',
        
            pcColor: 'green-600',
          },
          {
            icon: <FaHandshake />,
            amount: numberOfcurrentTransactions,
            percentage: getGrowthRate(numberOfPriorTransactions, numberOfcurrentTransactions) + '%',
            title: 'Transactions',
            iconColor: 'rgb(0, 194, 146)',
            iconBg: 'rgb(235, 250, 242)',
            pcColor: 'red-600',
          },
        ]
        
        console.log(widgetsData)
        return [currentTransactions, priorTransactions, widgetsData, stackedChartData]
    }, [])

    return { transformTransactionsRawData };
}
