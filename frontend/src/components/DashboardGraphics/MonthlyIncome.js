import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend);

const MonthlyIncome = ({ refresh, userId }) => {  // ✅ Accept userId
    const [monthlyIncomes, setMonthlyIncomes] = useState({});

    useEffect(() => {
        if (userId) {  // ✅ Ensure userId exists before calling API
            fetchIncomes();
        }
    }, [refresh, userId]);

    const fetchIncomes = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/get-incomes/${userId}`); // ✅ Use userId
            if (!response.ok) throw new Error('Failed to fetch income data');
            const data = await response.json();
            const incomeByMonth = data.reduce((acc, income) => {
                const date = new Date(income.date);
                const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
                if (!acc[monthYear]) acc[monthYear] = 0;
                acc[monthYear] += parseFloat(income.amount);
                return acc;
            }, {});
            setMonthlyIncomes(incomeByMonth);
        } catch (error) {
            console.error(error);
        }
    };

    const months = Object.keys(monthlyIncomes).sort((a, b) => new Date(a) - new Date(b));
    const amounts = months.map(month => monthlyIncomes[month]);

    // const chartData = {
    //     labels: months,
    //     datasets: [
    //         {
    //             label: 'Monthly Income',
    //             data: amounts,
    //             backgroundColor: 'rgba(75, 192, 192, 0.6)',
    //             borderColor: 'rgba(75, 192, 192, 1)',
    //             borderWidth: 1,
    //         }
    //     ]
    // };

    const chartData = {
        labels: months, 
        datasets: [
            {
                label: 'Monthly Income ($)',
                data: amounts,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: '#fff',
                pointRadius: 5,
                borderWidth: 2,
                fill: true, // ✅ Adds a shaded area under the line
            }
        ]
    };
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: { display: true },
            tooltip: { enabled: true }
        },
        scales: {
            x: { title: { display: true, text: 'Month' } },
            y: { title: { display: true, text: 'Income ($)' }, beginAtZero: true }
        }
    };

    
    
    

    return (
        <MonthlyIncomeStyled>
            <div className="income-container">
                <h2>Monthly Income Overview</h2>
                {months.length > 0 ? (
                    <div className="chart-wrapper">
                        {/* <Bar data={chartData} options={chartOptions} /> */}
                        <Line data={chartData} options={chartOptions} />
                    </div>
                ) : (
                    <p>No Income Data ...</p>
                )}
            </div>
        </MonthlyIncomeStyled>
    );
};


const MonthlyIncomeStyled = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .income-container {
        background-color: #f9f9f9;
        border: 3px solid rgba(149, 153, 158, 100);
        border-radius: 15px;
        padding: 1rem;
        width: 100%;  /* ✅ Allow full width */
        min-height: 400px; /* ✅ Increase height */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .chart-wrapper {
        width: 100%;  /* ✅ Allow full width */
        height: 100%;  /* ✅ Allow full height */
        flex-grow: 1;  /* ✅ Allow chart to expand */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media only screen and (max-width: 768px) {
        .income-container {
            width: 90%; /* ✅ Slightly reduce width on small screens */
        }
    }
`;


export default MonthlyIncome;
