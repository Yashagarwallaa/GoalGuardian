import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Calculator.css'
const App = () => {
  const [inHandAmount, setInHandAmount] = useState('');
  const [totalMoney, setTotalMoney] = useState('');
  const [years, setYears] = useState('');
  const [returnsYearly, setReturnsYearly] = useState('');
  const [increaseYearly, setIncreaseYearly] = useState('');
  const [loans, setLoans] = useState('');
  const [results, setResults] = useState('');
  const [rewards, setRewards] = useState('');
 
  function calculateMonthlySavings(currentMoney, targetMoney, years, yearlyIncrease, interestRate, loanPercentage) {
    const inflation = 1.05; // 5% annual inflation
    
    // Adjust target money for inflation
    const inflationAdjustedTarget = targetMoney * Math.pow(inflation, years);
    
    // Calculate loan amount
    const loanAmount = (loanPercentage / 100) * inflationAdjustedTarget;
    
    // Adjust target for loan
    const adjustedTarget = inflationAdjustedTarget - loanAmount;
    
    // Calculate future value of current money
    const futureValueCurrent = currentMoney * Math.pow(1 + interestRate / 100, years);
    
    // Calculate amount needed from regular savings
    const amountNeededFromSavings = adjustedTarget - futureValueCurrent;
    
    // Calculate PMT (Payment) using the formula: PMT = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = years * 12;
    const growthFactor = Math.pow(1 + monthlyRate, numberOfPayments);
    
    let monthlySavings = amountNeededFromSavings * (monthlyRate * growthFactor) / (growthFactor - 1);
    
    // Adjust for yearly increase in savings
    if (yearlyIncrease > 0) {
        const annualIncreaseFactor = 1 + yearlyIncrease / 100;
        monthlySavings /= (Math.pow(annualIncreaseFactor, years) - 1) / (annualIncreaseFactor - 1) / years;
    }
    
    return Math.round(monthlySavings);
}

  const handleCalculate = () => {
    const lumpsum = parseFloat(inHandAmount);
    const saal = parseFloat(years);
    const totalPaisa = parseFloat(totalMoney);
    const ry = parseFloat(returnsYearly);
    const iy = parseFloat(increaseYearly);
    const loan = parseFloat(loans);
    const inflation = 1 + 5 / 100;
    const monthlyAmount= calculateMonthlySavings(lumpsum,totalPaisa, saal, ry, iy, loans);

    // const totalMony = totalPaisa * Math.pow(inflation, saal);
    // const x = loan / 100;
    // const totalMoniy = totalMony - x * totalMony;
    // let y = 1.0 + ry / 100.0;
    // const l = 1.0 + iy / 100.0;

    // for (let i = 2; i <= saal; i++) {
    //   let a = Math.pow(y, i);
    //   y += a;
    // }

    // const h = totalMoniy - 0.1 * totalMoniy;
    // const k = l * y;
    // const b = Math.pow(y, saal);
    // const c = lumpsum * b;
    // const d = b + k;
    // const e = totalMoniy - c;
    // const f = e / d;
    // const monthlyAmount = (f / 12).toFixed(0);
    // const o = h - c;
    // const w = o / d;
    // const newMonthlyAmount = (w / 12).toFixed(0);
    // const diff = monthlyAmount - newMonthlyAmount;
    // let z = 0;

    // if (totalMoniy > 100000) {
    //   z = 5000;
    // } else {
    //   z = (5 / 100) * totalMoniy;
    // }

    if (!monthlyAmount) {
      setResults('You didn\'t enter anything. Try again.');
      setRewards('');
    } else {
      setResults(`You need to save Rs ${monthlyAmount} per month to achieve your goal in ${saal} years. This is taken in consideration with 5% inflation rate.`);
    }
  };

  useEffect(() => {
    const centerMe = () => {
      const boiheight = document.querySelector(".center-meh-boi").offsetHeight;
      const middle = boiheight / 2;
      document.querySelector(".center-meh-boi").style.marginTop = `-${middle}px`;
    };

    centerMe();
    window.addEventListener('resize', centerMe);

    return () => {
      window.removeEventListener('resize', centerMe);
    };
  }, []);

  return (
    <Container fluid className="center-meh-boi">
      <Row>
        <Col lg={6} md={12}>
          <div className="box-of-stuff">
            <Form style={{marginTop:'40rem'}}>
              <Form.Group className='form-calci-part'>
                <Form.Control
                  type="number"
                  placeholder="Amount you can invest in present time (in-hand lumpsum)"
                  value={inHandAmount}
                  onChange={e => setInHandAmount(e.target.value)}
                  className="input-lg"
                />
              </Form.Group>
              <Form.Group className='form-calci-part'>
                <Form.Control
                  type="number"
                  placeholder="Total amount you need in present time."
                  value={totalMoney}
                  onChange={e => setTotalMoney(e.target.value)}
                  className="input-lg"
                />
              </Form.Group>
              <Form.Group className='form-calci-part'>
                <Form.Control
                  type="number"
                  placeholder="Number of years you need to achieve your goal."
                  value={years}
                  onChange={e => setYears(e.target.value)}
                  className="input-lg"
                />
              </Form.Group>
              <Form.Group className='form-calci-part'>
                <Form.Control
                  type="number"
                  placeholder="Expected yearly returns in your savings"
                  value={returnsYearly}
                  onChange={e => setReturnsYearly(e.target.value)}
                  className="input-lg"
                />
              </Form.Group>
              <Form.Group className='form-calci-part'>
                <Form.Control
                  type="number"
                  placeholder="Yearly increase in monthly savings"
                  value={increaseYearly}
                  onChange={e => setIncreaseYearly(e.target.value)}
                  className="input-lg"
                />
              </Form.Group>
              <Form.Group className='form-calci-part'>
                <Form.Control
                  type="number"
                  placeholder="% of total amount you are going to acquire through loans."
                  value={loans}
                  onChange={e => setLoans(e.target.value)}
                  className="input-lg"
                />
              </Form.Group>
              <Button className='calci-btn' variant="primary" style={{ backgroundColor: 'darkcyan' }} onClick={handleCalculate}>
                Submit
              </Button>
            </Form>
          </div>
        </Col>
        <Col lg={6} md={12}>
          <div className="results">
            <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>Results</h2>
            <div className="results-data" style={{ color: 'rgb(57,255,20)' }}>
              <p className="calci-para">{results || 'Hit that submit button to see your results!'}</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;