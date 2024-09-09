import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import  axios  from 'axios';
import Box from '../components/helpers/box/box';


ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);


export default function Dashboard() {
  
  const [mostOrderedLabels, setMostOrderedLabels] = useState([])
  const [mostOrderedData, setMostOrderedData] = useState([])
  const [todayOrders, setTodayOrders] = useState('0')
  const [todayProfits, setTodayProfits] = useState('0')
  const [monthProfits, setMonthProfits] = useState('0')
  const [foodType, setFoodType] = useState('')
  
  const pieChartColors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6', '#E67E22', '#1F77B4', '#FF1493', '#2ECC71', '#3498DB'  ];
  
  
  const data = {
    labels: mostOrderedLabels,
    datasets: [{
      label: 'Orders',
      data: mostOrderedData,
      backgroundColor: pieChartColors,
      hoverOffset: 4
    }]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Most ordered items on our menu',
      },
      datalabels: {
        color: '#111',
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return  `${label}: ${value}` ;
        },
      },
    },
  };
  
  useEffect(() => {
    const fetchChart = async () => { 
      const mostOrderedLink =  `http://localhost:4000/charts/mostOrdered`
      axios.get(mostOrderedLink , 
        { params: { 
          Food_Type : foodType,
        } ,
          headers : {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      ).then((response) => {
        setMostOrderedLabels(response.data.data.map(item => item.Name))
        setMostOrderedData(response.data.data.map(item =>  item.orders))
      })
      
    }
    fetchChart()
  }, [foodType])
  
  useEffect(() => {
    const fetchTodayOrders = () => {
      const todayOrdersLink =  `http://localhost:4000/charts/todayOrders`
      axios.get(todayOrdersLink , 
        { 
          headers : {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      ).then((response) => {
        setTodayOrders(response.data.result[0].todayOrders)
        
      })  
    }
    fetchTodayOrders()
  }, [])
  
  useEffect(() => {
    const fetchTodayProfits = () => {
      const todayProfitsLink =  `http://localhost:4000/charts/todayProfits`
      axios.get(todayProfitsLink , 
        { 
          headers : {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      ).then((response) => {
        setTodayProfits(response.data.result[0].todayProfits)
        
      })  
    }
    fetchTodayProfits()
  }, [])
  
  useEffect(() => {
    const fetchTodayProfits = () => {
      const monthProfitsLink =  `http://localhost:4000/charts/monthProfits`
      axios.get(monthProfitsLink , 
        { 
          headers : {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      ).then((response) => {
        setMonthProfits(response.data.result[0].monthProfits)
        
      })  
    }
    fetchTodayProfits()
  }, [])

  
  return (
    <div className='homePageContent'>
      
    <div className='ana'>
    <Box title={`Today's orders`}>
      <div className='display-4  text-center p-3'>
      {todayOrders}
      </div>
    </Box>
    <Box title={`Today's profits`}>
    <div className='display-4  text-center p-3'>
      {todayProfits || '0'}$
      </div>
    </Box>
    <Box title={`Monthly profits`}>
    <div className='display-4  text-center p-3'>
      {monthProfits || '0'}$
      </div>
    </Box>
    </div>
    
    <div className='ana'>
    <Box title={'Top 10 Ordered items'}>
        <Doughnut data={data} options={options}  />
        <div className='buttons'>
          <button className='btn btn-primary' onClick={() => {setFoodType('')}} >All</button>
          <button className='btn btn-primary' onClick={() => {setFoodType('BREAKFAST')}} >Breakfast</button>
          <button className='btn btn-primary' onClick={() => {setFoodType('DINNER')}} >Dinner</button>
          <button className='btn btn-primary' onClick={() => {setFoodType('DESSERT')}} >Dessert</button>
          <button className='btn btn-primary' onClick={() => {setFoodType('LUNCH')}} >Launch</button>
          <button className='btn btn-primary' onClick={() => {setFoodType('DRINKS')}} >Drinks</button>
        </div>
    </Box>
    </div>
    </div>
  );
}

