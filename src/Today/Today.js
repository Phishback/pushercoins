import React, { Component } from 'react';
import Pusher from 'pusher-js';
import './Today.css';
import axios from 'axios';


class Today extends Component {
  constructor () {
    super();
    this.state = {
      btcprice: '',
      ltcprice: '',
      ethprice: ''
    };
  }

  sendPricePusher (data) {
    axios.post('/prices/new', {
      prices: data
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount () {
    if (!navigator.onLine) {
      this.setState({ btcprice: localStorage.getItem('BTC') });
      this.setState({ ethprice: localStorage.getItem('ETH') });
      this.setState({ ltcprice: localStorage.getItem('LTC') });
    }
    setInterval(() => {
      axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
        .then(res => {
          this.sendPricePusher(res.data);
        })
        .catch(err => {
          console.error(err);
        })
    }, 10000);

    this.prices.bind('prices', price => {
      this.setState({ btcprice: price.prices.BTC.USD });
      this.setState({ ethprice: price.prices.ETH.USD });
      this.setState({ ltcprice: price.prices.LTC.USD });
    }, this);
  }

  componentWillMount () {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
      .then(res => {
        this.setState({ btcprice: res.data.BTC.USD });
        localStorage.setItem('BTC', res.data.BTC.USD);

        this.setState({ ethprice: res.data.ETH.USD });
        localStorage.setItem('ETH', res.data.ETH.USD);

        this.setState({ ltcprice: res.data.LTC.USD });
        localStorage.setItem('LTC', res.data.LTC.USD);
      })
      .catch(error => {
        console.log(error)
      })
      this.pusher = new Pusher('580c93dd2287d2c7fcd5', {
        cluster: 'us2',
        encrypted: true
      });
      this.prices = this.pusher.subscribe('coin-pusher');
  }

  render() {
    return (
      <div className="today--section container">
      <h2>Current Price</h2>
        <div className="columns today--section__box">
          <div className="column btc--section">
            <h5>${this.state.btcprice}</h5>
              <p>1 BTC</p>
            </div>
          <div className="column eth--section">
            <h5>${this.state.ethprice}</h5>
              <p>1 ETH</p>
            </div>
          <div className="column ltc--section">
            <h5>${this.state.ltcprice}</h5>
              <p>1 LTC</p>
            </div>
          </div>
      </div>
    )
  }
}

export default Today;