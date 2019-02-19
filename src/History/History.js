import React, { Component } from 'react';
import './History.css';
import axios from 'axios';
import moment from 'moment';

class History extends Component {
  constructor() {
    super();
    this.state = {
      todayprice: {},
      yesterdayprice: {},
      twodayprice: {},
      threedayprice: {},
      fourdayprice: {}
    }
    this.getBTCPrices = this.getBTCPrices.bind(this);
    this.getETHPrices = this.getETHPrices.bind(this);
    this.getLTCPrices = this.getLTCPrices.bind(this);
  }

  componentDidMount () {
    if (!navigator.onLine) {
      this.setState({ todayprice: JSON.parse(localStorage.getItem('todayprice')) });
      this.setState({ yesterdayprice: JSON.parse(localStorage.getItem('yesterdayprice')) });
      this.setState({ twodayprice: JSON.parse(localStorage.getItem('twodayprice')) });
      this.setState({ threedayprice: JSON.parse(localStorage.getItem('threedayprice')) });
      this.setState({ fourdayprice: JSON.parse(localStorage.getItem('fourdayprice')) });
    }
  }

  getETHPrices (date) {
    return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=' + date);
  }

  getBTCPrices (date) {
    return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=' + date);
  }

  getLTCPrices (date) {
    return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + date);
  }

  getTodayPrice () {
    let time = moment().unix();

    axios.all([this.getETHPrices(time), this.getBTCPrices(time), this.getLTCPrices(time)])
      .then(axios.spread((eth, btc, ltc) => {
        let f = {
          date: moment.unix(time).format("MMMM do YYYY"),
          eth: eth.data.ETH.USD,
          btc: btc.data.BTC.USD,
          ltc: ltc.data.LTC.USD
        }
        this.setState({ todayprice: f });

        localStorage.setItem('todayprice', JSON.stringify(f));
        this.setState({ todayprice: f });
      }))


  }

  getYesterdayPrice () {
    let time = moment().subtract(1, 'days').unix();
    axios.all([this.getETHPrices(time), this.getBTCPrices(time), this.getLTCPrices(time)])
      .then(axios.spread((eth, btc, ltc) => {
        let f = {
          date: moment.unix(time).format("MMMM Do YYYY"),
          eth: eth.data.ETH.USD,
          btc: btc.data.BTC.USD,
          ltc: ltc.data.LTC.USD
        }
        this.setState({ yesterdayprice: f });

        localStorage.setItem('yesterdayprice', JSON.stringify(f));
        this.setState({ yesterdayprice: f });
      }));
  }

  getTwoDaysPrice () {
    let time = moment().subtract(2, 'days').unix();

    axios.all([this.getETHPrices(time), this.getBTCPrices(time), this.getLTCPrices(time)])
      .then(axios.spread((eth, btc, ltc) => {
        let f = {
          date: moment.unix(time).format("MMMM do YYYY"),
          eth: eth.data.ETH.USD,
          btc: btc.data.BTC.USD,
          ltc: ltc.data.LTC.USD
        }
        this.setState({ twodayprice: f });

        localStorage.setItem('twodayprice', JSON.stringify(f));
        this.setState({ twodayprice: f });
      }));
  }

  getThreeDayPrice () {
    let time = moment().subtract(3, 'days').unix();

    axios.all([this.getETHPrices(time), this.getBTCPrices(time), this.getLTCPrices(time)])
      .then(axios.spread((eth, btc, ltc) => {
        let f = {
          date: moment.unix(time).format("MMMM do YYYY"),
          eth: eth.data.ETH.USD,
          btc: btc.data.BTC.USD,
          ltc: ltc.data.LTC.USD
        }
        this.setState({ threedayprice: f });

        localStorage.setItem('threedayprice', JSON.stringify(f));
        this.setState({ threedayprice: f });
      }));
  }

  getFourDayPrice () {
    let time = moment().subtract(4, 'days').unix();

    axios.all([this.getETHPrices(time), this.getBTCPrices(time), this.getLTCPrices(time)])
      .then(axios.spread((eth, btc, ltc) => {
        let f = {
          date: moment.unix(time).format("MMMM do YYYY"),
          eth: eth.data.ETH.USD,
          btc: btc.data.BTC.USD,
          ltc: ltc.data.LTC.USD
        }
        this.setState({ fourdayprice: f });

        localStorage.setItem('fourdayprice', JSON.stringify(f));
        this.setState({ fourdayprice: f });
      }));
  }

  componentWillMount () {
    this.getTodayPrice();
    this.getYesterdayPrice();
    this.getTwoDaysPrice();
    this.getThreeDayPrice();
    this.getFourDayPrice();
  }

  render() {
    return (
      <div className="history--section container">
        <h2>History (Past 5 days)</h2>
        <div className="history--section__box">
          <div className="history--section__box__inner">
            <h4>{this.state.todayprice.date}</h4>
            <div className="columns">
              <div className="column">
                <p>1 BTC = ${this.state.todayprice.btc}</p>
              </div>
              <div className="column">
                <p> 1 ETH = ${this.state.todayprice.eth}</p>
              </div>
              <div className="column">
                <p> 1 LTC = ${this.state.todayprice.ltc}</p>
              </div>
            </div>
          </div>
          <div className="history--section__box__inner">
            <h4>{this.state.yesterdayprice.date}</h4>
            <div className="columns">
              <div className="column">
                <p>1 BTC = ${this.state.yesterdayprice.btc}</p>
              </div>
              <div className="column">
                <p> 1 ETH = ${this.state.yesterdayprice.eth}</p>
              </div>
              <div className="column">
                <p> 1 LTC = ${this.state.yesterdayprice.ltc}</p>
              </div>
            </div>
          </div>
          <div className="history--section__box__inner">
            <h4>{this.state.twodayprice.date}</h4>
            <div className="columns">
              <div className="column">
                <p>1 BTC = ${this.state.twodayprice.btc}</p>
              </div>
              <div className="column">
                <p> 1 ETH = ${this.state.twodayprice.eth}</p>
              </div>
              <div className="column">
                <p> 1 LTC = ${this.state.twodayprice.ltc}</p>
              </div>
            </div>
          </div>
          <div className="history--section__box__inner">
            <h4>{this.state.threedayprice.date}</h4>
            <div className="columns">
              <div className="column">
                <p>1 BTC = ${this.state.threedayprice.btc}</p>
              </div>
              <div className="column">
                <p> 1 ETH = ${this.state.threedayprice.eth}</p>
              </div>
              <div className="column">
                <p> 1 LTC = ${this.state.threedayprice.ltc}</p>
              </div>
            </div>
          </div>
          <div className="history--section__box__inner">
            <h4>{this.state.fourdayprice.date}</h4>
            <div className="columns">
              <div className="column">
                <p>1 BTC = ${this.state.fourdayprice.btc}</p>
              </div>
              <div className="column">
                <p> 1 ETH = ${this.state.fourdayprice.eth}</p>
              </div>
              <div className="column">
                <p> 1 LTC = ${this.state.fourdayprice.ltc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default History;

